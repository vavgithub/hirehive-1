import { createCipheriv, createDecipheriv } from "crypto";
import { randomBytes } from "crypto";
const algorithm = "aes-256-cbc";

export function encrypt(text) {
  try {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32-byte key
    const iv = randomBytes(16); // Always unique
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    throw new Error(error?.message || "Encryption error")
  }
}

export function decrypt(data) {
  try {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32-byte key

    const [ivHex, encryptedHex] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = createDecipheriv(algorithm, key, iv);
    return Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString();
  } catch (error) {
    throw new Error(error?.message || "Decryption error")
  }
}
