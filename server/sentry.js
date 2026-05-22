import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}` });

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== "development",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
  profilesSampleRate: 0.1,
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],
});
