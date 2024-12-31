import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ChevronUp, ChevronDown, Camera, Mic } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import axios from "../../api/axios";
import { showSuccessToast, showErrorToast } from '../../components/ui/Toast';
import LightLogo from "../../svg/Logo/lightLogo.svg"
import { fetchCandidateAuthData, updateAssessmentStatus } from '../../redux/candidateAuthSlice';
import TimerIconSmall from '../../svg/TimerIconSmall';
import WarningIcon from '../../svg/WarningIcon';
import Draggable from 'react-draggable';
import { uploadAssessment } from '../../utility/cloudinary';
const ONE_MINUTE = 60;

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
    <div className="w-full bg-background-60 h-2 rounded-full overflow-hidden">
      <div
        className="bg-blue-100 h-full transition-all rounded-full duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Question Sidebar Component
const QuestionSidebar = ({ questions, currentQuestion, onQuestionSelect, answers , submitTest}) => {
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //If time exceeds, Automatic assessment submission is triggered.
  useEffect(()=>{
    if(timeRemaining === 0){
      submitTest(true)
    }
  },[timeRemaining])

  const [ min ,sec ] = useMemo(()=> formatTime(timeRemaining).split(":") ,[timeRemaining]) 
  
  return (
    <div className="w-[200px] bg-background-30 fixed h-screen overflow-y-auto flex-shrink-0 custom-scrollbar">
      <div className='p-4 flex items-center justify-center '>

        <img className='h-11' src={LightLogo} />
      </div>
      <div className="mb-6 p-4 rounded-xl">
        <div className="flex flex-col p-4 rounded-xl items-center bg-background-80">
          <div className='flex items-center gap-2'>
          <TimerIconSmall />
          <p className='typography-body text-font-gray'>Time remaining</p>
          </div>
          <div className='mt-3 flex items-center gap-3'>
          <span className={(timeRemaining <= ONE_MINUTE && "bg-red-200 text-red-300 ") +" bg-background-70 typography-h3 flex items-center justify-center w-12 h-12 rounded-xl"}>
            {min}
          </span> : 
          <span className={(timeRemaining <= ONE_MINUTE && "bg-red-200 text-red-300 ") +" bg-background-70 typography-h3 flex items-center justify-center w-12 h-12 rounded-xl"}>
            {sec}
          </span>
          </div>
        </div>
      </div>
      <h2 className="typography-h3 text-font-gray p-4">Questions</h2>
      {questions.map((q, index) => (
        <div
          key={q._id}
          className={`typography-body py-2 pl-4 my-2 cursor-pointer rounded flex items-center justify-between ${currentQuestion === index
            ? 'text-font-accent'
            : answers[q._id]
              ? 'text-green-100'
              : (index < currentQuestion ) ? 
              'text-yellow-100'
              :'text-font-gray hover:bg-background-60'
            }`}
          onClick={() => onQuestionSelect(index)}
        >
          <span className="truncate flex items-center gap-2 flex-grow mr-2">
            {!answers[q._id] && ( index < currentQuestion ) && <WarningIcon/>}
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
      <div className='grid grid-cols-2 gap-4 items-center h-max' style={{
        gridAutoRows: "1fr", // Ensures all rows are consistent based on tallest item
      }}>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center bg-background-80  rounded-xl  h-full">
            <label className="flex items-center space-x-3 p-4 w-full">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option.text}
                checked={currentAnswer === option.text}
                onChange={() => onAnswer(question._id, option.text)}
                className="appearance-none border-2 rounded-full form-radio h-5 aspect-square max-h-5  max-w-5 checked:ring-offset-[5px] checked:ring-offset-black-100 checked:bg-teal-100 checked:ml-[4px] checked:mr-[4px] checked:ring-[2px] checked:w-3 checked:h-3 checked:border-0 checked:ring-teal-100"
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
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </Button>
      <div >
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
const WebcamView = ({ isMinimized, toggleMinimize, isRecording, webcamRef ,handleUserMedia}) => (
  <div className={`bg-gray-800 rounded-lg overflow-hidden ${isMinimized ? 'w-64' : 'w-96'}`}>
    <div className="flex justify-between items-center p-2 bg-gray-700">
      <div className='flex items-center gap-3 px-1' >
        <div className='bg-red-40 w-4 h-4 rounded-full border-2'></div>
        <h3 className="font-semibold">
          {isRecording ? 'Recording...' : 'Camera Off'}
        </h3>
      </div>
      <button onClick={toggleMinimize}>
        {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
    </div>
    {!isMinimized && (
      <div className="relative aspect-video">
        <Webcam
        muted
          ref={webcamRef}
          audio={true}
          mirrored={true}
          onUserMedia={handleUserMedia}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex space-x-2 w-full justify-center">
          <div className={`p-2 rounded-xl ${isRecording ? 'bg-red-500' : 'bg-gray-800'}`}>
            <Camera size={20} />
          </div>
          <div className={`p-2 rounded-xl ${isRecording ? 'bg-red-500' : 'bg-gray-800'}`}>
            <Mic size={20} />
          </div>
        </div>
      </div>
    )}
  </div>
);

// Upload Progress Overlay Component
const UploadProgressOverlay = ({ uploadProgress }) => (
  <div className="fixed inset-0 bg-[#000000a9] flex items-center justify-center z-50">
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
  const dispatch = useDispatch();
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
  const [isWebcamReady, setIsWebcamReady] = useState(false);

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
    if(webcamRef.current){
      startRecording();
    }
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isWebcamReady]);

  //Reload to turn off the recording permissions
  useEffect(()=>{
    return () => window.location.href = "/candidate/my-jobs"
  },[])

  const handleUserMedia = (stream) => {
    setIsWebcamReady(true);  // This state change will trigger the effect
  };

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
          // console.log('Recording chunk received:', event.data.size);
        }
      };

      mediaRecorder.onstop = async () => {
        // console.log('Recording stopped, creating blob...');
        const blob = new Blob(chunksRef.current, {
          type: 'video/webm'
        });
        // console.log('Blob created:', blob.size);
        setRecordedBlob(blob);
        chunksRef.current = [];
      };

      // Request data every second
      mediaRecorder.start(1000);
      setIsRecording(true);
      // console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      showErrorToast('Error', 'Failed to start recording. Please ensure camera access is granted.');
      setTimeout(()=>window.location.reload(),1000)
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        // Set up a one-time event listener for when recording stops
        mediaRecorderRef.current.onstop = async () => {
          // console.log('Recording stopped, creating blob...');
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


//   const startRecording = async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: false // Focus on video only
//         });

//         // Attach the stream to the video element for live preview
//         webcamRef.current.video.srcObject = stream;

//         // Create canvas for extracting frames
//         const videoElement = document.createElement('video');
//         videoElement.srcObject = stream;
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         // Array to store video frames as blobs
//         const videoChunks = [];

//         // Set up interval for extracting frames at 1 FPS
//         const extractFramesInterval = setInterval(() => {
//             // Ensure the canvas matches the video dimensions
//             if (!canvas.width || !canvas.height) {
//                 canvas.width = videoElement.videoWidth;
//                 canvas.height = videoElement.videoHeight;
//             }

//             // Draw the current video frame on the canvas
//             ctx.drawImage(videoElement, 0, 0);

//             // Convert the canvas content to a Blob and store it
//             canvas.toBlob((blob) => {
//               if (blob) {
//                   // Ensure each chunk is of type video/webm
//                   videoChunks.push(blob);
//                   console.log('Frame captured:', blob.size,blob.type);
//               }
//           }, 'video/webm');
          
//         }, 1000); // 1 FPS

//         setIsRecording(true);
//         console.log('Recording started');

//         const stopRecording = () => {
//           return new Promise((resolve) => {
//               clearInterval(extractFramesInterval); // Stop frame extraction
//               videoElement.srcObject = null;
      
//               // Create a final video Blob from captured frames
//               const finalBlob = new Blob(videoChunks, { type: 'video/webm' });
//               console.log('Recording stopped. Final blob size:', finalBlob.size , finalBlob.type);
      
//               setRecordedBlob(finalBlob);  // Update state with the final blob

//               // Resolve the promise with the final blob
//               resolve(finalBlob);
//           });
//       };

//         // Attach stopRecording to a reference for external control
//         mediaRecorderRef.current = { stop : stopRecording };
//     } catch (error) {
//         console.error('Error starting recording:', error);
//         showErrorToast('Error', 'Failed to start recording. Please ensure camera access is granted.');
//         // setTimeout(() => window.location.reload(), 1000);
//     }
// };



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
      const currentTime = Date.now();
      // Create a proper File object
      const videoFile = new File(
        [videoBlob],
        `assessment-recording-${currentTime}.webm`,
        {
          type: 'video/webm',
          lastModified: Date.now()
        }
      );

      // Log the file to verify it's created correctly
      // console.log('Video file created:', videoFile);

      const recordingUrl = await uploadAssessment(videoFile,setUploadProgress);

      // const formData = new FormData();
      // formData.append('video', videoFile);

      // // Log FormData contents
      // console.log('FormData entries:');
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      // const response = await axios.post('/admin/candidate/upload-recording', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total
      //     );
      //     setUploadProgress(progress);
      //   },
      // });

      // if (!response.data.videoUrl) {
      //   throw new Error('No video URL received from server');
      // }

      // return response.data.videoUrl;

      if (!recordingUrl) {
        throw new Error('No video URL received from server');
      }

      return recordingUrl;
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
        // const videoBlob = await mediaRecorderRef.current.stop();

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
    onSuccess:async (data) => {
      // Update Redux state
      dispatch(updateAssessmentStatus());

      // Refetch candidate data to ensure everything is in sync
      await dispatch(fetchCandidateAuthData()).unwrap();
      showSuccessToast('Success', 'Assessment submitted successfully');
      setTimeout(()=> window.location.href = "/candidate/my-jobs",1000)
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
  const handleFinish = async (isExceeded = false) => {
    if (!isAllAnswered && !isExceeded) {
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
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
      <div className=" flex min-h-screen bg-background-90 ">
        <QuestionSidebar
          questions={questions}
          currentQuestion={currentQuestion}
          onQuestionSelect={setCurrentQuestion}
          answers={answers}
          submitTest={handleFinish}
        />
        <div className="flex-grow flex flex-col container mx-auto ">
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
            <Draggable>
              <div className="p-4 fixed bottom-3 right-3">
                  <WebcamView
                    isMinimized={isWebcamMinimized}
                    toggleMinimize={() => setIsWebcamMinimized(prev => !prev)}
                    isRecording={isRecording}
                    webcamRef={webcamRef}
                    handleUserMedia={handleUserMedia}
                  />
              </div>
            </Draggable>
        </div>
      </div>
    </>
  );
};

export default Assessment;