import React from 'react'
import { Button } from '../ui/Button'

function DetailsFooter({hasNextButton,hasSkipButton,nextFunction,skipFunction,currentStep,setCurrentStep}) {
  return (
    <div className='bg-background-90 px-8 py-6 flex justify-end gap-4'>
        {hasSkipButton && 
            <Button variant="tertiary" onClick={skipFunction}>
                Skip
            </Button>
        }
        {hasNextButton && 
            <Button variant="primary" onClick={nextFunction}>
                Next
            </Button>
        }
    </div>
  )
}

export default DetailsFooter
