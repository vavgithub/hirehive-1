import nodemailer from "nodemailer";
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createTransporter = async () => {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing SES credentials. Set AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY."
    );
  }

  const ses = new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  // Nodemailer 6 SES transport
  return nodemailer.createTransport({
    SES: {
      ses,
      aws: { SendRawEmailCommand },
    },
  });
};

let transporterInstance = null;
let transporterPromise = null;

/** Resolves Gmail transporter on first use; does not block server startup. */
export const getTransporter = async () => {
  if (transporterInstance) return transporterInstance;
  if (!transporterPromise) {
    transporterPromise = createTransporter()
      .then((transport) => {
        transporterInstance = transport;
        return transport;
      })
      .catch((err) => {
        transporterPromise = null;
        throw err;
      });
  }
  return transporterPromise;
};

const loadAssets = async () => ({
  vavLogo: await readFile(path.join(__dirname, "email_assets/geodeLogo.png"), "base64"),
  instaLogo: await readFile(path.join(__dirname, "email_assets/instaLogo.png"), "base64"),
  ytLogo: await readFile(path.join(__dirname, "email_assets/ytLogo.png"), "base64"),
  linkedinLogo: await readFile(path.join(__dirname, "email_assets/linkedinLogo.png"), "base64"),
});

let assetsCache = null;
let assetsPromise = null;

/** Loads email image assets on first use. */
export const getAssets = async () => {
  if (assetsCache) return assetsCache;
  if (!assetsPromise) {
    assetsPromise = loadAssets()
      .then((loaded) => {
        assetsCache = loaded;
        return loaded;
      })
      .catch((err) => {
        assetsPromise = null;
        throw err;
      });
  }
  return assetsPromise;
};
