import Stripe from 'stripe';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { Company } from '../../models/admin/company.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
  }
};

// Base includes 2 seats: $19/mo or $180/yr. Extra seats: $19/mo (monthly) or $15/yr (yearly).
const PRO_PRICING = {
  monthly: { unitAmountCents: 1900, interval: 'month' },
  yearly: { unitAmountCents: 18000, interval: 'year' },
};

const EXTRA_SEAT_PRICING = {
  monthly: { unitAmountCents: 1900, interval: 'month' },
  yearly: { unitAmountCents: 1500, interval: 'year' },
};

const INCLUDED_PRO_SEATS = 2;
const PRO_BASE_AMOUNT = { monthly: 19, yearly: 180 };
const MONTHLY_EXTRA_SEAT_AMOUNT = 19;
const YEARLY_EXTRA_SEAT_AMOUNT = 15;

const getExtraSeatCount = (workspaceSeats) =>
  Math.max(0, workspaceSeats - INCLUDED_PRO_SEATS);

const calculateProBillingAmount = (workspaceSeats, interval) => {
  const extra = getExtraSeatCount(workspaceSeats);
  if (interval === 'yearly') {
    return PRO_BASE_AMOUNT.yearly + extra * YEARLY_EXTRA_SEAT_AMOUNT;
  }
  return PRO_BASE_AMOUNT.monthly + extra * MONTHLY_EXTRA_SEAT_AMOUNT;
};

const getSubscriptionInterval = (subscription) => {
  const recurring = subscription?.items?.data?.[0]?.price?.recurring;
  return recurring?.interval === 'year' ? 'yearly' : 'monthly';
};

const findBaseSubscriptionItem = (items, interval) =>
  items.find((item) => item.price?.metadata?.billing_component === 'base')
  ?? items.find((item) => item.price?.unit_amount === PRO_PRICING[interval].unitAmountCents)
  ?? items[0];

const findExtraSubscriptionItems = (items, interval, baseItem) =>
  items.filter((item) => {
    if (item.id === baseItem?.id) return false;
    if (item.price?.metadata?.billing_component === 'extra_seat') return true;
    if (item.price?.unit_amount === EXTRA_SEAT_PRICING[interval].unitAmountCents) return true;
    return Boolean(item.price?.recurring);
  });

const parseProSubscriptionItems = (stripeSub) => {
  const items = stripeSub.items?.data || [];
  const interval = getSubscriptionInterval(stripeSub);
  const baseItem = findBaseSubscriptionItem(items, interval);
  const extraItems = findExtraSubscriptionItems(items, interval, baseItem);
  const extraItem = extraItems[0] ?? null;
  const extraSeatQty = extraItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  const workspaceSeatCount = extraSeatQty > 0
    ? INCLUDED_PRO_SEATS + extraSeatQty
    : (baseItem?.quantity ?? 1) > INCLUDED_PRO_SEATS
      ? baseItem.quantity
      : INCLUDED_PRO_SEATS;

  return {
    interval,
    baseItem,
    extraItem,
    extraItems,
    extraSeatQty,
    workspaceSeatCount,
    billingAmount: calculateProBillingAmount(workspaceSeatCount, interval),
  };
};

const matchesPriceSpec = (candidate, expected, metadata = {}) => {
  if (candidate.unit_amount !== expected.unitAmountCents) return false;
  if (candidate.recurring?.interval !== expected.interval) return false;
  if (Object.keys(metadata).length === 0) return true;
  return Object.entries(metadata).every(([key, value]) => candidate.metadata?.[key] === value);
};

const resolvePriceOnProduct = async (productId, expected, nickname, metadata = {}) => {
  const existingPrices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  });
  const match = existingPrices.data.find((candidate) =>
    matchesPriceSpec(candidate, expected, metadata)
  );
  if (match) {
    return match.id;
  }

  const created = await stripe.prices.create({
    product: productId,
    unit_amount: expected.unitAmountCents,
    currency: 'usd',
    recurring: { interval: expected.interval },
    nickname,
    metadata,
  });
  return created.id;
};

const resolveProPriceId = async (interval) => {
  const configuredId = PRICES.pro[interval];
  if (!configuredId) {
    throw new Error(`Missing Stripe price for ${interval} billing`);
  }

  const price = await stripe.prices.retrieve(configuredId);
  const expected = PRO_PRICING[interval];

  if (price.unit_amount === expected.unitAmountCents
    && price.recurring?.interval === expected.interval) {
    return configuredId;
  }

  const productId = typeof price.product === 'string'
    ? price.product
    : price.product?.id;
  if (!productId) {
    return configuredId;
  }

  const existingPrices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  });
  const match = existingPrices.data.find((candidate) =>
    matchesPriceSpec(candidate, expected, { billing_component: 'base' })
  );
  if (match) {
    return match.id;
  }

  const created = await stripe.prices.create({
    product: productId,
    unit_amount: expected.unitAmountCents,
    currency: price.currency || 'usd',
    recurring: { interval: expected.interval },
    nickname: interval === 'yearly'
      ? 'Geode Pro Base Yearly ($180/yr, 2 seats)'
      : 'Geode Pro Base Monthly ($19/mo, 2 seats)',
    metadata: { billing_component: 'base' },
  });
  return created.id;
};

