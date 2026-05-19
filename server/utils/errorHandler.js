import * as Sentry from "@sentry/node";

export const captureError = (error, context = {}) => {
  console.error(error);
  Sentry.captureException(error, { extra: context });
};
