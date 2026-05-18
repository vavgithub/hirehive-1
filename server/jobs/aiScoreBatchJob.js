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

// Poll Railway every 30s, max 10 attempts (~5 mins)
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

  if (!app) {
    console.log(`[BatchJob] No pending brand application for candidate ${candidate._id}, skipping`);
    return;
  }

  const jobId = app.jobId.toString();
  console.log(`[BatchJob] Scoring candidate ${candidate._id} for job ${jobId}`);

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
      if (stageStatus) {
        stageStatus.aiScore = result.score;
        stageStatus.aiReasoning = result.reasoning;
        stageStatus.aiRecommendation = result.recommendation;
      }
      app.aiTriggerStatus = 'done';
      app.aiScoredAt = new Date();
      console.log(`[BatchJob] Candidate ${candidate._id} scored: ${result.score}`);
    } else {
      app.aiTriggerStatus = 'escalated';
      console.log(`[BatchJob] Candidate ${candidate._id} escalated (poll timeout)`);
    }

    candidate.markModified('jobApplications');
    await candidate.save();
  } catch (err) {
    console.error(`[BatchJob] Failed scoring candidate ${candidate._id}:`, err.message);
    app.aiTriggerStatus = 'pending';
    candidate.markModified('jobApplications');
    await candidate.save();
  }
};

export const runAiScoreBatchJob = async () => {
  console.log('[BatchJob] Running...');

  const base = portfolioIntelligenceBase();
  if (!base) {
    console.warn('[BatchJob] PORTFOLIO_INTELLIGENCE_URL is not configured, skipping.');
    return;
  }

  try {
    const brandJobs = await jobs.find({
      status: 'open',
      jobProfile: { $regex: /brand/i },
    });
    console.log(`[BatchJob] Found ${brandJobs.length} open brand jobs`);

    const jobIds = brandJobs.map((j) => j._id);
    console.log('[BatchJob] Brand job IDs:', jobIds);

    const openBrandJobIds = new Set(jobIds.map((id) => id.toString()));

    if (!openBrandJobIds.size) {
      console.log('[BatchJob] No open brand jobs, exiting');
      return;
    }

    const pendingBeforeBehance = await candidates.find({
      jobApplications: {
        $elemMatch: {
          aiTriggerStatus: 'pending',
          jobId: { $in: jobIds },
        },
      },
    });

    console.log(
      `[BatchJob] Pending candidates (before Behance filter): ${pendingBeforeBehance.length}`
    );
    pendingBeforeBehance.forEach((c) => {
      console.log(
        `[BatchJob]   - ${c._id} ${c.email} portfolio: ${c.portfolio ?? '(none)'}`
      );
    });

    const pendingWithBehance = await candidates.find({
      portfolio: { $regex: /behance\.net/i },
      jobApplications: {
        $elemMatch: {
          aiTriggerStatus: 'pending',
          jobId: { $in: jobIds },
        },
      },
    });

    console.log(`[BatchJob] Pending candidates found: ${pendingWithBehance.length}`);

    const pendingCandidates = pendingWithBehance.slice(0, MAX_CONCURRENT);

    if (!pendingCandidates.length) {
      console.log('[BatchJob] No pending candidates, exiting');
      return;
    }

    const inProgressCount = await candidates.countDocuments({
      jobApplications: {
        $elemMatch: { aiTriggerStatus: 'in_progress' },
      },
    });

    const slots = MAX_CONCURRENT - inProgressCount;
    console.log(`[BatchJob] In progress: ${inProgressCount}, available slots: ${slots}`);

    if (slots <= 0) {
      console.log('[BatchJob] At max concurrency, exiting');
      return;
    }

    const batch = pendingCandidates.slice(0, slots);
    console.log(`[BatchJob] Firing batch of ${batch.length} candidate(s)`);

    await Promise.all(batch.map((candidate) => scoreCandidate(candidate, base, openBrandJobIds)));

    console.log('[BatchJob] Batch complete');
  } catch (err) {
    console.error('[BatchJob] Error:', err.message);
  }
};
