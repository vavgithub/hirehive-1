import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { ChevronLeft, ChevronRight, Clock, ChevronUp, ChevronDown, Camera, Mic } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import axios from "../../api/axios"


export const useAssessmentQuestions = () => {
  const fetchQuestions = async () => {
    const response = await axios.get('/admin/candidate/questions/random');
    return response.data.questions;
  };

  return useQuery({
    queryKey: ['assessment-questions'],
    queryFn: fetchQuestions,
    staleTime: Infinity, // Keep the questions stable during the assessment
    cacheTime: 0, // Don't cache between sessions
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
    retry: false, // Don't retry on failure as we want to show error immediately
  });
};



const ProgressBar = ({ answeredCount, total }) => {
  const progress = (answeredCount / total) * 100;
  return (
    <div className="w-full bg-background-90 h-2 rounded-full overflow-hidden">
      <div
        className="bg-blue-100 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Update QuestionSidebar to show answered status
const QuestionSidebar = ({ questions, currentQuestion, onQuestionSelect, answers }) => {
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className="w-[200px] bg-background-30 fixed h-screen overflow-y-auto flex-shrink-0">
      {/* Timer section remains the same */}
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
          className={`typography-body py-2 pl-4 my-2 cursor-pointer rounded flex items-center justify-between ${currentQuestion === index
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

const QuestionDisplay = ({
  question,
  currentAnswer,
  questionNumber, // Add this prop
  onAnswer,
  onPrevious,
  onNext,
  onFinish,
  isFirst,
  isLast,
  isAllAnswered
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
          <Button
            variant="primary"
            onClick={onFinish}
            disabled={!isAllAnswered}
          >
            Finish
          </Button>
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

const WebcamView = ({ isMinimized, toggleMinimize }) => (
  <div className={`bg-gray-800 rounded-lg overflow-hidden ${isMinimized ? 'w-64' : 'w-96'}`}>
    <div className="flex justify-between items-center p-2 bg-gray-700">
      <h3 className="font-semibold">Check your webcam</h3>
      <button onClick={toggleMinimize}>
        {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
    </div>
    {!isMinimized && (
      <div className="relative aspect-video">
        <Webcam
          audio={false}
          mirrored={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button className="p-2 bg-gray-800 rounded-full">
            <Camera size={20} />
          </button>
          <button className="p-2 bg-gray-800 rounded-full">
            <Mic size={20} />
          </button>
        </div>
      </div>
    )}
  </div>
);

const Assessment = () => {
  const [startTime] = useState(Date.now()); // Add this at the beginning
  const {
    data: questions,
    isLoading,
    isError,
    error
  } = useAssessmentQuestions();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isWebcamMinimized, setIsWebcamMinimized] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);

  // Calculate number of answered questions
  const answeredCount = Object.keys(answers).length;

  // Check if all questions are answered
  const isAllAnswered = questions ? answeredCount === questions.length : false;

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };


  const candidateId =  "67247a0c31deb23b1fe8eb5d";

  const handleFinish = async () => {
    try {
      const totalTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      
      const response = await axios.post(`/admin/candidate/questionnaire/${candidateId}`, {
        answers,
        totalTimeInSeconds
      });

      if (response.data.success) {
        // Show success message or redirect
        console.log('Assessment submitted:', response.data);
        // Maybe redirect to a results page
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      // Show error message to user
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-90">
        <div className="typography-h2 text-font-gray">Loading questions...</div>
      </div>
    );
  }

  // Show error state
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

  // Show empty state
  if (!questions?.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-90">
        <div className="typography-h2 text-font-gray">No questions available</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background-90">
      <QuestionSidebar
        questions={questions}
        currentQuestion={currentQuestion}
        onQuestionSelect={setCurrentQuestion}
        answers={answers} // Pass answers to show which questions are answered
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
          questionNumber={currentQuestion} // Add this prop
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
          onFinish={handleFinish}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === questions.length - 1}
          isAllAnswered={isAllAnswered}
        />
        <div className="p-4 flex justify-end">
          <WebcamView
            isMinimized={isWebcamMinimized}
            toggleMinimize={() => setIsWebcamMinimized(prev => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default Assessment;