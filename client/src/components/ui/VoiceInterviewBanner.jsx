import React from 'react'
import { Button } from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'
import IconWrapper from '../Cards/IconWrapper';
import { Mic } from 'lucide-react';

/**
 * Shown on My Jobs when the candidate has unfinished voice screening interviews.
 * Mirrors AssessmentBanner pattern (banner + CTA into the flow).
 */
const VoiceInterviewBanner = ({ pendingInterviews = [] }) => {
  const navigate = useNavigate();
  const first = pendingInterviews[0];
  if (!first) return null;

  const jobId = first.jobId?._id || first.jobId;
  const label =
    first.voiceInterview?.status === 'in_progress'
      ? 'Resume screening'
      : 'Continue screening';

  return (
    <div className="container flex justify-between rounded-xl gap-4 p-6 my-4 items-center bg-background-90 border border-background-60">
      <div className="flex gap-4 items-center">
        <div className="hidden w-16 h-16 rounded-full bg-primary-300 border border-primary-100 items-center md:flex justify-center">
          <IconWrapper icon={Mic} customStrokeWidth={7} />
        </div>
        <div className="flex-col">
          <h2 className="hidden md:flex pb-2">Voice screening incomplete</h2>
          <p className="typography-body text-font-gray">
            {pendingInterviews.length === 1
              ? `You have an unfinished screening for ${first.jobApplied || first.jobId?.jobTitle || 'a job'}. Pick up where you left off.`
              : `You have ${pendingInterviews.length} unfinished voice screenings. Resume to continue.`}
          </p>
        </div>
      </div>
      <div className="md:flex hidden shrink-0">
        <Button
          variant="primary"
          onClick={() => navigate(`/candidate/voice-interview/${jobId}`)}
        >
          {label}
        </Button>
      </div>
    </div>
  );
};

export default VoiceInterviewBanner;
