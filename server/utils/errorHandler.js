import * as Sentry from "@sentry/node";

export const captureError = (error, context = {}) => {
  console.error(error);
  Sentry.captureException(error, {
    tags: {
      file: context.file,
      action: context.action,
      role: context.role,
    },
    extra: context,
  });
};
