import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Modal from '../Modal';
import Datepicker from '../utility/Datepicker';
import Timepicker from '../utility/Timepicker';

function SchedulerButton({buttonText,buttonVariant,extraClasses,modalTitle,modalMessage,onConfirm,disabled}) {
    const [isOpen,setIsOpen] = useState(false);
    const [scheduleModal,setScheduleModal] = useState(false);
    const [scheduledDate,setScheduledDate] = useState(null);
    const [scheduledTime,setScheduledTime] = useState(null);

    const [scheduledDateError,setScheduledDateError] = useState(null);
    const [scheduledTimeError,setScheduledTimeError] = useState(null);

    const [isDisabled,setIsDisabled] = useState(true);

    //To detect if its a first render or not
    const isFirstRender = useRef(true);

    const validateErrors = ()=> {
        if(!scheduledDate){
            setScheduledDateError(true)
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
            setScheduledDateError(false)
        }
        if(!scheduledTime){
            setScheduledTimeError(true)
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
            setScheduledTimeError(false)
        }
    }

    useEffect(()=>{
        if(!isFirstRender.current){
            validateErrors()
        }
    },[scheduledDate,scheduledTime,isFirstRender]);

    const handleScheduledConfirm = () => {
        isFirstRender.current = false
        if(scheduledDate && scheduledTime){
            setScheduleModal(false)
            onConfirm(scheduledDate , scheduledTime)
        }else{
            validateErrors()
        }
    }

    const variants = {
        primary: "bg-blue-100 text-white typography-body hover:bg-blue-200",
        secondary: "bg-blue-300 text-blue-100 typography-body hover:bg-blue-400",
        tertiary: "text-blue-600 typography-body hover:bg-blue-100",
        cancel: "bg-red-500 text-white typography-body hover:bg-red-600",
        cancelSec: "bg-red-80 text-red-100 typography-body hover:bg-red-60",
        icon: "bg-blue-100",
        iconSec: "bg-blue-300 "
      };

    return (
    <>
    <button
    disabled={disabled}
    className={
         " h-11  relative w-fit  flex justify-center items-center gap-[1px] disabled:opacity-50 disabled:pointer-events-none" + extraClasses
    }
    type='button'
    >
        <span onClick={()=>onConfirm()} className={variants[buttonVariant] +' rounded-s-xl flex gap-2 h-full justify-center items-center pl-12 pr-6 font-normal'}>
        {buttonText}
        </span>
            <span onClick={(e)=>{e.stopPropagation(); setIsOpen(!isOpen)}} className={variants[buttonVariant] + ' rounded-e-xl flex h-full items-center pl-4 pr-4'}>
            {isOpen ? 
            <ChevronUp  />
            :
            <ChevronDown />}
            </span>
        {isOpen && 
        <span className='typography-body bg-background-40 rounded-xl p-2   absolute -top-16 right-0 '>
            <p onClick={()=>setScheduleModal(true)} className='hover:bg-background-60 w-full whitespace-nowrap py-2 px-8 rounded-xl hover:text-accent-100'>Scheduled Send</p>
        </span>}
    </button>
    <Modal
    open={scheduleModal}
    onConfirm={handleScheduledConfirm}
    isReadyToClose={!isDisabled}
    onClose={()=> setScheduleModal(false)}
    customTitle={modalTitle}
    customMessage={modalMessage}
    >
        <div className='flex gap-4 my-6'>
            <div className='flex flex-col gap-2'>
            <label htmlFor="" className='typography-body '>Select Date</label>
            <Datepicker error={scheduledDateError} onChange={setScheduledDate} value={scheduledDate} />
            {scheduledDateError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Date is required</p>}
            </div>
            <div className='flex flex-col gap-2 relative'> 
            <label htmlFor="" className='typography-body '>Select Time</label>
            <Timepicker error={scheduledTimeError} onChange={setScheduledTime} value={scheduledTime} />
            {scheduledTimeError && <p className='absolute text-red-100 typography-small-p top-[4.8rem]'>Time is required</p>}
            </div>
        </div>
    </Modal>
    </>
  )
}

export default SchedulerButton
