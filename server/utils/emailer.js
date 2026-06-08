import nodemailer from "nodemailer";
import { google } from "googleapis";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getOAuthTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessTokenResponse = await oauth2Client.getAccessToken();
  const accessToken =
    typeof accessTokenResponse === "string"
      ? accessTokenResponse
      : accessTokenResponse?.token;

  if (!accessToken) {
    throw new Error(
      "Failed to obtain Gmail OAuth2 access token. Check GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, and GMAIL_SENDER."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_SENDER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken,
    },
  });
};

let transporterInstance = null;
let transporterPromise = null;

/** Resolves Gmail transporter on first use; does not block server startup. */
export const getTransporter = async () => {
  if (transporterInstance) return transporterInstance;
  if (!transporterPromise) {
    transporterPromise = getOAuthTransporter()
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
