import { FeedbackLog } from '../../models/admin/feedbackLog.model.js';

export const getFeedbackExamples = async (req, res) => {
  try {
    const agreements = await FeedbackLog.find({ scoreDelta: { $lte: 1 } })
      .sort({ createdAt: -1 })
      .limit(25)
      .select('aiScore aiReasoning aiRecommendation designerScore designerFeedback scoreDelta')
      .lean();

    const corrections = await FeedbackLog.find({ scoreDelta: 2 })
      .sort({ createdAt: -1 })
      .limit(25)
      .select('aiScore aiReasoning aiRecommendation designerScore designerFeedback scoreDelta')
      .lean();

    return res.json({
      agreements,
      corrections,
      total: agreements.length + corrections.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
