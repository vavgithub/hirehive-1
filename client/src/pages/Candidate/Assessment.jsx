import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { ChevronDown, ChevronUp, Mic, Camera } from 'lucide-react';

const Assessment = () => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const webcamRef = useRef(null);

  const toggleOverview = () => setIsOverviewOpen(!isOverviewOpen);
  const toggleTime = () => setIsTimeOpen(!isTimeOpen);

  const handleCameraToggle = useCallback(() => {
    setIsCameraEnabled(!isCameraEnabled);
  }, [isCameraEnabled]);

  const handleMicToggle = () => setIsMicEnabled(!isMicEnabled);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Value at Void design assessment</h1>
      <h2 className="text-xl mb-4">Design Questionnaire</h2>
      <p className="text-gray-400 mb-8">Complete this questionnaire to assess your knowledge and skills as a UI/UX designer.</p>

      <div className="flex gap-8">
        {/* Left Column */}
        <div className="w-1/2">
          <div className="bg-gray-800 rounded-lg mb-4">
            <button 
              className="w-full flex justify-between items-center p-4"
              onClick={toggleOverview}
            >
              <span className="font-semibold">Assessment Overview</span>
              {isOverviewOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOverviewOpen && (
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>This assessment consists of 30 questions.</li>
                  <li>20 Multiple Choice Questions (MCQs)</li>
                  <li>10 Open-ended questions</li>
                  <li>Each question is worth 1 mark.</li>
                  <li>You must attempt all 30 questions.</li>
                  <li>Successfully completing this assessment is required to move to the next round.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg">
            <button 
              className="w-full flex justify-between items-center p-4"
              onClick={toggleTime}
            >
              <span className="font-semibold">Estimated 30 Minutes</span>
              {isTimeOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isTimeOpen && (
              <div className="p-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>The estimated time for this assessment is 30 minutes.</li>
                  <li>Please keep an eye on the timer.</li>
                  <li>Ensure you manage your time effectively to complete all questions within the allocated time.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Check your webcam</h3>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              {isCameraEnabled && (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {!isCameraEnabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={48} className="text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className={`p-2 rounded-full ${isCameraEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                onClick={handleCameraToggle}
              >
                <Camera size={24} />
              </button>
              <button
                className={`p-2 rounded-full ${isMicEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                onClick={handleMicToggle}
              >
                <Mic size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className={`px-6 py-2 rounded-lg ${
            isCameraEnabled && isMicEnabled
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
          disabled={!isCameraEnabled || !isMicEnabled}
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
};

export default Assessment;