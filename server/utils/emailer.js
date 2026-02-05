import nodemailer from "nodemailer";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  pool: true,
  maxConnections: 1,
  maxMessages: 50,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

export const assets = {
  vavLogo: await readFile(path.join(__dirname,"email_assets/geodeLogo.png"), "base64"),
  instaLogo: await readFile(path.join(__dirname,"email_assets/instaLogo.png"), "base64"),
  ytLogo: await readFile(path.join(__dirname,"email_assets/ytLogo.png"), "base64"),
  linkedinLogo: await readFile(path.join(__dirname,"email_assets/linkedinLogo.png"), "base64"),
};
