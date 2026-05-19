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

  app.aiTriggerStatus = 'in_progress';
  candidate.markModified('jobApplications');
  await candidate.save();

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
      const stageStatus = app.stageStatuses.get('Portfolio');
      stageStatus.aiScore = result.score;
      stageStatus.aiReasoning = result.reasoning;
      stageStatus.aiRecommendation = result.recommendation;

      // Phase 2 — confidence routing
      if (result.confidence === 'low' || result.projects_scored < 2) {
        app.aiTriggerStatus = 'escalated';
        console.log(`[BatchJob] Low confidence (${result.confidence}, ${result.projects_scored} projects) for ${candidate._id} — escalating`);
      } else {
        app.aiTriggerStatus = 'done';
        console.log(`[BatchJob] Scored ${candidate._id} with confidence: ${result.confidence}`);
      }

      app.aiScoredAt = new Date();
      candidate.markModified('jobApplications');
      await candidate.save();
    } else {
      app.aiTriggerStatus = 'escalated';
      candidate.markModified('jobApplications');
      await candidate.save();
    }
  } catch (err) {
    console.error(`Failed scoring candidate ${candidate._id}:`, err.message);
    app.aiTriggerStatus = 'pending';
    candidate.markModified('jobApplications');
    await candidate.save();
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
