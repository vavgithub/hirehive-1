import React, { useState } from 'react';
import Header from '../../components/utility/Header';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { Phone, Mail, Circle, X, Info, Check } from 'lucide-react';
import { Button } from '../../components/Buttons/Button';
import { showErrorToast } from '../../components/ui/Toast';
import Loader from '../../components/Loaders/Loader';
import StyledCard from '../../components/Cards/StyledCard';
import CustomToolTip from '../../components/Tooltip/CustomToolTip';
import { VideoModal } from '../../components/Modals/VideoModal';
import Container from '../../components/Cards/Container';
import { UNKNOWN_PROFILE_PICTURE_URL } from '../../utility/config';
import IconWrapper from '../../components/Cards/IconWrapper';
import { UTCToDateFormatted } from '../../utility/timezoneConverter';
import { formatPhoneNumber } from '../../components/Form/PhoneInputField';

// Fetch function
const fetchAssessmentDetails = async (candidateId, jobId) => {
    const { data } = await axios.get(`admin/candidate/get-assessment/${candidateId}/${jobId}`);
    return data;
};

const AssessmentResponse = () => {

    // Add state for modal
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const { id: candidateId, jobId } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['assessmentDetails', candidateId, jobId],
        queryFn: () => fetchAssessmentDetails(candidateId, jobId),
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
        <Container>
            <div >
                <Header withBack={"true"} HeaderText="Assessment details" />

                {/* Top Section with Candidate Info and Score */}
                <div className="flex gap-4 mb-6">
                    {/* Candidate Info Card */}
                    <StyledCard padding={2} extraStyles="flex-grow">
                        <div className="flex gap-4 h-full">
                            <div className="to-background-100 min-w-[20%] max-w-[12.5rem] aspect-square max-h-[12.5rem]  rounded-xl overflow-hidden">
                                <img
                                    src={assessmentData?.candidateInfo?.profilePictureUrl || UNKNOWN_PROFILE_PICTURE_URL}
                                    alt={assessmentData?.candidateInfo?.name}
                                    className="w-full  object-cover "
                                />
                            </div>

                            <div className="flex flex-col justify-between w-full">
                                <h2 className="typography-h2">
                                    {assessmentData?.candidateInfo?.name}
                                </h2>


                                <div className="flex items-center gap-2 my-2">
                                    <span className="text-white text-xl font-semibold">{assessmentData?.assessment?.title}</span>
                                    <Circle className="w-1 h-1 text-font-gray" />
                                </div>



                                <div className="flex mb-3 gap-5">
                                    <div className="flex items-center gap-2">
                                        <IconWrapper size={0} customIconSize={1} icon={Phone} />
                                        <span className="text-font-gray typography-large-p">{formatPhoneNumber(assessmentData?.candidateInfo?.phone)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconWrapper size={0} customIconSize={1} icon={Mail} />
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
                                                {UTCToDateFormatted(assessmentData?.candidateInfo?.attemptDate)}
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

                    <StyledCard padding={3} extraStyles="flex bg-stars flex-col items-center w-[35%] max-w-[15rem] bg-cover ">
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
                                            response.isCorrect ?
                                                <div className='bg-green-100 rounded-sm  text-black-100'><IconWrapper inheritColor icon={Check} size={0} customStrokeWidth={11} customIconSize={1} /></div>
                                                : <div className='bg-red-100 rounded-sm  text-black-100'><IconWrapper inheritColor icon={X} size={0} customStrokeWidth={11} customIconSize={1} /></div>
                                        }
                                    </div>
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </StyledCard>}

                <h2 className='typography-h2'>Questions</h2>
                <StyledCard padding={0} backgroundColor={"bg-background-90"} >
                    {/* Questions List */}
                    {assessmentData?.questionResponses?.length > 0 ? <div className="space-y-4 bg-background-80">
                        {assessmentData?.questionResponses.map((response, index) => (
                            <StyledCard padding={2} backgroundColor={"bg-background-90"} key={response.questionId}>

                                <div >
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
                                </div>
                            </StyledCard>
                        ))}
                    </div>
                        :
                        <div className='px-6 pb-6 '>
                            <p className='typography-body'>No questions are answered by the candidate.</p></div>}
                </StyledCard>
            </div>

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoUrl={assessmentData?.candidateInfo?.recordingUrl}
            />
        </Container>
    );
};

export default AssessmentResponse;