import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { ChevronLeft, ChevronRight, Clock, ChevronUp, ChevronDown, Camera, Mic } from 'lucide-react';

const staticQuestions = [
  {
    id: 1,
    text: "What is User Interface (UI) design?",
    options: [
      "The process of integrating social media elements into websites and apps.",
      "The engineering and coding part of building a website or application.",
      "The practice of optimizing websites and apps for search engines.",
      "The crafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  {
    id: 2,
    text: "What is User Interface (UI) design?",
    options: [
      "The process of integrating social media elements into websites and apps.",
      "The engineering and coding part of building a website or application.",
      "The practice of optimizing websites and apps for search engines.",
      "The crafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  {
    id: 3,
    text: "What is User Interface (UI) design?",
    options: [
      "The process of integrating social media elements into websites and apps.",
      "The engineering and coding part of building a website or application.",
      "The practice of optimizing websites and apps for search engines.",
      "The crafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  {
    id: 4,
    text: "What is User Interface (UI) design?",
    options: [
      "The process of integrating social media elements into websites and apps.",
      "The engineering and coding part of building a website or application.",
      "The practice of optimizing websites and apps for search engines.",
      "The crafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  {
    id: 5,
    text: "What is User Interface (UI) design?",
    options: [
      "The process of integrating social media elements into websites and apps.",
      "The engineering and coding part of building a website or application.",
      "The practice of optimizing websites and apps for search engines.",
      "The crafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  // ... more questions ...
];

const QuestionSidebar = ({ questions, currentQuestion, onQuestionSelect }) => (
  <div className="w-1/4 bg-gray-900 p-4 overflow-y-auto">
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Time remaining</h2>
      <div className="text-3xl font-mono">
        <span id="minutes">29</span>:<span id="seconds">30</span>
      </div>
    </div>
    <h2 className="text-xl font-bold mb-4">Questions</h2>
    {questions.map((q, index) => (
      <div
        key={index}
        className={`py-2 px-4 mb-2 cursor-pointer rounded ${
          currentQuestion === index
            ? 'bg-blue-600 text-white'
            : 'hover:bg-gray-800'
        }`}
        onClick={() => onQuestionSelect(index)}
      >
        {q.text}
        {currentQuestion === index && (
          <div className="w-2 h-6 bg-green-400 float-right mt-1"></div>
        )}
      </div>
    ))}
  </div>
);

const QuestionDisplay = ({ question, onAnswer, onPrevious, onNext, isFirst, isLast }) => (
  <div className="flex-grow p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{`Q${question.id} ${question.text}`}</h2>
      {question.options.map((option, index) => (
        <div key={index} className="mb-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              onChange={() => onAnswer(question.id, option)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span>{option}</span>
          </label>
        </div>
      ))}
    </div>
    <div className="flex justify-between">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`px-4 py-2 rounded ${
          isFirst ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <ChevronLeft className="inline mr-2" /> Previous
      </button>
      <button
        onClick={onNext}
        disabled={isLast}
        className={`px-4 py-2 rounded ${
          isLast ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Next <ChevronRight className="inline ml-2" />
      </button>
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

const Assessment = ({ questions: propQuestions, mode = 'multiple-choice' }) => {
  // Use propQuestions if provided, otherwise use staticQuestions
  const questions = propQuestions && propQuestions.length > 0 ? propQuestions : staticQuestions;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isWebcamMinimized, setIsWebcamMinimized] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const toggleWebcamMinimize = () => {
    setIsWebcamMinimized(!isWebcamMinimized);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <QuestionSidebar
        questions={questions}
        currentQuestion={currentQuestion}
        onQuestionSelect={setCurrentQuestion}
      />
      <div className="flex-grow flex flex-col">
        <div className="bg-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span className="font-mono text-xl">{formatTime(timeRemaining)}</span>
          </div>
          <div>{`${currentQuestion + 1}/${questions.length} Questions`}</div>
        </div>
        <QuestionDisplay             
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === questions.length - 1}
        />
        <div className="p-4 flex justify-end">
          <WebcamView isMinimized={isWebcamMinimized} toggleMinimize={toggleWebcamMinimize} />
        </div>
      </div>
    </div>
  );
};

export default Assessment;