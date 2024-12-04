import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ChevronUp, ChevronDown, Camera, Mic } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import axios from "../../api/axios";
import { showSuccessToast, showErrorToast } from '../../components/ui/Toast';

// Utility function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Hook for fetching assessment questions
export const useAssessmentQuestions = () => {
  return useQuery({
    queryKey: ['assessment-questions'],
    queryFn: async () => {
      const response = await axios.get('/admin/candidate/questions/random');
      return response.data.questions;
    },
    staleTime: Infinity,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// Progress Bar Component
const ProgressBar = ({ answeredCount, total }) => {
  const progress = (answeredCount / total) * 100;
  return (
    <div className="w-full bg-background-90 h-2 rounded-full overflow-hidden">
      <div
        className="bg-blue-100 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Question Sidebar Component
const QuestionSidebar = ({ questions, currentQuestion, onQuestionSelect, answers }) => {
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[200px] bg-background-30 fixed h-screen overflow-y-auto flex-shrink-0">
      <div className="mb-6 p-4 rounded-xl">
        <div className="flex flex-col p-2 rounded-xl items-center bg-background-80">
          <p className='typography-body text-font-gray'>Time remaining</p>
          <span className="bg-background-70 typography-h3 p-2 rounded-xl">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>
      <h2 className="typography-h3 text-font-gray p-4">Questions</h2>
      {questions.map((q, index) => (
        <div
          key={q._id}
          className={`typography-body py-2 pl-4 my-2 cursor-pointer rounded flex items-center justify-between ${
            currentQuestion === index
              ? 'text-font-accent'
              : answers[q._id]
                ? 'text-green-100'
                : 'text-font-gray hover:bg-background-60'
          }`}
          onClick={() => onQuestionSelect(index)}
        >
          <span className="truncate flex-grow mr-2">
            Question {index + 1}
            {answers[q._id] && ' ✓'}
          </span>
          {currentQuestion === index && (
            <div className="w-1 h-6 rounded-tl-xl rounded-bl-xl bg-teal-400 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

// Question Display Component
const QuestionDisplay = ({
  question,
  currentAnswer,
  questionNumber,
  onAnswer,
  onPrevious,
  onNext,
  isFirst,
  isLast,
  isAllAnswered,
  renderFinishButton,
}) => (
  <div className="flex-grow p-8 pl-[212px]">
    <div className="mb-8">
      <h1 className="typography-h1 mb-4">{`Question ${questionNumber + 1}: ${question.text}`}</h1>
      {question.questionType === 'image' && question.imageUrl && (
        <div className="mb-4">
          <img
            src={question.imageUrl}
            alt="Question visual"
            className="max-w-md rounded-xl"
          />
        </div>
      )}
      <div className='grid grid-cols-2 gap-x-4 items-center'>
        {question.options.map((option, index) => (
          <div key={index} className="mb-4 bg-background-80 p-4 rounded-xl">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option.text}
                checked={currentAnswer === option.text}
                onChange={() => onAnswer(question._id, option.text)}
                className="form-radio h-5 w-5 text-red-600"
              />
              <div className="flex flex-col gap-2">
                <span className='typography-body'>{option.text}</span>
                {option.imageUrl && (
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    className="max-w-xs rounded-lg mt-2"
                  />
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-between">
      <div className="w-[152px]">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </Button>
      </div>
      <div className="w-[152px]">
        {isLast ? (
          renderFinishButton()
        ) : (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={isLast}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  </div>
);

// Webcam Component
const WebcamView = ({ isMinimized, toggleMinimize, isRecording, webcamRef }) => (
  <div className={`bg-gray-800 rounded-lg overflow-hidden ${isMinimized ? 'w-64' : 'w-96'}`}>
    <div className="flex justify-between items-center p-2 bg-gray-700">
      <h3 className="font-semibold">
        {isRecording ? 'Recording...' : 'Camera Off'}
      </h3>
      <button onClick={toggleMinimize}>
        {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
    </div>
    {!isMinimized && (
      <div className="relative aspect-video">
        <Webcam
          ref={webcamRef}
          audio={true}
          mirrored={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <div className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-800'}`}>
            <Camera size={20} />
          </div>
          <div className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-800'}`}>
            <Mic size={20} />
          </div>
        </div>
      </div>
    )}
  </div>
);

// Upload Progress Overlay Component
const UploadProgressOverlay = ({ uploadProgress }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-background-90 p-8 rounded-xl flex flex-col items-center space-y-4">
      <Loader />
      <h3 className="typography-h3 text-font-gray">Uploading Assessment</h3>
      <div className="w-full max-w-md bg-background-70 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-teal-400 h-full transition-all duration-300 ease-out"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
      <p className="typography-body text-font-gray">{uploadProgress}% Complete</p>
    </div>
  </div>
);

// Main Assessment Component
const Assessment = () => {
  const navigate = useNavigate();
  const [startTime] = useState(Date.now());
  const { candidateAuthData, isAuthenticatedCandidate } = useSelector(
    (state) => state.candidateAuth
  );

  // States
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isWebcamMinimized, setIsWebcamMinimized] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  // Refs
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Authentication check
  useEffect(() => {
    if (!isAuthenticatedCandidate) {
      navigate('/login');
      return;
    }
    
    if (candidateAuthData?.hasGivenAssessment) {
      navigate('/candidate/dashboard');
      showErrorToast('Error', 'You have already completed the assessment');
      return;
    }
  }, [isAuthenticatedCandidate, candidateAuthData, navigate]);

  // Fetch questions
  const {
    data: questions = [],
    isLoading,
    isError,
    error
  } = useAssessmentQuestions();

  // Calculate states
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = questions ? answeredCount === questions.length : false;

  // Recording functions
  useEffect(() => {
    startRecording();
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      
      webcamRef.current.video.srcObject = stream;
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
          console.log('Recording chunk received:', event.data.size);
        }
      };
  
      mediaRecorder.onstop = async () => {
        console.log('Recording stopped, creating blob...');
        const blob = new Blob(chunksRef.current, {
          type: 'video/webm'
        });
        console.log('Blob created:', blob.size);
        setRecordedBlob(blob);
        chunksRef.current = [];
      };
  
      // Request data every second
      mediaRecorder.start(1000);
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      showErrorToast('Error', 'Failed to start recording. Please ensure camera access is granted.');
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        // Set up a one-time event listener for when recording stops
        mediaRecorderRef.current.onstop = async () => {
          console.log('Recording stopped, creating blob...');
          const blob = new Blob(chunksRef.current, {
            type: 'video/webm'
          });
          console.log('Blob created:', blob.size);
          setRecordedBlob(blob);
          chunksRef.current = [];
          resolve(blob);
        };
  
        // Stop the recording
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        
        // Stop all tracks
        const tracks = webcamRef.current.video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      } else {
        resolve(null);
      }
    });
  };

//   const uploadVideo = async (videoBlob) => {
//     if (!videoBlob) {
//       throw new Error('No recording available');
//     }
  
//     try {
//       // Create a proper File object
//       const videoFile = new File(
//         [videoBlob], 
//         'assessment-recording.webm',
//         { 
//           type: 'video/webm',
//           lastModified: Date.now()
//         }
//       );
  
//       // Log the file to verify it's created correctly
//       console.log('Video file created:', videoFile);
  
//       const formData = new FormData();
//       // Use the same field name as expected by multer
//       formData.append('video', videoFile);
  
//       // Log FormData contents
//       console.log('FormData entries:');
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }
  
//       const response = await axios.post('/admin/candidate/upload-recording', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(progress);
//         },
//       });
  
//       return response.data.videoUrl;
//     } catch (error) {
//       console.error('Upload error:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//       }
//       throw error;
//     }
//   };


// // Modified submit mutation
// const submitAssessmentMutation = useMutation({
//   mutationFn: async (assessmentData) => {
//     try {
//       setIsUploading(true);
      
//       // Stop recording and get the blob
//       const videoBlob = await stopRecording();
      
//       if (!videoBlob) {
//         throw new Error('No recording available');
//       }

//       // Upload video and get URL
//       const videoUrl = await uploadVideo(videoBlob);

//       if (!videoUrl) {
//         throw new Error('Failed to get video URL');
//       }


//       // Then submit assessment with video URL
//       const response = await axios.post(
//         `/admin/candidate/questionnaire/${candidateAuthData._id}`,
//         {
//           ...assessmentData,
//           recordingUrl: uploadResponse.data.videoUrl
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Submit error:', error);
//       throw error;
//     }
//   },
//   onSuccess: (data) => {
//     showSuccessToast('Success', 'Assessment submitted successfully');
//     navigate('/candidate/my-jobs');
//   },
//   onError: (error) => {
//     showErrorToast(
//       'Error',
//       error.message || 'Failed to submit assessment'
//     );
//     setIsUploading(false);
//   },
//   onSettled: () => {
//     setIsUploading(false);
//     setUploadProgress(0);
//   }
// });

const uploadVideo = async (videoBlob) => {
  if (!videoBlob) {
    throw new Error('No recording available');
  }

  try {
    // Create a proper File object
    const videoFile = new File(
      [videoBlob], 
      'assessment-recording.webm',
      { 
        type: 'video/webm',
        lastModified: Date.now()
      }
    );

    // Log the file to verify it's created correctly
    console.log('Video file created:', videoFile);

    const formData = new FormData();
    formData.append('video', videoFile);

    // Log FormData contents
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.post('/admin/candidate/upload-recording', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      },
    });

    if (!response.data.videoUrl) {
      throw new Error('No video URL received from server');
    }

    return response.data.videoUrl;
  } catch (error) {
    console.error('Upload error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

const submitAssessmentMutation = useMutation({
  mutationFn: async (assessmentData) => {
    try {
      setIsUploading(true);
      
      // Stop recording and get the blob
      const videoBlob = await stopRecording();
      
      if (!videoBlob) {
        throw new Error('No recording available');
      }

      // Upload video and get URL
      const recordingUrl = await uploadVideo(videoBlob);

      // Submit assessment with video URL
      const response = await axios.post(
        `/admin/candidate/questionnaire/${candidateAuthData._id}`,
        {
          ...assessmentData,
          recordingUrl // Use the URL returned from uploadVideo
        }
      );
      return response.data;
    } catch (error) {
      console.error('Submit error:', error);
      throw error;
    }
  },
  onSuccess: (data) => {
    showSuccessToast('Success', 'Assessment submitted successfully');
    navigate('/candidate/my-jobs');
  },
  onError: (error) => {
    showErrorToast(
      'Error',
      error.message || 'Failed to submit assessment'
    );
    setIsUploading(false);
  },
  onSettled: () => {
    setIsUploading(false);
    setUploadProgress(0);
  }
});

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Simplified handleFinish
const handleFinish = async () => {
  if (!isAllAnswered) {
    showErrorToast('Error', 'Please answer all questions before submitting');
    return;
  }

  try {
    const totalTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
    await submitAssessmentMutation.mutateAsync({
      answers,
      totalTimeInSeconds
    });
  } catch (error) {
    console.error('Finish error:', error);
  }
};
  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-90">
        <div className="typography-h2 text-font-gray">Loading questions...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-90">
        <div className="flex flex-col items-center gap-4">
          <div className="typography-h2 text-red-500">Error loading questions</div>
          <div className="typography-body text-font-gray">{error.message}</div>
        </div>
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-90">
        <div className="typography-h2 text-font-gray">No questions available</div>
      </div>
    );
  }

  const renderFinishButton = () => (
    <Button
      variant="primary"
      onClick={handleFinish}
      disabled={!isAllAnswered || isUploading}
    >
      {isUploading ? 'Uploading...' : 'Finish'}
    </Button>
  );

  return (
    <>
      {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      <div className="flex h-screen bg-background-90">
        <QuestionSidebar
          questions={questions}
          currentQuestion={currentQuestion}
          onQuestionSelect={setCurrentQuestion}
          answers={answers}
        />
        <div className="flex-grow flex flex-col">
          <div className="bg-background-90 pl-[212px] p-4 flex gap-8 justify-between items-center">
            <ProgressBar answeredCount={answeredCount} total={questions.length} />
            <div className='typography-body text-font-gray'>
              {`${answeredCount}/${questions.length} Answered`}
            </div>
          </div>
          <QuestionDisplay
            question={questions[currentQuestion]}
            questionNumber={currentQuestion}
            currentAnswer={answers[questions[currentQuestion]._id]}
            onAnswer={handleAnswer}
            onPrevious={() => {
              if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
            }}
            onNext={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
              }
            }}
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === questions.length - 1}
            isAllAnswered={isAllAnswered}
            renderFinishButton={renderFinishButton}
          />
          <div className="p-4 flex justify-end">
            <WebcamView
              isMinimized={isWebcamMinimized}
              toggleMinimize={() => setIsWebcamMinimized(prev => !prev)}
              isRecording={isRecording}
              webcamRef={webcamRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Assessment;