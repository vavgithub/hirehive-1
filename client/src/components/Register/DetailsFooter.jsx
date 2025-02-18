import React, { useState } from 'react'
import { Button } from '../ui/Button'
import Modal from '../Modal'

function DetailsFooter({skipType,skipTitle,skipMessage,submissionError,isNextDisabled,hasNextButton,hasSkipButton,nextFunction,skipFunction}) {
    const [showSkipModal,setShowSkipModal] = useState(false);
  return (
    <div className='bg-background-90 px-8 py-6 rounded-b-xl flex justify-end gap-4'>
        {hasSkipButton && 
            <Button type="button" variant="tertiary" onClick={()=> setShowSkipModal(true)}>
                Skip
            </Button>
        }
        {hasNextButton && 
            <div className='relative '>
            <Button disabled={isNextDisabled} type="button" variant="primary" onClick={nextFunction}>
                Next
            </Button>
            {submissionError && <span className='absolute left-0 -top-4 text-red-100 text-[10px] font-outfit whitespace-nowrap'>{submissionError}</span>}
            </div>
        }
        <Modal
        open={showSkipModal}
        customMessage={skipMessage}
        customTitle={skipTitle}
        onClose={()=>setShowSkipModal(false)}
        onConfirm={skipFunction}
        customConfirmLabel={"Skip"}
        specifiedWidth={"max-w-xl"}
        >
            {skipType === "ADD TEAM MEMBERS" && <p className='typography-body text-font-gray mt-2'>Are you sure you want to skip this step?</p>}
        </Modal>
    </div>
  )
}

export default DetailsFooter
