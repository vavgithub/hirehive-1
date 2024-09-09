import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Camera, Mic } from 'lucide-react';
import Webcam from 'react-webcam';
import Assessment from './Assessment'; // Import your existing Assessment component
import { Button } from '../../components/ui/Button';

const AccordionItem = ({ title, content, isOpen, toggleOpen }) => (
    <div className="mb-4 bg-background-80 rounded-xl overflow-hidden">
        <button
            className="w-full p-4 text-left typography-h3 flex justify-between items-center"
            onClick={toggleOpen}
        >
            {title}
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {isOpen && <div className="p-4 bg-background-80 text-font-gray typography-body">{content}</div>}
    </div>
);

const PreAssessment = () => {
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [isMicEnabled, setIsMicEnabled] = useState(false);
    const [startAssessment, setStartAssessment] = useState(false);

    const toggleCamera = () => setIsCameraEnabled(!isCameraEnabled);
    const toggleMic = () => setIsMicEnabled(!isMicEnabled);

    if (startAssessment) {
        return <Assessment />;
    }

    return (
        <div className="bg-background-90 min-h-screen p-8">
            <h1 className="typography-h1 mb-6">Value at Void design assessment</h1>
            <h2 className="typography-h2 mb-4">Design Questionnaire</h2>
            <p className="typography-body text-font-gray mb-8">
                Complete this questionnaire to assess your knowledge and skills as a UI/UX designer
            </p>

            <div className="flex gap-8">
                {/* Left Column */}
                <div className="w-1/2">
                    <AccordionItem
                        title="Assessment Overview"
                        isOpen={isOverviewOpen}
                        toggleOpen={() => setIsOverviewOpen(!isOverviewOpen)}
                        content={
                            <ul className="list-disc pl-5">
                                <li>This assessment consists of 30 questions.</li>
                                <li>20 Multiple Choice Questions (MCQs)</li>
                                <li>10 Open-ended questions</li>
                                <li>Each question is worth 1 mark.</li>
                                <li>You must attempt all 30 questions.</li>
                                <li>Successfully completing this assessment is required to move to the next round.</li>
                            </ul>
                        }
                    />

                    <AccordionItem
                        title="Estimated 30 Minutes"
                        isOpen={isTimeOpen}
                        toggleOpen={() => setIsTimeOpen(!isTimeOpen)}
                        content={
                            <ul className="list-disc pl-5">
                                <li>The estimated time for this assessment is 30 minutes.</li>
                                <li>Please keep an eye on the timer.</li>
                                <li>Ensure you manage your time effectively to complete all questions within the allocated time.</li>
                            </ul>
                        }
                    />
                </div>

                {/* Right Column */}
                <div className="w-1/2">
                    <div className="bg-background-80 rounded-lg p-4">
                        <h3 className="typography-h3 mb-4">Check your webcam</h3>
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                            {isCameraEnabled ? (
                                <Webcam audio={false} />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Camera size={48} className="text-gray-600" />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                className={`p-2 rounded-full ${isCameraEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                                onClick={toggleCamera}
                            >
                                <Camera size={24} />
                            </button>
                            <button
                                className={`p-2 rounded-full ${isMicEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                                onClick={toggleMic}
                            >
                                <Mic size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex w-[270px]">
                {/* <button
                    className={`px-6 py-2 rounded-lg ${isCameraEnabled && isMicEnabled
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-600 cursor-not-allowed'
                        }`}
                    disabled={!isCameraEnabled || !isMicEnabled}
                    onClick={() => setStartAssessment(true)}
                >
                    Start Assessment
                </button> */}
                <Button
                    disabled={!isCameraEnabled || !isMicEnabled}
                    onClick={() => setStartAssessment(true)}
                >
                    Start Assessment
                </Button>
            </div>
        </div>
    );
};

export default PreAssessment;