const resolveExtraSeatPriceId = async (interval) => {
  const basePriceId = await resolveProPriceId(interval);
  const basePrice = await stripe.prices.retrieve(basePriceId);
  const productId = typeof basePrice.product === 'string'
    ? basePrice.product
    : basePrice.product?.id;
  if (!productId) {
    throw new Error(`Missing Stripe product for ${interval} extra seat pricing`);
  }

  const expected = EXTRA_SEAT_PRICING[interval];
  return resolvePriceOnProduct(
    productId,
    expected,
    interval === 'yearly'
      ? 'Geode Pro Extra Seat Yearly ($15/yr per seat)'
      : 'Geode Pro Extra Seat Monthly ($19/mo per seat)',
    { billing_component: 'extra_seat' }
  );
};

const getPricePerSeat = (interval) =>
  interval === 'yearly' ? YEARLY_EXTRA_SEAT_AMOUNT : MONTHLY_EXTRA_SEAT_AMOUNT;

const buildSeatChangeItems = async (parsed, interval, workspaceSeatCount) => {
  const newExtraQty = getExtraSeatCount(workspaceSeatCount);
  const items = [{ id: parsed.baseItem.id, quantity: 1 }];

  if (parsed.extraItem) {
    if (newExtraQty === 0) {
      items.push({ id: parsed.extraItem.id, deleted: true });
    } else {
      items.push({ id: parsed.extraItem.id, quantity: newExtraQty });
    }
  } else if (newExtraQty > 0) {
    const extraPriceId = await resolveExtraSeatPriceId(interval);
    const basePriceId = typeof parsed.baseItem.price === 'string'
      ? parsed.baseItem.price
      : parsed.baseItem.price?.id;
    if (extraPriceId === basePriceId) {
      throw new Error('Extra seat price must be distinct from the base plan price.');
    }
    items.push({ price: extraPriceId, quantity: newExtraQty });
  }

  return items;
};

const formatInvoiceAmount = (amount, currency = 'usd') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);

const inferInvoiceBillingInterval = (invoice) => {
  if (!invoice) return null;
  const line = invoice.lines?.data?.find((item) => item.price?.recurring);
  if (!line?.price?.recurring) return null;
  return line.price.recurring.interval === 'year' ? 'yearly' : 'monthly';
};

const getInvoiceWorkspaceSeatCount = (invoice) => {
  if (!invoice) return null;
  const lines = invoice.lines?.data || [];
  const interval = inferInvoiceBillingInterval(invoice) ?? 'monthly';
  const baseLine = lines.find(
    (line) => line.price?.metadata?.billing_component === 'base'
      || line.price?.unit_amount === PRO_PRICING[interval].unitAmountCents
  ) ?? lines.find((line) => (line.type === 'subscription' || line.quantity) && !line.proration);

  const extraLines = lines.filter((line) => {
    if (line.id === baseLine?.id) return false;
    if (line.proration) return false;
    if (line.price?.metadata?.billing_component === 'extra_seat') return true;
    if (line.price?.unit_amount === EXTRA_SEAT_PRICING[interval].unitAmountCents) return true;
    return line.type === 'subscription' && Boolean(line.price?.recurring);
  });

  const extraSeatQty = extraLines.reduce((sum, line) => sum + (line.quantity ?? 0), 0);
  if (extraSeatQty > 0) {
    return INCLUDED_PRO_SEATS + extraSeatQty;
  }

  if (!baseLine) return null;
  if ((baseLine.quantity ?? 1) > 1) return baseLine.quantity;
  return INCLUDED_PRO_SEATS;
};

const resolveInvoiceAmount = (invoice, company) => {
  if (invoice.amount_paid > 0) return invoice.amount_paid;
  if (invoice.total > 0) return invoice.total;
  if (invoice.subtotal > 0) return invoice.subtotal;

  const positiveLineAmount = (invoice.lines?.data || [])
    .filter((line) => (line.amount ?? 0) > 0)
    .reduce((sum, line) => sum + line.amount, 0);
  if (positiveLineAmount > 0) return positiveLineAmount;

  if (invoice.status === 'paid') {
    const seatCount = getInvoiceWorkspaceSeatCount(invoice) ?? INCLUDED_PRO_SEATS;
    const interval = inferInvoiceBillingInterval(invoice)
      ?? company.subscription?.billingInterval
      ?? 'monthly';
    return Math.round(calculateProBillingAmount(seatCount, interval) * 100);
  }

  return invoice.amount_due ?? 0;
};

const mapInvoiceStatus = (status) => {
  if (status === 'paid') return 'Paid';
  if (status === 'open') return 'Processing';
  if (status === 'draft') return 'Draft';
  if (status === 'void') return 'Void';
  if (status === 'uncollectible') return 'Failed';
  return status;
};

const formatInvoiceDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const formatInvoiceDescription = (invoice, seatCount, plan = 'pro') => {
  const lines = invoice.lines?.data || [];
  const licenseLabel = (qty) => `${qty} ${qty === 1 ? 'license' : 'licenses'}`;
  const planLabel = plan === 'enterprise' ? 'Enterprise Plan' : 'Pro Plan';

  if (seatCount != null) {
    const hasProration = lines.some((line) => line.proration);
    if (hasProration) {
      return `${planLabel} - ${licenseLabel(seatCount)} (prorated)`;
    }
    return `${planLabel} - ${licenseLabel(seatCount)}`;
  }

  const subscriptionLine = lines.find(
    (line) => line.type === 'subscription' && line.quantity && !line.proration
  );
  if (subscriptionLine?.quantity) {
    return `${planLabel} - ${licenseLabel(subscriptionLine.quantity)}`;
  }

  if (lines.some((line) => line.proration)) {
    return 'Seat adjustment (prorated)';
  }

  const mainLine = lines.find((line) => line.description)?.description;
  if (!mainLine) return 'Subscription';

  const quantityMatch = mainLine.match(/^(\d+)\s*[×x]/i);
  if (quantityMatch) {
    return `${planLabel} - ${licenseLabel(parseInt(quantityMatch[1], 10))}`;
  }

  if (/enterprise/i.test(mainLine)) {
    return mainLine.length > 48 ? 'Enterprise subscription' : mainLine;
  }

  return mainLine.length > 48 ? 'Subscription payment' : mainLine;
};

const getCompanyStripeSubscription = async (company) => {
  if (!company?.subscription?.stripeSubscriptionId) {
    return null;
  }
  const subscription = await stripe.subscriptions.retrieve(
    company.subscription.stripeSubscriptionId,
    { expand: ['items.data.price'] }
  );
  const subscriptionItem = subscription.items?.data?.[0];
  if (!subscriptionItem?.id) {
    return null;
  }
  return { subscription, subscriptionItem: subscription.items?.data?.[0], parsed: parseProSubscriptionItems(subscription) };
};

const getProrationBehavior = (currentSeatCount, newSeatCount) =>
  newSeatCount > currentSeatCount ? 'always_invoice' : 'create_prorations';

const cancelAllCustomerSubscriptions = async (customerId, { immediate }) => {
  if (!customerId) {
    return [];
  }

  const cancelledIds = [];
  for (const status of ['active', 'trialing', 'past_due']) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status,
      limit: 100,
    });

    for (const subscription of subscriptions.data) {
      if (immediate) {
        await stripe.subscriptions.cancel(subscription.id);
      } else {
        await stripe.subscriptions.update(subscription.id, {
          cancel_at_period_end: true,
        });
      }
      cancelledIds.push(subscription.id);
    }
  }

  return cancelledIds;
};

const resetCompanyToFree = (company) => {
  if (!company.subscription) {
    company.subscription = {};
  }
  company.subscription.plan = 'free';
  company.subscription.status = 'active';
  company.subscription.stripeSubscriptionId = null;
  company.subscription.cancelAtPeriodEnd = false;
  company.subscription.seatCount = 0;
  company.subscription.billingInterval = 'monthly';
  company.subscription.currentPeriodEnd = null;
};

const applyProSubscriptionFromStripe = async (companyId, subscriptionId, subscription) => {
  const parsed = parseProSubscriptionItems(subscription);
  const currentPeriodEnd = getSubscriptionPeriodEnd(subscription);

  await Company.findByIdAndUpdate(companyId, {
    'subscription.stripeSubscriptionId': subscriptionId,
    'subscription.plan': 'pro',
    'subscription.status': 'active',
    'subscription.trialEndsAt': null,
    'subscription.seatCount': parsed.workspaceSeatCount,
    'subscription.billingInterval': getSubscriptionInterval(subscription),
    ...(currentPeriodEnd && {
      'subscription.currentPeriodEnd': currentPeriodEnd,
    }),
  });
};

const syncCompanySubscriptionFromStripe = async (company) => {
  const customerId = company.subscription?.stripeCustomerId;
  if (!customerId) {
    return false;
  }

  const companyId = company._id.toString();
  const plan = company.subscription?.plan;

  if (company.subscription?.stripeSubscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        company.subscription.stripeSubscriptionId,
        { expand: ['items.data.price'] }
      );
      if (['active', 'trialing'].includes(subscription.status)) {
        if (plan !== 'pro') {
          await applyProSubscriptionFromStripe(companyId, subscription.id, subscription);
        }
        return true;
      }
    } catch {
      // Stored subscription id may be stale — fall through to customer lookup.
    }
  }

  for (const status of ['active', 'trialing']) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status,
      limit: 1,
    });
    if (subscriptions.data.length > 0) {
      const subscription = await stripe.subscriptions.retrieve(subscriptions.data[0].id, {
        expand: ['items.data.price'],
      });
      await applyProSubscriptionFromStripe(companyId, subscription.id, subscription);
      return true;
    }
  }

  return false;
};

