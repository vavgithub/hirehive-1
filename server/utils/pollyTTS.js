import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "./s3utility.js";
import { captureError } from "./errorHandler.js";

const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Synthesizes text to speech and uploads via existing uploadToS3 (disk path).
 * @param {string} text - question text to speak
 * @returns {Promise<string>} CloudFront URL of the synthesized audio
 */
export async function synthesizeQuestionAudio(text) {
  try {
    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Joanna",
      Engine: "standard",
    });

    const response = await pollyClient.send(command);
    const audioBytes = await response.AudioStream.transformToByteArray();

    const tempPath = path.join(os.tmpdir(), `tts-${uuidv4()}.mp3`);
    fs.writeFileSync(tempPath, Buffer.from(audioBytes));

    const cloudFrontUrl = await uploadToS3(tempPath, "voice-interview-questions");
    return cloudFrontUrl;
  } catch (err) {
    captureError(err, {
      file: "pollyTTS.js",
      action: "synthesizeQuestionAudio",
      role: "candidate",
    });
    throw err;
  }
}
