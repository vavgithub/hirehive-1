import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { ChevronLeft, ChevronRight, Clock, ChevronUp, ChevronDown, Camera, Mic } from 'lucide-react';
import { Button } from '../../components/ui/Button';

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
    text: "Whaasdasdat is User Interface (UI) design?",
    options: [
      "The asdasdprocess of integrating social media elements into websites and apps.",
      "Thasdasdasde engineering and coding part of building a website or application.",
      "The psadadasdractice oasdasdasdf optimizing websites and apps for search engines.",
      "The adasdasdcrafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  {
    id: 3,
    text: "asdasd asd asWhat is User Interface (UI) design?",
    options: [
      "The process of in asd as a tegrating social media elements into websites and apps.",
      "Theasdasdasd engineering an asd ad coding part of building a website or application.",
      "The practice of optimizing websit asd a ad ad es and apps for search engines.",
      "The crafting of visual elements like colors, t asd asypography, layout to create an intuitive UI."
    ]
  },
  {
    id: 4,
    text: "dasdasd a a das a d aWhat is User Interface (UI) design?",
    options: [
      "sd saas aThe process of integrating social media elements into websites and apps.",
      "Ts adas he engineering and coding part of building a website or application.",
      "Tsda da she practice of optimizing websites and apps for search engines.",
      "T asasd asdsdhe crafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  {
    id: 5,
    text: "What is User Interface (UI) design?",
    options: [
      "The s ad asprocess of integrating social media elements into websites and apps.",
      "The sda  engineering and coding part of building a website or application.",
      "The  sad asadpractice of optimizing websites and apps for search engines.",
      "The c asd as rafting of visual elements like colors, typography, layout to create an intuitive UI."
    ]
  },
  // ... more questions ...
];

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;
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

const QuestionSidebar = ({ questions, currentQuestion, onQuestionSelect }) => {
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
    <div className="w-[200px] bg-background-30  overflow-y-auto flex-shrink-0">
      <div className="mb-6 p-4 rounded-xl">
        <div className="flex flex-col p-2 rounded-xl items-center bg-background-80">
          <p className='typography-body text-font-gray'>Time remaining</p>
          <span className="bg-background-70 typography-h3 p-2 rounded-xl">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      <h2 className="typography-h3 text-font-gray">Questions</h2>
      {questions.map((q, index) => (
        <div
          key={index}
          className={` typography-body py-2 pl-2 my-2  cursor-pointer rounded flex items-center justify-between ${currentQuestion === index
            ? 'text-font-accent'
            : 'hover:bg-gray-800'
            }`}
          onClick={() => onQuestionSelect(index)}
        >
          <span className="truncate flex-grow mr-2" title={q.text}>
            {q.text}
          </span>
          {currentQuestion === index && (
            <div className="w-2 h-6 ml-2 rounded-tl-xl rounded-bl-xl bg-teal-500 flex-shrink-0"></div>
          )}
        </div>
      ))}
    </div>
  );
};

const QuestionDisplay = ({ question, onAnswer, onPrevious, onNext, isFirst, isLast }) => (
  <div className="flex-grow p-8">
    <div className="mb-8">
      <h1 className="typography-h1 mb-4">{`Q${question.id} ${question.text}`}</h1>
      <div className='grid grid-cols-2 gap-x-4 items-center'>
        {question.options.map((option, index) => (
          <div key={index} className="mb-4 bg-background-80 p-4 rounded-xl">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => onAnswer(question.id, option)}
                className="form-radio h-5 w-5 text-red-600"
              />
              <span className='typography-body'>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-between">
      {/* <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`px-4 py-2 rounded ${isFirst ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
      >
        <ChevronLeft className="inline mr-2" /> Previous
      </button> */}

      <div
        className="w-[152px]"
      >

        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </Button>
      </div>



      <div
        className="w-[152px]"
      >

        <Button
          variant="primary"
          onClick={onNext}
          disabled={isLast}

        >
          Next
        </Button>
      </div>
      {/* <button
        onClick={onNext}
        disabled={isLast}
        className={`px-4 py-2 rounded ${isLast ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
      >
        Next <ChevronRight className="inline ml-2" />
      </button> */}
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
    <div className="flex h-screen bg-background-90">
      <QuestionSidebar
        questions={questions}
        currentQuestion={currentQuestion}
        onQuestionSelect={setCurrentQuestion}
      />
      <div className="flex-grow flex flex-col">
        <div className="bg-background-90 p-4 flex gap-8 justify-between items-center">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          <div className='typograhpy-body text-font-gray'>{`${currentQuestion + 1}/${questions.length} Questions`}</div>
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