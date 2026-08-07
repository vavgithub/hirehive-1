import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/Buttons/Button';
import Loader from '../../components/Loaders/Loader';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/Cards/StyledCard';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import {
  getOrCreateVoiceInterviewSession,
  submitVoiceInterviewAnswer,
} from '../../services/voiceInterview.service';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Check } from 'lucide-react';
import * as Sentry from '@sentry/react';

/**
 * Candidate voice screening interview — driven by the sync per-turn API.
 * Text questions: mic record → upload+STT. Multiple/multi-select: tap UI.
 */
const VoiceInterview = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isRecording, error: recorderError, startRecording, stopRecording } = useAudioRecorder();

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ['voiceInterviewSession', jobId],
    queryFn: async () => {
      const data = await getOrCreateVoiceInterviewSession(jobId);
      setSession(data);
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (recorderError) {
      showErrorToast('Microphone', recorderError);
    }
  }, [recorderError]);

  useEffect(() => {
    // Reset tap selection when the question advances
    setSelectedAnswer(null);
  }, [session?.currentQuestionIndex, session?.question?.questionId]);

  const handleCompleted = () => {
    showSuccessToast('Interview complete', 'Our HR team will contact you if you are a good match.');
    navigate('/candidate/my-jobs');
  };

  const applySessionUpdate = (data) => {
    setSession(data);
    if (data?.status === 'completed') {
      handleCompleted();
    }
  };

  const handleTapSubmit = async () => {
    if (selectedAnswer === undefined || selectedAnswer === null || selectedAnswer === '') {
      showErrorToast('Error', 'Please select an answer.');
      return;
    }
    setIsSubmitting(true);
    try {
      const data = await submitVoiceInterviewAnswer(jobId, { selectedAnswer });
      applySessionUpdate(data);
    } catch (err) {
      Sentry.captureException(err, {
        tags: { file: 'VoiceInterview.jsx', action: 'handleTapSubmit', role: 'candidate' },
      });
      showErrorToast('Error', err.response?.data?.message || 'Failed to submit answer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoiceSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { blob, durationSeconds } = await stopRecording();
      const data = await submitVoiceInterviewAnswer(jobId, {
        audioBlob: blob,
        durationSeconds,
      });
      applySessionUpdate(data);
      if (data?.skippedDueToError) {
        showErrorToast('Skipped', "We couldn't transcribe that answer — moving to the next question.");
      }
    } catch (err) {
      Sentry.captureException(err, {
        tags: { file: 'VoiceInterview.jsx', action: 'handleVoiceSubmit', role: 'candidate' },
      });
      const payload = err.response?.data;
      if (payload?.retry) {
        showErrorToast(
          'Try again',
          payload.message || "We couldn't hear that clearly — please try again."
        );
      } else {
        showErrorToast('Error', payload?.message || 'Failed to submit answer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Header HeaderText="Voice interview" withBack="true" />
        <StyledCard padding={4} extraStyles="mt-6">
          <p className="typography-body text-red-500 mb-4">
            {error?.response?.data?.message || 'Failed to start the interview.'}
          </p>
          <Button variant="secondary" onClick={() => navigate('/candidate/my-jobs')}>
            Go to My Jobs
          </Button>
          <Button variant="primary" className="ml-3" onClick={() => refetch()}>
            Retry
          </Button>
        </StyledCard>
      </div>
    );
  }

  if (session?.status === 'completed') {
    return (
      <div className="p-6">
        <Header HeaderText="Interview complete" withBack="true" />
        <StyledCard padding={4} extraStyles="mt-6">
          <p className="typography-body mb-4">
            Your interview is complete — our HR team will contact you if you&apos;re a good match.
          </p>
          <Button variant="primary" onClick={() => navigate('/candidate/my-jobs')}>
            Go to My Jobs
          </Button>
        </StyledCard>
      </div>
    );
  }

  const question = session?.question;
  const progressLabel = `Question ${(session?.currentQuestionIndex ?? 0) + 1} of ${session?.totalQuestions ?? 0}`;

  const toggleMultiSelect = (option) => {
    setSelectedAnswer((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Header HeaderText="Voice screening" withBack="true" />
      <p className="typography-small-p text-font-gray mt-2 mb-6">{progressLabel}</p>

      <StyledCard padding={4} backgroundColor="bg-background-90">
        <h3 className="typography-body mb-4">{question?.text}</h3>

        {question?.audioUrl && (
          <audio className="w-full mb-6" controls src={question.audioUrl} autoPlay>
            Your browser does not support audio playback.
          </audio>
        )}

        {question?.type === 'text' ? (
          <div className="flex flex-col gap-4">
            <p className="typography-small-p text-font-gray">
              Tap record, answer out loud, then stop and submit.
            </p>
            <div className="flex gap-3 flex-wrap">
              {!isRecording ? (
                <Button
                  type="button"
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={startRecording}
                >
                  Record answer
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="cancel"
                  disabled={isSubmitting}
                  onClick={handleVoiceSubmit}
                >
                  Stop & submit
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ gridAutoRows: '1fr' }}>
              {(question?.options || []).map((option, optionIndex) => {
                const isMulti = question.type === 'multi-select';
                const isSelected = isMulti
                  ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                  : selectedAnswer === option;

                return (
                  <div
                    key={optionIndex}
                    className={
                      'px-4 py-2 min-h-11 rounded-xl flex items-center cursor-pointer hover-outline ' +
                      (isSelected ? 'selection-primary' : 'bg-background-80')
                    }
                    onClick={() => {
                      if (isMulti) toggleMultiSelect(option);
                      else setSelectedAnswer(option);
                    }}
                  >
                    {isMulti ? (
                      <div className="relative flex items-center justify-center mr-2">
                        <input
                          type="checkbox"
                          checked={Boolean(isSelected)}
                          readOnly
                          className="appearance-none outline-none border h-4 w-4 cursor-pointer rounded bg-background-100 checked:bg-accent-100 checked:border-accent-100 peer"
                        />
                        <div className="hidden peer-checked:block absolute top-[-1px] left-[-2px] w-[1.25rem] scale-90 h-[1.25rem] text-font-invert pointer-events-none">
                          <IconWrapper customStrokeWidth={4} customIconSize={3} icon={Check} inheritColor size={0} />
                        </div>
                      </div>
                    ) : (
                      <input
                        type="radio"
                        checked={Boolean(isSelected)}
                        readOnly
                        className="custom-radio"
                      />
                    )}
                    <span className="typography-body overflow-hidden whitespace-nowrap text-ellipsis">
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                variant="primary"
                disabled={isSubmitting}
                onClick={handleTapSubmit}
              >
                {isSubmitting ? 'Submitting…' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </StyledCard>
    </div>
  );
};

export default VoiceInterview;
