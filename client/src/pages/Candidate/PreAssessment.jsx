import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp , Mic, TimerIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import Assessment from './Assessment'; // Import your existing Assessment component
import { Button } from '../../components/ui/Button';
import Camera from '../../svg/Buttons/Camera';
import Logo from '../../svg/Logo/lightLogo.svg'
import AssesmentIcon from '../../svg/AssesmentIcon';
import TimerClockIcon from '../../svg/TimerClockIcon';
import ProfileIcon from '../../svg/ProfileIcon';
import CameraDisabled from '../../svg/Buttons/CameraDisabled';
import MicDisabled from '../../svg/Buttons/MicDisabled';
import Modal from '../../components/Modal';

const AccordionItem = ({ title, content, isOpen, toggleOpen , preIcon}) => (
    <div className="mb-4 p-6  bg-background-80 rounded-xl overflow-hidden">
        <div className='flex items-center gap-3'>
            {preIcon}
            <button
                className="w-full  text-left typography-h3 flex justify-between items-center"
                onClick={toggleOpen}
            >
                {title}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
        </div>
        {isOpen && <div className="p-4 bg-background-80 text-font-gray typography-body">{content}</div>}
    </div>
);

const PreAssessment = () => {
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const [isTimeOpen, setIsTimeOpen] = useState(true);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [isMicEnabled, setIsMicEnabled] = useState(false);
    const [startAssessment, setStartAssessment] = useState(false);
    const [pingCamera,setPingCamera] = useState(false);
    const [pingMic,setPingMic] = useState(false);
    const [hasCameraError,setHasCameraError] = useState(false);
    const [hasAudioError,setHasAudioError] = useState(false);
    const [showMediaErrorModal,setShowMediaErrorModal] = useState(false);

    //Check the status of microphone access
    const checkAudioStatus = async ()=> {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasAudioError(false);
            return false
        } catch (error) {
            setHasAudioError(true);
            return true
        }
    }

    const toggleCamera = () => setIsCameraEnabled(!isCameraEnabled);
    const toggleMic = async () => {
        await checkAudioStatus()
        setIsMicEnabled(!isMicEnabled)
    };

    const handleStartAssessment = async () => {
        if(!isCameraEnabled && !isMicEnabled){
            setPingCamera(true);
            setTimeout(()=>setPingMic(true),100);
            setTimeout(()=>setPingMic(false),2100);
            setTimeout(()=>setPingCamera(false),2000);
            return
        }
        if(!isCameraEnabled){
            setPingCamera(true);
            setTimeout(()=>setPingCamera(false),2000);
            return
        }
        if(!isMicEnabled){
            setPingMic(true);
            setTimeout(()=>setPingMic(false),2000);
            return
        }
        let audioError = await checkAudioStatus();

        if(hasCameraError){
            setShowMediaErrorModal(true);
            return
        }
        if(audioError){
            setShowMediaErrorModal(true);
            return
        }

        setStartAssessment(true)
    }

    const handleCameraEnabled = ()=>{
        setHasCameraError(false);
    }

    const handleCameraError = (error) =>{
        setHasCameraError(true)
    }

    useEffect(()=>{
        //Redirecting to refresh the page, to turn of the Camera and Microphone Permissions
        return () => window.location.href = "/candidate/all-jobs"
    },[])

    if (startAssessment) {
        return <Assessment />;
    }

    return (
        <div className='bg-background-90'>
            <div className=" min-h-screen p-6 container mx-auto">
                <div className='flex  w-full mb-10 '>
                    <img className='h-12' src={Logo} />
                </div>
                <div>
                    <h1 className="typography-h1 mb-6">Value at Void design assessment</h1>
                    <h2 className="typography-h2 mb-4">Design Questionnaire</h2>
                    <p className="typography-body text-font-gray mb-8">
                        Complete this questionnaire to assess your knowledge and skills as a UI/UX designer
                    </p>

                    <div className="flex gap-4">
                        {/* Left Column */}
                        <div className="w-1/2">
                            <AccordionItem
                                title="Assessment Overview"
                                isOpen={isOverviewOpen}
                                toggleOpen={() => setIsOverviewOpen(!isOverviewOpen)}
                                preIcon={AssesmentIcon()}
                                content={
                                    <ul className="list-disc pl-12">
                                        <li className='pb-2'>This assessment consists of 10 questions.</li>        
                                        <li className='pb-2'>Each question is worth 10 mark.</li>
                                        <li className='pb-2'>You must attempt all 10 questions.</li>
                                        <li>Successfully completing this assessment is required to move to the next round.</li>
                                    </ul>
                                }
                            />

                            <AccordionItem
                                title="Estimated 5 Minutes"
                                isOpen={isTimeOpen}
                                toggleOpen={() => setIsTimeOpen(!isTimeOpen)}
                                preIcon={TimerClockIcon()}
                                content={
                                    <ul className="list-disc pl-12">
                                        <li className='pb-2'>The estimated time for this assessment is 5 minutes.</li>
                                        <li className='pb-2'>Please keep an eye on the timer.</li>
                                        <li>Ensure you manage your time effectively to complete all questions within the allocated time.</li>
                                    </ul>
                                }
                            />
                        </div>

                        {/* Right Column */}
                        <div className="w-1/2">
                            <div className="bg-background-80 flex flex-col rounded-xl pt-4 p-6">
                                <h3 className="typography-h3 mb-6">Check your webcam</h3>
                                <div className="relative aspect-video bg-black rounded-xl bg-background-80 flex overflow-hidden min-w-full">
                                    {isCameraEnabled ? (
                                        <div className='flex justify-center items-center' >
                                            <Webcam audio={false} onUserMedia={handleCameraEnabled} onUserMediaError={handleCameraError} />
                                        </div>
                                    ) : (
                                        <div className="absolute left-0 flex items-center justify-center h-full w-full bg-black-100 rounded-xl">
                                            <div className='p-6 rounded-full bg-background-80'>
                                                <ProfileIcon />
                                                {/* <Camera size={48} className="text-gray-600" /> */}
                                            </div>
                                        </div>
                                    )}
                                <div className="absolute bottom-4 w-full flex justify-center space-x-4 z-10 ">
                                    <button
                                        className={`p-3 h-fit rounded-xl bg-background-70  ${pingCamera && " animate-bounce-5 "} `}
                                        onClick={toggleCamera}
                                    >
                                        {
                                            isCameraEnabled ? <Camera/> : <CameraDisabled ping={pingCamera} />
                                        }
                                    
                                        {/* <Camera size={24} /> */}
                                    </button>
                                    <button
                                        className={`p-3 h-fit rounded-xl bg-background-70   ${pingMic && " animate-bounce-5 "} `}
                                        onClick={toggleMic}
                                        >
                                        {
                                          isMicEnabled  ?  <Mic/> :  <MicDisabled ping={pingMic} />
                                        }
                                    </button>
                                </div>
                                </div>
                            </div>
                                <p className='typography-large-p mt-4 p-4 rounded-xl bg-background-80'>
                                    <span className='bg-blue-200 h-2 w-2 rounded-full inline-block mr-4' ></span>
                                For the best experience, use the latest version of <strong>Google Chrome</strong> for recording.
                                </p>
                        </div>
                    </div>

                    {/* Camera Error Modal */}
                    <Modal 
                    actionType={(hasCameraError && hasAudioError )? "MEDIA ERROR" : hasAudioError ? "AUDIO ERROR" : "CAMERA ERROR"} 
                    onClose={()=>setShowMediaErrorModal(false)} 
                    open={showMediaErrorModal} 
                    cancelLabel='OK' cancelVariant='primary' />

                    <div className='mt-8 w-full flex justify-end'>                            
                            <Button
                                onClick={handleStartAssessment}
                            >
                                Start Assessment
                            </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreAssessment;