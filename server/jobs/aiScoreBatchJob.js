import { candidates } from '../models/candidate/candidate.model.js';
import { jobs } from '../models/admin/jobs.model.js';
import axios from 'axios';

const MAX_CONCURRENT = 3;

const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
};

const portfolioIntelligenceBase = () =>
  (process.env.PORTFOLIO_INTELLIGENCE_URL || '').trim().replace(/\/$/, '');

const pollForScore = async (candidateId, base, attempts = 10, interval = 30000) => {
  for (let i = 0; i < attempts; i++) {
    await new Promise((r) => setTimeout(r, interval));
    try {
      const { data } = await axios.get(
        `${base}/score-status/${candidateId}`,
        { headers }
      );
      if (data.status === 'success' || data.status === 'completed') {
        return data;
      }
    } catch (err) {
      console.error(`Poll attempt ${i + 1} failed:`, err.message);
    }
  }
  return null;
};

const scoreCandidate = async (candidate, base, openBrandJobIds) => {
  const app = candidate.jobApplications.find(
    (a) =>
      a.aiTriggerStatus === 'pending' &&
      openBrandJobIds.has(a.jobId.toString())
  );
  if (!app) return;

  const jobId = app.jobId.toString();
  const appId = app._id;

  await candidates.findOneAndUpdate(
    { _id: candidate._id, 'jobApplications._id': appId },
    { $set: { 'jobApplications.$.aiTriggerStatus': 'in_progress' } }
  );

  try {
    await axios.post(
      `${base}/score`,
      {
        behance_url: candidate.portfolio,
        candidate_id: candidate._id.toString(),
        role: 'brand_identity_designer',
        job_id: jobId,
      },
      { headers }
    );

    const result = await pollForScore(candidate._id.toString(), base);

    if (result) {
      const confidence = result.confidence || 'high';
      const newStatus = confidence === 'low' ? 'awaiting_discovery' : 'done';
      await candidates.findOneAndUpdate(
        { _id: candidate._id, 'jobApplications._id': appId },
        {
          $set: {
            'jobApplications.$.aiTriggerStatus': newStatus,
            'jobApplications.$.aiScoredAt': new Date(),
            'jobApplications.$.stageStatuses.Portfolio.aiScore': result.score,
            'jobApplications.$.stageStatuses.Portfolio.aiReasoning': result.reasoning,
            'jobApplications.$.stageStatuses.Portfolio.aiRecommendation': result.recommendation,
          }
        }
      );
      console.log(`[BatchJob] Scored ${candidate._id} → ${result.score} (${newStatus})`);
    } else {
      await candidates.findOneAndUpdate(
        { _id: candidate._id, 'jobApplications._id': appId },
        { $set: { 'jobApplications.$.aiTriggerStatus': 'awaiting_discovery' } }
      );
      console.log(`[BatchJob] No result for ${candidate._id} → awaiting_discovery`);
    }
  } catch (err) {
    console.error(`[BatchJob] Failed scoring ${candidate._id}:`, err.message);
    await candidates.findOneAndUpdate(
      { _id: candidate._id, 'jobApplications._id': appId },
      { $set: { 'jobApplications.$.aiTriggerStatus': 'pending' } }
    );
  }
};

export const runAiScoreBatchJob = async () => {
  const base = portfolioIntelligenceBase();
  if (!base) {
    return;
  }

  try {
    const brandJobs = await jobs.find({
      status: 'open',
      jobProfile: { $regex: /brand/i },
    });
    const openBrandJobIds = new Set(brandJobs.map((j) => j._id.toString()));

    if (!openBrandJobIds.size) return;

    const openBrandJobObjectIds = brandJobs.map((j) => j._id);

    const pendingWithBehance = await candidates.find({
      portfolio: { $regex: /behance\.net/i },
      jobApplications: {
        $elemMatch: {
          aiTriggerStatus: 'pending',
          jobId: { $in: openBrandJobObjectIds },
        },
      },
    });

    if (!pendingWithBehance.length) return;

    const inProgressCount = await candidates.countDocuments({
      jobApplications: {
        $elemMatch: { aiTriggerStatus: 'in_progress' },
      },
    });

    const slots = MAX_CONCURRENT - inProgressCount;
    if (slots <= 0) return;

    const batch = pendingWithBehance.slice(0, slots);

    await Promise.all(
      batch.map((candidate) => scoreCandidate(candidate, base, openBrandJobIds))
    );
  } catch (err) {
    console.error('Batch job error:', err.message);
  }
};