const applyBillingIntervalChange = async (company, interval) => {
  const stripeSub = await getCompanyStripeSubscription(company);
  if (!stripeSub) {
    throw new Error('No active subscription found.');
  }

  const { subscription, parsed } = stripeSub;
  const currentInterval = getSubscriptionInterval(subscription);
  if (currentInterval === interval) {
    throw new Error('You are already on this billing interval.');
  }

  const newBasePriceId = await resolveProPriceId(interval);
  const items = [{ id: parsed.baseItem.id, price: newBasePriceId, quantity: 1 }];
  if (parsed.extraSeatQty > 0) {
    const newExtraPriceId = await resolveExtraSeatPriceId(interval);
    if (parsed.extraItem) {
      items.push({
        id: parsed.extraItem.id,
        price: newExtraPriceId,
        quantity: parsed.extraSeatQty,
      });
    } else {
      items.push({ price: newExtraPriceId, quantity: parsed.extraSeatQty });
    }
  }

  const updatedSubscription = await stripe.subscriptions.update(
    company.subscription.stripeSubscriptionId,
    {
      items,
      proration_behavior: 'always_invoice',
    }
  );

  company.subscription.billingInterval = interval;
  company.subscription.seatCount = parsed.workspaceSeatCount;
  const periodEnd = getSubscriptionPeriodEnd(updatedSubscription);
  if (periodEnd) {
    company.subscription.currentPeriodEnd = periodEnd;
  }
  await company.save();

  return { interval, currentInterval };
};

const getSubscriptionPeriodEnd = (subscription) => {
  const periodEnd = subscription?.current_period_end
    ?? subscription?.items?.data?.[0]?.current_period_end;
  return periodEnd ? new Date(periodEnd * 1000) : null;
};

const getSubscriptionPeriodStart = (subscription) => {
  const periodStart = subscription?.current_period_start
    ?? subscription?.items?.data?.[0]?.current_period_start;
  return periodStart ? new Date(periodStart * 1000) : null;
};

const estimateDowngradeCreditCents = (subscription, unitAmountCents, seatsRemoved) => {
  const periodEnd = getSubscriptionPeriodEnd(subscription);
  const periodStart = getSubscriptionPeriodStart(subscription);
  if (!periodEnd || !periodStart || seatsRemoved <= 0 || unitAmountCents <= 0) {
    return 0;
  }

  const totalMs = periodEnd.getTime() - periodStart.getTime();
  const remainingMs = Math.max(0, periodEnd.getTime() - Date.now());
  if (totalMs <= 0 || remainingMs <= 0) {
    return 0;
  }

  return Math.round((unitAmountCents * seatsRemoved * remainingMs) / totalMs);
};

const computeDowngradeCredit = (preview, subscription, unitAmountCents, seatsRemoved, currency) => {
  if (seatsRemoved <= 0 || unitAmountCents <= 0) {
    return null;
  }

  const maxCreditCents = unitAmountCents * seatsRemoved;
  const estimatedCents = estimateDowngradeCreditCents(
    subscription,
    unitAmountCents,
    seatsRemoved
  );

  const prorationCreditCents = Math.abs(
    (preview.lines?.data || [])
      .filter((line) => line.proration && (line.amount || 0) < 0)
      .reduce((sum, line) => sum + line.amount, 0)
  );

  // Stripe preview can include unrelated negative lines — only trust proration
  // credits that fit within one billing period per removed seat.
  let creditCents = estimatedCents;
  if (prorationCreditCents > 0 && prorationCreditCents <= maxCreditCents) {
    creditCents = prorationCreditCents;
  }

  creditCents = Math.min(creditCents, maxCreditCents);
  return creditCents > 0 ? formatInvoiceAmount(creditCents, currency) : null;
};

const getStripeSubscriptionDetails = async (stripeSubscriptionId) => {
  const stripeSub = await stripe.subscriptions.retrieve(stripeSubscriptionId, {
    expand: ['items.data.price'],
  });
  const parsed = parseProSubscriptionItems(stripeSub);

  return {
    seatCount: parsed.workspaceSeatCount,
    extraSeatCount: parsed.extraSeatQty,
    includedSeats: INCLUDED_PRO_SEATS,
    billingInterval: parsed.interval,
    pricePerSeat: getPricePerSeat(parsed.interval),
    recurringPricePerSeat: getPricePerSeat(parsed.interval),
    basePlanAmount: PRO_BASE_AMOUNT[parsed.interval],
    billingAmount: parsed.billingAmount,
    currentPeriodEnd: getSubscriptionPeriodEnd(stripeSub),
    cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
    status: stripeSub.status === 'past_due'
      ? 'past_due'
      : stripeSub.status === 'active'
        ? 'active'
        : stripeSub.status,
  };
};

// Get current subscription status (enriched from Stripe when applicable)
export const getSubscription = asyncHandler(async (req, res) => {
  let company = await Company.findById(req.user?.company_id)
    .select('subscription name');
  if (!company) {
    return res.status(404).json({ status: 'error', message: 'Company not found' });
  }

  const plan = company.subscription?.plan;
  if ((plan === 'free' || plan === 'trial') && company.subscription?.stripeCustomerId) {
    const synced = await syncCompanySubscriptionFromStripe(company);
    if (synced) {
      company = await Company.findById(req.user?.company_id)
        .select('subscription name');
    }
  }

  const data = company.subscription?.toObject?.()
    ?? { ...(company.subscription || {}) };

  if (company.subscription?.stripeSubscriptionId) {
    try {
      const stripeDetails = await getStripeSubscriptionDetails(
        company.subscription.stripeSubscriptionId
      );
      Object.assign(data, stripeDetails);

      const storedSeatCount = company.subscription?.seatCount ?? 0;
      const storedInterval = company.subscription?.billingInterval;
      if (
        stripeDetails.seatCount !== storedSeatCount
        || stripeDetails.billingInterval !== storedInterval
      ) {
        await Company.findByIdAndUpdate(company._id, {
          'subscription.seatCount': stripeDetails.seatCount,
          'subscription.billingInterval': stripeDetails.billingInterval,
        });
      }
    } catch {
      // Fall back to stored subscription fields if Stripe is unreachable
    }
  }

  return res.status(200).json({ status: 'success', data });
});

