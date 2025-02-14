import React from 'react'
import { Button } from '../ui/Button'

function DetailsFooter({submissionError,isNextDisabled,hasNextButton,hasSkipButton,nextFunction,skipFunction,currentStep,setCurrentStep}) {
  return (
    <div className='bg-background-90 px-8 py-6 rounded-b-xl flex justify-end gap-4'>
        {hasSkipButton && 
            <Button type="button" variant="tertiary" onClick={skipFunction}>
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
    </div>
  )
}

export default DetailsFooter
