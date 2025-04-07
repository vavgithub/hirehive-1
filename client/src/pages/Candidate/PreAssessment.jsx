import React, { useEffect, useState } from 'react';
import { BookText, ChevronDown, ChevronUp , Timer, TimerIcon, Mic, MicOff, User, Video, VideoOff } from 'lucide-react';
import Webcam from 'react-webcam';
import Assessment from './Assessment'; // Import your existing Assessment component
import { Button } from '../../components/Buttons/Button';
import Logo from '../../svg/Logo/lightLogo.svg'
import StyledCard from '../../components/Cards/StyledCard';
import Modal from '../../components/Modals/Modal';
import { AccordionItem } from '../../components/Accordion/AccordionItem';
import ContactUs from '../../components/Form/ContactUs';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';

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

    const [isMediaRecorderOk,setIsMediaRecorderOk] = useState(true);

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
      //Checks if media recorder is supported
      if (!window.MediaRecorder) {
        setIsMediaRecorderOk(false)
      }
        //Redirecting to refresh the page, to turn of the Camera and Microphone Permissions
        return () => window.location.href = "/candidate/my-jobs"
    },[])

    if (startAssessment) {
        return <Assessment />;
    }

    return (
        // <div className='bg-background-90 p-4 min-h-screen '>
        //     <div className=" container ">
        <Container hasBgColor="bg-background-90">
                <div className='flex  w-full mt-2 mb-10 '>
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
                                preIcon={<IconWrapper isInActiveIcon size={4} hasBg="bg-background-30" icon={BookText} />}
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
                                preIcon={<IconWrapper isInActiveIcon size={4} hasBg="bg-background-30" icon={Timer} />}
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
                            <StyledCard backgroundColor={"bg-background-80"} extraStyles=" flex flex-col pt-4">
                                <h3 className="typography-h3 mb-6">Check your webcam</h3>
                                <div className="relative aspect-video bg-black rounded-xl bg-background-80 flex overflow-hidden min-w-full">
                                    {isCameraEnabled ? (
                                        <div className='flex justify-center items-center' >
                                            <Webcam audio={false} onUserMedia={handleCameraEnabled} onUserMediaError={handleCameraError} />
                                        </div>
                                    ) : (
                                        <div className="absolute left-0 flex items-center justify-center h-full w-full bg-black-100 rounded-xl">
                                            <div className='p-6 rounded-full bg-background-80'>
                                                <IconWrapper isInActiveIcon size={6}  icon={User} />
                                            </div>
                                        </div>
                                    )}
                                <div className="absolute bottom-4 w-full flex justify-center space-x-4 z-10 ">
                                    <button
                                        className={`p-3 h-fit rounded-xl bg-background-70  ${pingCamera && " animate-bounce-5 "} `}
                                        onClick={toggleCamera}
                                    >
                                        {
                                            isCameraEnabled ? <IconWrapper size={0} customIconSize={5} customStrokeWidth={6}  icon={Video} /> : pingCamera ? <IconWrapper size={0} isErrorIcon customIconSize={5} customStrokeWidth={6}  icon={VideoOff} /> : <IconWrapper size={0} customIconSize={5} customStrokeWidth={6}  icon={VideoOff} />
                                        }
                                    
                                    </button>
                                    <button
                                        className={`p-3 h-fit rounded-xl bg-background-70   ${pingMic && " animate-bounce-5 "} `}
                                        onClick={toggleMic}
                                        >
                                        {
                                          isMicEnabled  ?  <IconWrapper size={0} customIconSize={5} customStrokeWidth={6}  icon={Mic} /> : pingMic ? <IconWrapper size={0} isErrorIcon customIconSize={5} customStrokeWidth={6}  icon={MicOff} /> : <IconWrapper size={0} customIconSize={5} customStrokeWidth={6}  icon={MicOff} />
                                        }
                                    </button>
                                </div>
                                </div>
                            </StyledCard>
                                <p className='typography-large-p mt-4 p-4 rounded-xl bg-background-80'>
                                    <span className='bg-blue-200 h-2 w-2 rounded-full inline-block mr-4' ></span>
                                For the best experience, use the latest version of <strong>Google Chrome</strong> for recording.
                                </p>
                                {!isMediaRecorderOk && 
                                <p className='typography-large-p mt-4 p-4 rounded-xl bg-background-80'>
                                    <span className='bg-red-40 h-2 w-2 rounded-full inline-block mr-4' ></span>
                                    Your system does not support recording. Try with alternative browsers.
                                </p>}
                        </div>
                    </div>

                    {/* Camera Error Modal */}
                    <Modal 
                    actionType={(hasCameraError && hasAudioError )? "MEDIA ERROR" : hasAudioError ? "AUDIO ERROR" : "CAMERA ERROR"} 
                    onClose={()=>setShowMediaErrorModal(false)} 
                    open={showMediaErrorModal} 
                    cancelLabel='OK' cancelVariant='primary' />

                    <div className='mt-8 mb-4 w-full flex justify-end'>                            
                            <Button
                                onClick={handleStartAssessment}
                                disabled={!isMediaRecorderOk}
                            >
                                Start Assessment
                            </Button>
                    </div>
                </div>
                <ContactUs/>
            </Container>
    );
};

export default PreAssessment;