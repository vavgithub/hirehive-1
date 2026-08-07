import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

let cachedGeminiKey = null;
let cacheExpiresAt = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetches Gemini API key from Secrets Manager (cached for CACHE_TTL_MS).
 * Secret shape: { "GEMINI_API_KEY": "..." } at SecretId hirehive/gemini-api-key
 *
 * Fallback: GEMINI_API_KEY env var (useful for local/dev without Secrets Manager).
 */
export async function getGeminiApiKey() {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }

  const now = Date.now();
  if (cachedGeminiKey && now < cacheExpiresAt) {
    return cachedGeminiKey;
  }

  const result = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: "hirehive/gemini-api-key" })
  );
  const parsed = JSON.parse(result.SecretString);

  cachedGeminiKey = parsed.GEMINI_API_KEY;
  cacheExpiresAt = now + CACHE_TTL_MS;

  return cachedGeminiKey;
}