export const confirmCheckoutSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ status: 'error', message: 'Missing checkout session id.' });
  }

  const company = await Company.findById(req.user?.company_id);
  if (!company) {
    return res.status(404).json({ status: 'error', message: 'Company not found' });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const companyId = session.metadata?.companyId;
  if (!companyId || companyId !== company._id.toString()) {
    return res.status(403).json({
      status: 'error',
      message: 'Checkout session does not match your company.',
    });
  }

  if (session.status !== 'complete') {
    return res.status(400).json({ status: 'error', message: 'Checkout is not complete yet.' });
  }

  if (!session.subscription) {
    return res.status(400).json({ status: 'error', message: 'No subscription on checkout session.' });
  }

  const subscription = await stripe.subscriptions.retrieve(session.subscription, {
    expand: ['items.data.price'],
  });

  if (!['active', 'trialing'].includes(subscription.status)) {
    return res.status(400).json({ status: 'error', message: 'Subscription is not active.' });
  }

  await applyProSubscriptionFromStripe(company._id.toString(), session.subscription, subscription);

  const updated = await Company.findById(company._id).select('subscription');
  const data = updated.subscription?.toObject?.()
    ?? { ...(updated.subscription || {}) };

  try {
    const stripeDetails = await getStripeSubscriptionDetails(session.subscription);
    Object.assign(data, stripeDetails);
  } catch {
    // Fall back to stored subscription fields if Stripe is unreachable
  }

  return res.status(200).json({ status: 'success', data });
});

export const getInvoices = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.user?.company_id)
    .select('subscription');
  if (!company?.subscription?.stripeCustomerId) {
    return res.status(200).json({ status: 'success', data: [] });
  }

  const invoices = await stripe.invoices.list({
    customer: company.subscription.stripeCustomerId,
    limit: 24,
  });

  const data = invoices.data.map((invoice, index, allInvoices) => {
    const seatCount = getInvoiceWorkspaceSeatCount(invoice);
    const previousInvoice = allInvoices[index + 1];
    const previousSeatCount = previousInvoice
      ? getInvoiceWorkspaceSeatCount(previousInvoice)
      : null;
    let addOn = null;
    if (seatCount != null && previousSeatCount != null && seatCount !== previousSeatCount) {
      const diff = seatCount - previousSeatCount;
      const label = Math.abs(diff) === 1 ? 'license' : 'licenses';
      addOn = diff > 0 ? `+${diff} ${label}` : `${diff} ${label}`;
    }

    return {
      id: invoice.number || invoice.id,
      date: formatInvoiceDate(invoice.created),
      description: formatInvoiceDescription(
        invoice,
        seatCount,
        company.subscription?.plan
      ),
      addOn,
      amount: formatInvoiceAmount(resolveInvoiceAmount(invoice, company), invoice.currency),
      status: mapInvoiceStatus(invoice.status),
      invoiceUrl: invoice.invoice_pdf,
    };
  });

  return res.status(200).json({ status: 'success', data });
});

export const getPaymentMethod = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.user?.company_id)
    .select('subscription');
  if (!company?.subscription?.stripeCustomerId) {
    return res.status(200).json({ status: 'success', data: null });
  }

  const customer = await stripe.customers.retrieve(
    company.subscription.stripeCustomerId,
    { expand: ['invoice_settings.default_payment_method'] }
  );

  let paymentMethod = customer.invoice_settings?.default_payment_method;

  if ((!paymentMethod || typeof paymentMethod === 'string')
    && company.subscription?.stripeSubscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(
      company.subscription.stripeSubscriptionId,
      { expand: ['default_payment_method'] }
    );
    paymentMethod = subscription.default_payment_method;
  }

  if (!paymentMethod || typeof paymentMethod === 'string') {
    return res.status(200).json({ status: 'success', data: null });
  }

  const brand = paymentMethod.card?.brand || 'Card';
  return res.status(200).json({
    status: 'success',
    data: {
      brand: brand.charAt(0).toUpperCase() + brand.slice(1),
      last4: paymentMethod.card?.last4,
      expMonth: paymentMethod.card?.exp_month,
      expYear: paymentMethod.card?.exp_year,
    },
  });
});

export const createBillingPortalSession = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.user?.company_id)
    .select('subscription');
  if (!company?.subscription?.stripeCustomerId) {
    return res.status(400).json({
      status: 'error',
      message: 'No billing account found.',
    });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: company.subscription.stripeCustomerId,
    return_url: `${process.env.FRONTEND_URL}/admin/manage-plan`,
  });

  return res.status(200).json({ status: 'success', url: session.url });
});

