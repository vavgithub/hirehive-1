import express from "express";
import multer from "multer";
import {
  getOrCreateSession,
  submitAnswer,
} from "../../controllers/candidate/voiceInterview.controller.js";
import { protectCandidate } from "../../middlewares/authMiddleware.js";
import { voiceInterviewAnswerLimiter } from "../../middlewares/voiceInterviewRateLimiter.js";

const router = express.Router();

// Memory storage — audio blobs are small; controller writes a temp file for uploadToS3.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      "audio/webm",
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/webm;codecs=opus",
    ];
    // Some browsers send codecs in mimetype; also accept base type prefix
    if (
      allowed.includes(file.mimetype) ||
      file.mimetype?.startsWith("audio/webm") ||
      file.mimetype?.startsWith("audio/ogg") ||
      file.mimetype?.startsWith("audio/mpeg") ||
      file.mimetype?.startsWith("audio/wav")
    ) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported audio type: ${file.mimetype}`));
    }
  },
});

router.get("/:jobId", protectCandidate, getOrCreateSession);

router.post(
  "/:jobId/answer",
  protectCandidate,
  voiceInterviewAnswerLimiter,
  upload.single("audio"),
  submitAnswer
);

export default router;
