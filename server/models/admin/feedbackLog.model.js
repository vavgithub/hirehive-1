import mongoose from 'mongoose';

const feedbackLogSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'candidates', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs', required: true },
  aiScore: { type: Number, default: null },
  aiReasoning: { type: String, default: null },
  aiRecommendation: { type: String, default: null },
  designerScore: { type: Number, required: true },
  designerFeedback: { type: String, required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scoreDelta: { type: Number, default: null },
}, { timestamps: true });

export const FeedbackLog = mongoose.model('FeedbackLog', feedbackLogSchema);
