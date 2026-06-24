import express from 'express';
import { protect, roleProtect } from '../../middlewares/authMiddleware.js';
import {
  getSubscription,
  getInvoices,
  getPaymentMethod,
  createBillingPortalSession,
  createCheckoutSession,
  confirmCheckoutSession,
  cancelSubscription,
  previewSeatChange,
  updateSeats,
  previewBillingIntervalChange,
  switchBillingInterval,
  startTrial,
  handleWebhook
} from '../../controllers/admin/billing.controller.js';

const router = express.Router();

// Webhook must use raw body — mounted separately in index.js
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected billing routes — Admin only
router.get('/subscription', protect, roleProtect('Admin'), getSubscription);
router.get('/invoices', protect, roleProtect('Admin'), getInvoices);
router.get('/payment-method', protect, roleProtect('Admin'), getPaymentMethod);
router.post('/portal', protect, roleProtect('Admin'), createBillingPortalSession);
router.post('/create-checkout', protect, roleProtect('Admin'), createCheckoutSession);
router.post('/confirm-checkout', protect, roleProtect('Admin'), confirmCheckoutSession);
router.post('/cancel', protect, roleProtect('Admin'), cancelSubscription);
router.post('/preview-seat-change', protect, roleProtect('Admin'), previewSeatChange);
router.post('/update-seats', protect, roleProtect('Admin'), updateSeats);
router.post('/preview-interval-change', protect, roleProtect('Admin'), previewBillingIntervalChange);
router.post('/switch-interval', protect, roleProtect('Admin'), switchBillingInterval);
router.post('/start-trial', protect, startTrial);

export default router;
