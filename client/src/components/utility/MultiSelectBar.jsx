import React, { useEffect, useState } from 'react'
import ArrowIcon from '../../svg/ArrowIcon'
import { RedCloseButton } from '../../svg/CloseButton'
import { WhiteProfileIcon } from '../../svg/ProfileIcon'
import StageIcon from '../../svg/StageIcon'
import StatusIcon from '../../svg/StatusIcon'
import { Rating } from '../../svg/Buttons/Rating'
import { WhiteCalenderIcon } from '../../svg/Staging/CalenderIcon'
import BellIcon from '../../svg/BellIcon'
import ThreeDotsHorizontal from '../../svg/ThreeDotsHorizontal'
import Modal from '../Modal'

const moveMultiplesCandidates = async () => {

} 

const multiSelectConfig = [
    {
        name : "MOVE",
        label : "Move to next round",
        customTitle : "Move to next round",
        customMessage : "All selected candidates will be moved to the following round. Are you sure you want to proceed?",
        icon : ArrowIcon,
        apiFunction : moveMultiplesCandidates, 
        validStatus : ["Reviewed"],
        extraStyles : ""
    },
    {
        name : "REJECT",
        label : "Reject",
        customTitle : "Reject",
        customMessage : "",
        icon : RedCloseButton,
        validStatus : ["Reviewed"],
        extraStyles : "text-red-500"
    },
    {
        name : "ASSIGNEE",
        label : "Assignee",
        customTitle : "Assignee",
        customMessage : "",
        icon : WhiteProfileIcon,
        validStatus : [],
        extraStyles : ""
    },
    {
        name : "STAGE",
        label : "Stage",
        customTitle : "Stage",
        customMessage : "",
        icon : StageIcon,
        validStatus : [],
        extraStyles : ""
    },
    {
        name : "STATUS",
        label : "Status",
        customTitle : "Status",
        customMessage : "",
        icon : StatusIcon,
        validStatus : [],
        extraStyles : ""
    },
    {
        name : "RATING",
        label : "Rating",
        customTitle : "Rating",
        customMessage : "",
        icon : Rating,
        validStatus : [],
        extraStyles : ""
    },
    {
        name : "RESCHEDULE",
        label : "Reschedule",
        customTitle : "Reschedule",
        customMessage : "",
        icon : WhiteCalenderIcon,
        validStatus : [],
        extraStyles : ""
    },
    {
        name : "REMIND CANDIDATE",
        label : "Remind Candidate",
        customTitle : "Remind Candidate",
        customMessage : "",
        icon : BellIcon,
        validStatus : [],
        extraStyles : ""
    },
]

