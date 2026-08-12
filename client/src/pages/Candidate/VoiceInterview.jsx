import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Check, Mic, Pause, Play } from 'lucide-react';
import { Button } from '../../components/Buttons/Button';
import Loader from '../../components/Loaders/Loader';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/Cards/StyledCard';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import {
  getOrCreateVoiceInterviewSession,
  submitVoiceInterviewAnswer,
} from '../../services/voiceInterview.service';
import * as Sentry from '@sentry/react';

/** Same progress bar pattern as Assessment.jsx */
const ProgressBar = ({ answeredCount, total }) => {
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;
  return (
    <div className="w-full bg-background-60 h-2 rounded-full overflow-hidden">
      <div
        className="bg-blue-100 h-full transition-all rounded-full duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/**
 * Custom TTS player — hidden <audio>, controls styled with Button + Assessment tokens.
 * No native browser chrome.
 */
const QuestionAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    const el = audioRef.current;
    if (!el || !src) return;
    el.load();
    const playPromise = el.play();
    if (playPromise?.then) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [src]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (secs) => {
    if (!secs || Number.isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!src) return null;

  return (
    <StyledCard backgroundColor="bg-background-80" padding={3} extraStyles="mb-6">
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        className="hidden"
        onTimeUpdate={(e) => {
          const { currentTime, duration: d } = e.currentTarget;
          setProgress(d ? (currentTime / d) * 100 : 0);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(100);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="icon"
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause question audio' : 'Play question audio'}
          icon={() => (
            <IconWrapper
              icon={isPlaying ? Pause : Play}
              size={0}
              customIconSize={3}
              customStrokeWidth={6}
              inheritColor
            />
          )}
        />
        <div className="flex-1 min-w-0">
          <p className="typography-small-p text-font-gray mb-2">Question audio</p>
          <div className="w-full bg-background-60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-full transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="typography-small-p text-font-gray mt-2">
            {formatTime((progress / 100) * duration)} / {formatTime(duration)}
          </p>
        </div>
      </div>
    </StyledCard>
  );
};

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
    setSelectedAnswer(null);
  }, [session?.currentQuestionIndex, session?.question?.questionId]);

  const handleCompleted = useCallback(() => {
    showSuccessToast('Interview complete', 'Our HR team will contact you if you are a good match.');
    navigate('/candidate/my-jobs');
  }, [navigate]);

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
      <Container hasBgColor extraStyles="flex justify-center items-center">
        <Loader />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container hasBgColor>
        <div className="container">
          <Header HeaderText="Voice screening" withBack="true" />
          <StyledCard padding={4} extraStyles="mt-6" backgroundColor="bg-background-90">
            <p className="typography-body text-red-500 mb-4">
              {error?.response?.data?.message || 'Failed to start the interview.'}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="secondary" onClick={() => navigate('/candidate/my-jobs')}>
                Go to My Jobs
              </Button>
              <Button variant="primary" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          </StyledCard>
        </div>
      </Container>
    );
  }

  if (session?.status === 'completed') {
    return (
      <Container hasBgColor>
        <div className="container">
          <Header HeaderText="Interview complete" withBack="true" />
          <StyledCard padding={4} extraStyles="mt-6" backgroundColor="bg-background-90">
            <p className="typography-body mb-4">
              Your interview is complete — our HR team will contact you if you&apos;re a good match.
            </p>
            <Button variant="primary" onClick={() => navigate('/candidate/my-jobs')}>
              Go to My Jobs
            </Button>
          </StyledCard>
        </div>
      </Container>
    );
  }

  const question = session?.question;
  const currentIndex = session?.currentQuestionIndex ?? 0;
  const totalQuestions = session?.totalQuestions ?? 0;
  const answeredCount = currentIndex;
  const completionPct =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const toggleMultiSelect = (option) => {
    setSelectedAnswer((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
    });
  };

  return (
    <Container hasBgColor>
      <div className="container max-w-4xl mx-auto">
        <Header HeaderText="Voice screening" withBack="true" />

        <div className="mt-6 mb-8">
          <span className="font-bricolage mb-2 inline-block">
            {completionPct}% Completed
          </span>
          <ProgressBar answeredCount={answeredCount} total={totalQuestions} />
          <p className="typography-small-p text-font-gray mt-2">
            Question {currentIndex + 1} of {totalQuestions}
          </p>
        </div>

        <div className="mb-8">
          <StyledCard
            backgroundColor="bg-background-70"
            padding={3}
            extraStyles="flex flex-col gap-4"
          >
            <h2>{`Question ${currentIndex + 1}: ${question?.text}`}</h2>
            <QuestionAudioPlayer src={question?.audioUrl} />
          </StyledCard>

          <StyledCard
            backgroundColor="bg-background-90"
            borderRadius=" rounded-br-xl rounded-bl-xl "
            extraStyles="w-[95%] mx-auto"
            padding={3}
          >
            {question?.type === 'text' ? (
              <div className="flex flex-col gap-4">
                <p className="typography-small-p text-font-gray">
                  Tap record, answer out loud, then stop and submit.
                </p>

                {isRecording && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background-80">
                    <div className="bg-red-200 w-3 h-3 rounded-full animate-pulse" />
                    <span className="typography-body text-font-main">Recording…</span>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap justify-end">
                  {!isRecording && !isSubmitting && (
                    <Button
                      type="button"
                      variant="primary"
                      icon={() => (
                        <IconWrapper
                          icon={Mic}
                          size={0}
                          customIconSize={3}
                          customStrokeWidth={6}
                          inheritColor
                        />
                      )}
                      onClick={startRecording}
                    >
                      Record answer
                    </Button>
                  )}
                  {isRecording && !isSubmitting && (
                    <Button type="button" variant="cancel" onClick={handleVoiceSubmit}>
                      Stop & submit
                    </Button>
                  )}
                  {isSubmitting && (
                    <Button type="button" variant="primary" disabled>
                      Submitting…
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
                  style={{ gridAutoRows: '1fr' }}
                >
                  {(question?.options || []).map((option, optionIndex) => {
                    const isMulti = question.type === 'multi-select';
                    const isSelected = isMulti
                      ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                      : selectedAnswer === option;

                    return (
                      <div
                        key={optionIndex}
                        className={
                          'flex items-center hover-outline rounded-xl h-full ' +
                          (isSelected ? 'selection-primary' : 'bg-background-80')
                        }
                      >
                        <label className="flex cursor-pointer items-center space-x-3 p-4 w-full">
                          {isMulti ? (
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={Boolean(isSelected)}
                                onChange={() => toggleMultiSelect(option)}
                                className="appearance-none outline-none border mr-2 h-4 w-4 cursor-pointer rounded bg-background-100 hover:border-grey-100 checked:bg-accent-100 checked:border-accent-100 peer"
                              />
                              <div className="hidden peer-checked:block cursor-pointer absolute top-[-1px] left-[-2px] w-[1.25rem] scale-90 h-[1.25rem] text-font-invert pointer-events-none">
                                <IconWrapper
                                  customStrokeWidth={4}
                                  customIconSize={3}
                                  icon={Check}
                                  inheritColor
                                  size={0}
                                />
                              </div>
                            </div>
                          ) : (
                            <input
                              type="radio"
                              checked={Boolean(isSelected)}
                              onChange={() => setSelectedAnswer(option)}
                              className="custom-radio"
                            />
                          )}
                          <span className="typography-body">{option}</span>
                        </label>
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
      </div>
    </Container>
  );
};

export default VoiceInterview;
