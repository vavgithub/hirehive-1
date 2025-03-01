import React, { useState } from 'react';
import Header from '../../components/utility/Header';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { Phone, Mail, Circle, X, Info } from 'lucide-react';
import PhoneIcon from '../../svg/PhoneIcon';
import EmailIcon from '../../svg/EmailIcon';
import { Button } from '../../components/ui/Button';
import { showErrorToast } from '../../components/ui/Toast';
import Loader from '../../components/ui/Loader';
import CustomToolTip from '../../components/utility/CustomToolTip';
import StyledCard from '../../components/ui/StyledCard';


// Create a VideoModal component
const VideoModal = ({ isOpen, onClose, videoUrl }) => {
    const [isLoading, setIsLoading] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Blurred backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
                onClick={onClose} // Close modal when clicking backdrop
            />

            {/* Modal content */}
            <StyledCard extraStyles="relative w-[80%] max-w-4xl z-10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-0 -right-0 p-2 bg-background-90 hover:bg-background-80 rounded-full transition-colors z-20"
                >
                    <X className="w-6 h-6 text-font-gray" />
                </button>

                {/* Video title */}
                <h2 className="typography-h2 mb-4">Assessment Recording</h2>

                {/* Video container with loader */}
                <div className="relative aspect-video w-full bg-background-80 rounded-lg overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader />
                        </div>
                    )}

                    <video
                        src={videoUrl}
                        controls
                        className="w-full h-full rounded-lg"
                        onLoadedData={() => setIsLoading(false)}
                        onError={(e) => {
                            // console.error('Video loading error:', e);
                            setIsLoading(false);
                        }}
                    >
                        Your browser does not support the video element.
                    </video>
                </div>
            </StyledCard>
        </div>
    );
};



const Wronganswer = () => {
    return (

        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.4 14L9 10.4L12.6 14L14 12.6L10.4 9L14 5.4L12.6 4L9 7.6L5.4 4L4 5.4L7.6 9L4 12.6L5.4 14ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2Z" fill="#CB0000" />
        </svg>

    )
}

const Correctanswer = () => {
    return (

        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6 13.2L14.65 6.15L13.25 4.75L7.6 10.4L4.75 7.55L3.35 8.95L7.6 13.2ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2Z" fill="#04CB00" />
        </svg>

    )
}

// Fetch function
const fetchAssessmentDetails = async (candidateId) => {
    const { data } = await axios.get(`admin/candidate/assessment/${candidateId}`);
    return data;
};