function MultiSelectBar({selectedData,jobId}) {
  const [filteredCandidates,setFilteredCandidates] = useState([]);
  const [trimCount,setTrimCount] = useState(6);
  const [openPalette,setOpenPalette] = useState(false);
  const [action,setAction] = useState(null);
  const [multiSelectConfigState,setMultiSelectConfigState] = useState(multiSelectConfig);

  useEffect(()=>{
    if(selectedData && Array.isArray(selectedData)){
        let filteredCandidatesObj = {};
        selectedData?.map(candidate => {
            if(filteredCandidatesObj[candidate.currentStage]){
                filteredCandidatesObj[candidate.currentStage].push({candidate,checked:true})
            }else{
                filteredCandidatesObj[candidate.currentStage] = [{candidate,checked:true}]
            }
        })
        setFilteredCandidates(filteredCandidatesObj)
        
        //Status based actions
        let currentStatuses = new Set();
        selectedData.forEach(selectedCandidate=>{
            currentStatuses.add(selectedCandidate.stageStatuses[selectedCandidate.currentStage].status)
        })
        console.log(currentStatuses)
    }
  },[selectedData])

  const toggleSelect = (status,candidateId,stage) => {
    setFilteredCandidates(prevCandidates => {
        let prevCandidatesArray = Object.entries(prevCandidates);
        const updatedCandidates = prevCandidatesArray.map(([currentStage,currentCandidates])=>{
            if(currentStage === stage){
                const updatedByStage = currentCandidates.map((eachCandidate)=>{
                    if(eachCandidate?.candidate?._id === candidateId){
                        return {
                            candidate : eachCandidate.candidate,
                            checked : status
                        }
                    }else{
                        return eachCandidate
                    }
                })
                return [currentStage,updatedByStage]
            }else{
                return [currentStage,currentCandidates]
            }
        })
        return Object.fromEntries(updatedCandidates)
    })
  }

  const handleConfirm = (confirmFunction) =>{
    console.log(filteredCandidates)
  }

  return (
    <div className='bg-black-100 font-outfit p-4 rounded-xl mb-4 flex justify-between items-center h-14'>
        <div>
            <p className='text-teal-100 typography-body'>{selectedData?.length ?? 0} Items Selected</p>
        </div>
        <div className='flex justify-between items-center gap-4 '>
            {
                multiSelectConfigState.map((config,i)=>{
                    return (
                        i < trimCount ?
                        <>
                        {i !== 0 && <div className='h-8 w-[1px] bg-font-gray'></div>}
                        <div onClick={()=>setAction(config)} className='flex items-center justify-center gap-4 cursor-pointer'>
                            {config?.icon && config.icon()}
                            <p className={'typography-body ' + config.extraStyles}>{config.label}</p>
                        </div>
                        </>
                        : i === trimCount ? 
                        <div className='relative flex items-center justify-between gap-4'>
                        <div className='h-8 w-[1px] bg-font-gray'></div>
                        <div onClick={()=>setOpenPalette(!openPalette)} className='flex items-center justify-center gap-4 cursor-pointer'>
                            <ThreeDotsHorizontal/>
                            <p className={'typography-body '}>More</p>
                        </div>
                        {openPalette && <div className='absolute top-12 right-0 z-10 w-fit flex flex-col gap-4 bg-grey-70 p-4 rounded-xl'>
                            {
                                multiSelectConfigState.map((config,i)=>{
                                    return (
                                        i >= trimCount &&
                                        <div className='flex items-center justify-start gap-4'>
                                            {config?.icon && config.icon()}
                                            <p className={'typography-body whitespace-nowrap' + config.extraStyles}>{config.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                        </div>
                        : null
                    )
                })
            }
        </div>
        <Modal
            open={action}
            onClose={() => setAction(null)}
            customTitle={action?.customTitle}
            customConfirmLabel={action?.confirmLabel || action?.customTitle}
            customMessage={action?.customMessage}
        >
           <div className='mt-6'>
            {Object.entries(filteredCandidates).map(([stage,candidateData])=>{
                    return (
                        <div>
                            <div className='flex items-center justify-between'>
                                <h2>{stage}</h2>
                                <p className='typography-small-p font-light text-font-gray'>{candidateData?.length ?? 0} candidates</p>
                            </div>
                            <div className='bg-background-80 p-4 rounded-xl my-4'>
                                {
                                    candidateData?.map(({candidate,checked})=>{
                                        return (
                                            <label htmlFor={candidate?._id} className='relative flex gap-4 typography-body items-center h-11'>
                                                <input 
                                                type="checkbox" 
                                                id={candidate?._id} 
                                                onChange={(e)=>toggleSelect(e.target.checked,candidate._id,stage)}
                                                checked={checked}
                                                className="appearance-none border border-background-80  h-4 w-4 text-black-100 rounded-sm bg-background-60 hover:border-grey-100 checked:bg-accent-100 checked:border-accent-100 peer" 
                                                />
                                                <span className="absolute hidden left-0 h-4 w-4 text-black-100 items-center justify-center text-black peer-checked:flex ">✔</span>
                                                <div className='w-8 h-8 rounded-full overflow-hidden'>
                                                    <img src={candidate?.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover w-full' />
                                                </div>
                                                {candidate?.firstName + " " + candidate?.lastName}
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
           </div>
        </Modal>
    </div>
  )
}

export default MultiSelectBar