// Create checkout session for Pro plan
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { interval = 'monthly', seatCount = 1 } = req.body;
  const company = await Company.findById(req.user?.company_id);
  if (!company) {
    return res.status(404).json({ status: 'error', message: 'Company not found' });
  }

  const priceId = await resolveProPriceId(interval);
  const workspaceSeats = Math.max(seatCount, INCLUDED_PRO_SEATS);
  const extraSeatQty = getExtraSeatCount(workspaceSeats);
  const lineItems = [{ price: priceId, quantity: 1 }];
  if (extraSeatQty > 0) {
    lineItems.push({
      price: await resolveExtraSeatPriceId(interval),
      quantity: extraSeatQty,
    });
  }

  // Create or get Stripe customer
  let customerId = company.subscription?.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: req.user?.email,
      name: company.name,
      metadata: { companyId: company._id.toString() }
    });
    customerId = customer.id;
    if (!company.subscription) {
      company.subscription = {};
    }
    company.subscription.stripeCustomerId = customerId;
    await company.save();
  }

  const stripeSub = await getCompanyStripeSubscription(company);
  if (stripeSub?.subscription?.status === 'active' && company.subscription?.stripeSubscriptionId) {
    return res.status(400).json({
      status: 'error',
      code: 'ACTIVE_SUBSCRIPTION',
      message: 'You already have an active Pro subscription. Add seats from Manage Plan or switch billing interval from Pricing.',
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: lineItems,
    metadata: { companyId: company._id.toString() },
    subscription_data: {
      metadata: { companyId: company._id.toString() }
    },
    custom_text: interval === 'yearly' ? {
      submit: {
        message: '$180/year includes 2 seats. Each additional seat is $15/year ($15/month).',
      },
    } : {
      submit: {
        message: '$19/month includes 2 seats. Each additional seat is $19/month.',
      },
    },
    success_url: `${process.env.FRONTEND_URL}/admin/manage-plan?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/admin/pricing`,
  });

  return res.status(200).json({ status: 'success', url: session.url });
});

// Cancel subscription
export const cancelSubscription = asyncHandler(async (req, res) => {
  const { immediate = false } = req.body;
  const company = await Company.findById(req.user?.company_id);
  if (!company) {
    return res.status(404).json({ status: 'error', message: 'Company not found' });
  }

  const plan = company.subscription?.plan;

  // Trial users — just downgrade to free, no Stripe needed
  if (plan === 'trial') {
    resetCompanyToFree(company);
    company.subscription.trialEndsAt = null;
    await company.save();
    return res.status(200).json({
      status: 'success',
      message: 'You have been moved to the Free plan.',
    });
  }

  const customerId = company.subscription?.stripeCustomerId;
  const hasStripeSubscription = company.subscription?.stripeSubscriptionId || customerId;

  if (!hasStripeSubscription) {
    if (plan === 'pro' || plan === 'enterprise') {
      resetCompanyToFree(company);
      await company.save();
      return res.status(200).json({
        status: 'success',
        message: 'You have been moved to the Free plan.',
      });
    }
    return res.status(400).json({
      status: 'error',
      message: 'No active subscription found.',
    });
  }

  if (customerId) {
    await cancelAllCustomerSubscriptions(customerId, { immediate });
  } else if (company.subscription?.stripeSubscriptionId) {
    if (immediate) {
      await stripe.subscriptions.cancel(company.subscription.stripeSubscriptionId);
    } else {
      await stripe.subscriptions.update(
        company.subscription.stripeSubscriptionId,
        { cancel_at_period_end: true }
      );
    }
  }

  if (immediate) {
    resetCompanyToFree(company);
    await company.save();
    return res.status(200).json({
      status: 'success',
      message: 'Subscription cancelled. You are now on the Free plan.',
    });
  }

  company.subscription.cancelAtPeriodEnd = true;
  await company.save();

  return res.status(200).json({
    status: 'success',
    message: 'Subscription will cancel at end of billing period.',
  });
});