const AssessmentResponse = () => {

    // Add state for modal
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const { id: candidateId } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['assessmentDetails', candidateId],
        queryFn: () => fetchAssessmentDetails(candidateId),
    });

    if (isLoading) {
        return (
            <div className='flex justify-center items-center w-full min-h-screen'>
                <Loader />
            </div>)
    }

    if (isError) {
        return (
            <div className="p-7 flex justify-center items-center">
                <div className="typography-h3 text-red-500">Error loading assessment details</div>
            </div>
        );
    }

    const assessmentData = data?.data;

    // Update the button click handler
    const handleOpenRecording = () => {
        if (assessmentData?.candidateInfo?.recordingUrl) {
            setIsVideoModalOpen(true);
        } else {
            // Handle case when no recording is available
            showErrorToast('No recording available for this assessment');
        }
    };


    return (
        <div className='w-full p-4'>
            <div className="container ">
            <div >
                <Header withBack={"true"} HeaderText="Assessment details" />

                {/* Top Section with Candidate Info and Score */}
                <div className="flex gap-4 mb-6">
                    {/* Candidate Info Card */}
                    <StyledCard padding={2} extraStyles="flex-grow">
                        <div className="flex gap-4 h-full">
                            <div className="to-background-100 min-w-[200px max-w-[200px] max-h-[200px]  rounded-xl overflow-hidden">
                                <img
                                    src={assessmentData?.candidateInfo?.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"}
                                    alt={assessmentData?.candidateInfo?.name}
                                    className="w-full  object-cover "
                                />
                            </div>

                            <div className="flex flex-col justify-between w-full">
                                <h2 className="typography-h2">
                                    {assessmentData?.candidateInfo?.name}
                                </h2>


                                <div className="flex items-center gap-2 my-2">
                                    <span className="text-white text-xl font-semibold">UX Design Level 1: Figma Skill</span>
                                    <Circle className="w-1 h-1 text-font-gray" />
                                </div>



                                <div className="flex mb-3 gap-5">
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon />
                                        <span className="text-font-gray typography-large-p">{assessmentData?.candidateInfo?.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EmailIcon />
                                        <span className="text-font-gray typography-large-p">{assessmentData?.candidateInfo?.email}</span>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='grid grid-cols-3 gap-x-6'>
                                        <div>
                                            <p className='typography-small-p text-font-gray'>
                                                Correct Answered
                                            </p>
                                            <p className='typography-large-p'>
                                                {assessmentData?.assessmentStats?.correctAnswers} /
                                                {assessmentData?.assessmentStats?.totalQuestions}

                                            </p>
                                        </div>

                                        <div>
                                            <p className='typography-small-p text-font-gray'>
                                                Finished on
                                            </p>
                                            <p className='typography-large-p'>
                                                {new Date(assessmentData?.candidateInfo?.attemptDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='typography-small-p text-font-gray'>
                                                Time taken
                                            </p>
                                            <p className='typography-large-p'>
                                                {assessmentData?.candidateInfo?.totalTimeSpent}
                                            </p>
                                        </div>

                                        <div>

                                        </div>


                                    </div>
                                    <Button onClick={handleOpenRecording}>Assesment Recording</Button>
                                </div>

                            </div>
                        </div>
                    </StyledCard>

                    <StyledCard padding={3} extraStyles="flex bg-stars flex-col items-center  w-[240px] bg-cover ">
                        <div className="relative typography-h3  w-full flex justify-center ">
                           <div className='absolute left-0'>

                            <CustomToolTip title={'A Correct Answer Equals Ten Score'} arrowed size={2}>
                                <Info className="w-4 h-4 text-font-gray" />
                            </CustomToolTip>
                           </div>
                            <h3 className="typography-h3" >SCORE</h3>
                        </div>
                        <div>

                            <span className="marks text-font-primary">{assessmentData?.assessmentStats?.scoreOutOf100}</span>
                        </div>

                        <p className="typography-large-p">Out of 100</p>
                    </StyledCard>

                    {/* Score Card */}
                    {/* <div className="bg-background-90 rounded-xl p-6 w-80 flex flex-col items-center justify-center">
                        <h3 className="typography-h3 mb-2">Score</h3>
                        <div className="relative w-32 h-32">
                            <div className="w-full h-full rounded-full border-8 border-blue-500 flex items-center justify-center">
                                <span className="typography-h1 text-font-primary">
                                    {assessmentData?.assessmentStats?.scoreOutOf100}
                                </span>
                            </div>
                        </div>
                        <p className="mt-2 text-font-gray">Out of 100</p>
                    </div> */}
                </div>

                {/* Question Progress Indicators */}
                {assessmentData?.questionResponses?.length > 0 && 
                <StyledCard padding={2} extraStyles=" mb-6">
                    <div className="grid grid-cols-10 justify-between gap-4">
                        {assessmentData?.questionResponses.map((response, index) => (
                            <div
                                key={response.questionId}
                                className={`p-8 typography-h3 relative  h-8 rounded-md flex bg-background-80 items-center justify-center ${response.isCorrect ? 'bg-background-80' : 'bg-background-80'
                                    } text-white`}
                            >
                                <div className={`absolute right-1 top-1 w-4 h-4  flex bg-background-80 items-center justify-center text-white`}>
                                    {
                                        response.isCorrect ? <Correctanswer /> : <Wronganswer />
                                    }
                                </div>
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </StyledCard>}

                <StyledCard padding={0}>
                    <h2 className='typography-h2 px-4 py-3 '>Question</h2>
                    {/* Questions List */}
                    {assessmentData?.questionResponses?.length > 0 ? <div className="space-y-4 bg-background-80">
                        {assessmentData?.questionResponses.map((response, index) => (
                            <div key={response.questionId} className=" rounded-xl p-4">
                                <h3 className="typography-h3 mb-4">
                                    Q{index + 1}. {response.questionDetails.text}
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    {response.questionDetails.options.map((option, optIndex) => (
                                        <div
                                            key={optIndex}
                                            className={`p-4 rounded-lg typography-body bg-background-60 ${response.selectedAnswer === option.text
                                                ? option.isCorrect
                                                    ? 'border border-green-70 '
                                                    : 'border border-red-40'
                                                : option.isCorrect
                                                    ? 'border border-green-70 '
                                                    : ' border-gray-200'
                                                }`}
                                        >
                                            {option.text}
                                        </div>
                                    ))}
                                </div>

                                {/* <div className="mt-4 text-font-gray">
                                    Points: {response.isCorrect ? "1" : "0"}/1
                                </div> */}
                            </div>
                        ))}
                    </div>
                    : 
                    <div className='px-6 pb-6 '>
                        <p className='font-outfit'>No questions are answered by the candidate.</p></div>}
                </StyledCard>
            </div>

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoUrl={assessmentData?.candidateInfo?.recordingUrl}
            />
        </div>
        </div>
    );
};

export default AssessmentResponse;