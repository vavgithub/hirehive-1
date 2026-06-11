import nodemailer from "nodemailer";
import { google } from "googleapis";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_SENDER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
};

export const assets = {
  vavLogo: await readFile(path.join(__dirname, "email_assets/geodeLogo.png"), "base64"),
  instaLogo: await readFile(path.join(__dirname, "email_assets/instaLogo.png"), "base64"),
  ytLogo: await readFile(path.join(__dirname, "email_assets/ytLogo.png"), "base64"),
  linkedinLogo: await readFile(path.join(__dirname, "email_assets/linkedinLogo.png"), "base64"),
};