// Preview prorated charge or credit before changing seat count
export const previewSeatChange = asyncHandler(async (req, res) => {
  const { seatCount: workspaceSeatCount } = req.body;
  if (!workspaceSeatCount || workspaceSeatCount < INCLUDED_PRO_SEATS) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid seat count. Pro includes ${INCLUDED_PRO_SEATS} seats.`,
    });
  }

  const company = await Company.findById(req.user?.company_id).select('subscription');
  const stripeSub = await getCompanyStripeSubscription(company);
  if (!stripeSub) {
    return res.status(400).json({ status: 'error', message: 'No active subscription found.' });
  }

  const { subscription, parsed } = stripeSub;
  const currentWorkspaceSeats = parsed.workspaceSeatCount;
  const interval = parsed.interval;

  if (workspaceSeatCount === currentWorkspaceSeats) {
    return res.status(400).json({ status: 'error', message: 'Seat count is unchanged.' });
  }

  const isUpgrade = workspaceSeatCount > currentWorkspaceSeats;
  const prorationBehavior = getProrationBehavior(currentWorkspaceSeats, workspaceSeatCount);
  const changeItems = await buildSeatChangeItems(parsed, interval, workspaceSeatCount);

  const preview = await stripe.invoices.createPreview({
    customer: company.subscription.stripeCustomerId,
    subscription: company.subscription.stripeSubscriptionId,
    subscription_details: {
      items: changeItems,
      proration_behavior: prorationBehavior,
    },
    expand: ['lines.data'],
  });

  const currency = preview.currency || 'usd';
  const seatUnitAmount = interval === 'yearly'
    ? YEARLY_EXTRA_SEAT_AMOUNT * 100
    : MONTHLY_EXTRA_SEAT_AMOUNT * 100;
  const seatsRemoved = currentWorkspaceSeats - workspaceSeatCount;
  const nextBillDate = getSubscriptionPeriodEnd(subscription);
  const creditAmount = !isUpgrade
    ? computeDowngradeCredit(preview, subscription, seatUnitAmount, seatsRemoved, currency)
    : null;

  const formatAmount = (amount) => formatInvoiceAmount(Math.round(amount * 100), currency);

  return res.status(200).json({
    status: 'success',
    data: {
      changeType: isUpgrade ? 'upgrade' : 'downgrade',
      currentSeatCount: currentWorkspaceSeats,
      newSeatCount: workspaceSeatCount,
      currentRecurringAmount: formatAmount(calculateProBillingAmount(currentWorkspaceSeats, interval)),
      newRecurringAmount: formatAmount(calculateProBillingAmount(workspaceSeatCount, interval)),
      dueToday: isUpgrade
        ? formatInvoiceAmount(Math.max(0, preview.amount_due), currency)
        : formatInvoiceAmount(0, currency),
      creditAmount,
      nextBillDate: nextBillDate?.toISOString() ?? null,
      billingInterval: interval,
      includedSeats: INCLUDED_PRO_SEATS,
    },
  });
});

// Update seat count
export const updateSeats = asyncHandler(async (req, res) => {
  const { seatCount: workspaceSeatCount } = req.body;
  if (!workspaceSeatCount || workspaceSeatCount < INCLUDED_PRO_SEATS) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid seat count. Pro includes ${INCLUDED_PRO_SEATS} seats.`,
    });
  }

  const company = await Company.findById(req.user?.company_id);
  const stripeSub = await getCompanyStripeSubscription(company);
  if (!stripeSub) {
    return res.status(400).json({ status: 'error', message: 'No active subscription found' });
  }

  const { subscription, parsed } = stripeSub;
  const currentWorkspaceSeats = parsed.workspaceSeatCount;
  const interval = parsed.interval;

  if (workspaceSeatCount === currentWorkspaceSeats) {
    return res.status(400).json({ status: 'error', message: 'Seat count is unchanged.' });
  }

  const isUpgrade = workspaceSeatCount > currentWorkspaceSeats;
  const prorationBehavior = getProrationBehavior(currentWorkspaceSeats, workspaceSeatCount);
  const changeItems = await buildSeatChangeItems(parsed, interval, workspaceSeatCount);

  const updatedSubscription = await stripe.subscriptions.update(
    company.subscription.stripeSubscriptionId,
    {
      items: changeItems,
      proration_behavior: prorationBehavior,
    }
  );

  const updatedParsed = parseProSubscriptionItems(
    await stripe.subscriptions.retrieve(updatedSubscription.id, {
      expand: ['items.data.price'],
    })
  );
  company.subscription.seatCount = updatedParsed.workspaceSeatCount;
  company.subscription.billingInterval = updatedParsed.interval;
  const periodEnd = getSubscriptionPeriodEnd(updatedSubscription);
  if (periodEnd) {
    company.subscription.currentPeriodEnd = periodEnd;
  }
  await company.save();

  const stripeDetails = await getStripeSubscriptionDetails(updatedSubscription.id);
  const subscriptionData = {
    ...(company.subscription?.toObject?.() ?? { ...company.subscription }),
    ...stripeDetails,
    plan: company.subscription.plan,
    status: company.subscription.status,
    stripeCustomerId: company.subscription.stripeCustomerId,
    stripeSubscriptionId: company.subscription.stripeSubscriptionId,
    cancelAtPeriodEnd: company.subscription.cancelAtPeriodEnd,
    currentPeriodEnd: company.subscription.currentPeriodEnd,
  };

  return res.status(200).json({
    status: 'success',
    message: isUpgrade
      ? 'Seats added. Your card has been charged for the prorated amount.'
      : 'Seats reduced. A credit will be applied to your next invoice.',
    seatCount: updatedParsed.workspaceSeatCount,
    data: subscriptionData,
  });
});

