import rateLimit, { ipKeyGenerator } from "express-rate-limit";

/**
 * No rate limiting exists elsewhere in this codebase. This route needs it
 * because every hit costs Gemini STT + Polly TTS.
 *
 * Keyed by candidateId (from protectCandidate), not just IP.
 * IP fallback uses ipKeyGenerator (required by express-rate-limit v8 for IPv6).
 */
export const voiceInterviewAnswerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  keyGenerator: (req, res) => {
    const candidateKey = req.candidate?._id?.toString() || req.candidate?.id;
    if (candidateKey) return `candidate:${candidateKey}`;
    return ipKeyGenerator(req, res);
  },
  message: {
    success: false,
    message:
      "Too many interview responses submitted. Please slow down and try again shortly.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
