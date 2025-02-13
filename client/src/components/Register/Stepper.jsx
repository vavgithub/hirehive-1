import React, { useEffect, useMemo, useState } from 'react'

function Stepper({padding,steps,currentStep,setCurrentStep}) {

    let valueSteps = {
        0 : "0",
        1 : "2",
        2 : "4",
        3 : "6",
        4 : "8"
      }

    let currentIndex = useMemo(()=>{
        let index = 0;
        steps.map((step,i)=>{
            if(step.id == currentStep){
                index = i;
            }
        })
        return index
    },[currentStep,steps])

  return (
        <div className={`p-${valueSteps[padding]}` + ' w-[80%] mx-auto'}>
            <div className='flex w-full justify-center items-center font-outfit relative'> 

            {
                steps?.map((stepObj,index,stepsArr)=>{
                    return (
                        <>
                        <div className='flex flex-col justify-center items-center gap-2 z-20 mx-4'>
                            <div onClick={()=>setCurrentStep(stepObj?.id)} className={'border-2  rounded-full aspect-square w-9 flex justify-center cursor-pointer items-center p-1 ' + (((currentStep === stepObj.id) || (index < currentIndex)) ? "border-teal-100 text-teal-100" : "border-font-gray text-font-gray")}>
                                <p>{index + 1}</p>
                            </div>
                            <p className={' typography-body whitespace-nowrap ' + (((currentStep === stepObj.id) || (index < currentIndex)) ? "text-teal-100" : "text-font-gray")}>{stepObj?.label}</p>
                        </div>
                        {/* Progress Bar */}
                        {(index < stepsArr.length - 1) && 
                        <div className='bg-divider-100 w-full h-1  z-10 '>
                            <div style={{
                                width : `${currentStep === stepObj.id ? 50 : index > currentIndex ? 0 : 100}%`
                            }} className='bg-teal-100 h-1  z-10'></div>
                        </div>}
                        </>
                    )
                })
            }
            </div>
        </div>
  )
}

export default Stepper
