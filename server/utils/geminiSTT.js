import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiApiKey } from "./secretsCache.js";
import { captureError } from "./errorHandler.js";

/**
 * Transcribes a candidate's recorded answer via Gemini.
 * @param {Buffer} audioBuffer - raw audio bytes (e.g. webm/opus from MediaRecorder)
 * @param {string} mimeType - e.g. 'audio/webm'
 * @returns {Promise<string>} transcript text
 */
export async function transcribeAudio(audioBuffer, mimeType) {
  try {
    const apiKey = await getGeminiApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          data: audioBuffer.toString("base64"),
          mimeType,
        },
      },
      {
        text: "Transcribe this audio exactly as spoken. Return only the transcript, no commentary.",
      },
    ]);

    return result.response.text().trim();
  } catch (err) {
    captureError(err, {
      file: "geminiSTT.js",
      action: "transcribeAudio",
      role: "candidate",
    });
    throw err;
  }
}