// Preview charge when switching between monthly and yearly billing
export const previewBillingIntervalChange = asyncHandler(async (req, res) => {
  const { interval } = req.body;
  if (!['monthly', 'yearly'].includes(interval)) {
    return res.status(400).json({ status: 'error', message: 'Invalid billing interval.' });
  }

  const company = await Company.findById(req.user?.company_id).select('subscription');
  const stripeSub = await getCompanyStripeSubscription(company);
  if (!stripeSub) {
    return res.status(400).json({ status: 'error', message: 'No active subscription found.' });
  }

  const { subscription, parsed } = stripeSub;
  const currentInterval = parsed.interval;
  if (currentInterval === interval) {
    return res.status(400).json({
      status: 'error',
      message: 'You are already on this billing interval.',
    });
  }

  const newBasePriceId = await resolveProPriceId(interval);
  const items = [{ id: parsed.baseItem.id, price: newBasePriceId, quantity: 1 }];
  if (parsed.extraSeatQty > 0) {
    const newExtraPriceId = await resolveExtraSeatPriceId(interval);
    if (parsed.extraItem) {
      items.push({
        id: parsed.extraItem.id,
        price: newExtraPriceId,
        quantity: parsed.extraSeatQty,
      });
    } else {
      items.push({ price: newExtraPriceId, quantity: parsed.extraSeatQty });
    }
  }

  const currency = parsed.baseItem?.price?.currency || 'usd';

  const preview = await stripe.invoices.createPreview({
    customer: company.subscription.stripeCustomerId,
    subscription: company.subscription.stripeSubscriptionId,
    subscription_details: {
      items,
      proration_behavior: 'always_invoice',
    },
    expand: ['lines.data'],
  });

  const formatAmount = (amount) => formatInvoiceAmount(Math.round(amount * 100), currency);

  return res.status(200).json({
    status: 'success',
    data: {
      currentInterval,
      newInterval: interval,
      seatCount: parsed.workspaceSeatCount,
      currentPricePerSeat: formatAmount(getPricePerSeat(currentInterval)),
      newPricePerSeat: formatAmount(getPricePerSeat(interval)),
      currentRecurringAmount: formatAmount(
        calculateProBillingAmount(parsed.workspaceSeatCount, currentInterval)
      ),
      newRecurringAmount: formatAmount(
        calculateProBillingAmount(parsed.workspaceSeatCount, interval)
      ),
      dueToday: formatInvoiceAmount(Math.max(0, preview.amount_due), currency),
      nextBillDate: getSubscriptionPeriodEnd(subscription)?.toISOString() ?? null,
    },
  });
});

// Switch an existing subscription between monthly and yearly billing
export const switchBillingInterval = asyncHandler(async (req, res) => {
  const { interval } = req.body;
  if (!['monthly', 'yearly'].includes(interval)) {
    return res.status(400).json({ status: 'error', message: 'Invalid billing interval.' });
  }

  const company = await Company.findById(req.user?.company_id);
  if (!company) {
    return res.status(404).json({ status: 'error', message: 'Company not found' });
  }

  try {
    const { interval: newInterval } = await applyBillingIntervalChange(company, interval);
    return res.status(200).json({
      status: 'success',
      message: newInterval === 'yearly'
        ? 'Switched to yearly billing. Unused monthly time was credited and your card was charged the prorated yearly amount.'
        : 'Switched to monthly billing. Unused yearly time was credited and your card was charged the prorated monthly amount.',
      billingInterval: newInterval,
    });
  } catch (error) {
    const message = error?.raw?.message || error?.message || 'Failed to switch billing interval.';
    return res.status(400).json({
      status: 'error',
      message,
    });
  }
});

export const startTrial = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.user?.company_id);
  if (!company) {
    return res.status(404).json({ status: 'error', message: 'Company not found' });
  }

  // Only allow trial if never had one before
  if (company.subscription?.trialEndsAt) {
    return res.status(400).json({
      status: 'error',
      message: 'Trial already used. Please upgrade to Pro.'
    });
  }

  if (company.subscription?.plan !== 'free') {
    return res.status(400).json({
      status: 'error',
      message: 'Trial only available for free plan users.'
    });
  }

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 21);

  if (!company.subscription) {
    company.subscription = {};
  }
  company.subscription.plan = 'trial';
  company.subscription.trialEndsAt = trialEndsAt;
  company.subscription.status = 'active';
  await company.save();

  return res.status(200).json({
    status: 'success',
    message: 'Trial started successfully.',
    trialEndsAt,
  });
});

// Stripe webhook handler
export const handleWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ message: `Webhook error: ${err.message}` });
  }

  const { type, data } = event;

  switch (type) {
    case 'checkout.session.completed': {
      const session = data.object;
      if (!session.subscription) {
        break;
      }
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription,
        { expand: ['items.data.price'] }
      );
      const companyId = session.metadata?.companyId ||
        subscription?.metadata?.companyId;
      if (companyId) {
        await applyProSubscriptionFromStripe(companyId, session.subscription, subscription);
      }
      break;
    }
    case 'customer.subscription.updated': {
      const sub = data.object;
      const companyId = sub.metadata?.companyId;
      if (companyId) {
        const currentPeriodEnd = getSubscriptionPeriodEnd(sub);
        const parsed = parseProSubscriptionItems(sub);

        await Company.findByIdAndUpdate(companyId, {
          'subscription.status': sub.status,
          ...(currentPeriodEnd && {
            'subscription.currentPeriodEnd': currentPeriodEnd
          }),
          'subscription.cancelAtPeriodEnd': sub.cancel_at_period_end,
          'subscription.seatCount': parsed.workspaceSeatCount,
          'subscription.billingInterval': getSubscriptionInterval(sub),
        });
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = data.object;
      const companyId = sub.metadata?.companyId;
      if (companyId) {
        const currentPeriodEnd = getSubscriptionPeriodEnd(sub);

        await Company.findByIdAndUpdate(companyId, {
          'subscription.plan': 'free',
          'subscription.status': 'inactive',
          'subscription.stripeSubscriptionId': null,
          'subscription.cancelAtPeriodEnd': false,
          ...(currentPeriodEnd && {
            'subscription.currentPeriodEnd': currentPeriodEnd
          }),
        });
      }
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = data.object;
      const customerId = invoice.customer;
      await Company.findOneAndUpdate(
        { 'subscription.stripeCustomerId': customerId },
        { 'subscription.status': 'past_due' }
      );
      break;
    }
    default:
      break;
  }

  return res.status(200).json({ received: true });
});
