import React, { useCallback, useEffect, useState } from 'react'
import ArrowIcon from '../../svg/Icons/ArrowIcon'
import { BlendCloseButton } from '../../svg/Icons/CloseButton'
import { WhiteProfileIcon } from '../../svg/Icons/ProfileIcon'
import StageIcon from '../../svg/Icons/StageIcon'
import StatusIcon from '../../svg/Icons/StatusIcon'
import { Rating } from '../../svg/Buttons/Rating'
import { WhiteCalenderIcon } from '../../svg/Staging/CalenderIcon'
import BellIcon from '../../svg/Icons/BellIcon'
import ThreeDotsHorizontal from '../../svg/Icons/ThreeDotsHorizontal'
import Modal from '../Modals/Modal'
import axios from '../../api/axios'
import { showErrorToast, showSuccessToast } from '../ui/Toast'
import { useQueryClient } from '@tanstack/react-query'
import LoaderModal from '../Loaders/LoaderModal'
import AssigneeSelector from '../MUIUtilities/AssigneeSelector'
import RatingSelector from '../MUIUtilities/RatingSelector'
import RejectionSelector from '../MUIUtilities/RejectionSelector'

export const getMaxScoreEachStage = (currentStage) =>{
    let stageScores = {
        "Portfolio" : 5,
        "Screening" : 30,
        "Design Task" : 5,
        "Round 1" : 5,
        "Round 2" : 5,
    }
    return stageScores[currentStage] || 5;
}

const moveMultipleCandidates = async (candidateData) => {
    const response = await axios.post(`/hr//move-multiple-candidates`,{candidateData})
    return response.data;
} 

const rejectMultipleCandidates = async (candidateData) => {
    const response = await axios.post(`/hr//reject-multiple-candidates`,{candidateData})
    return response.data;
} 

const assignReviewerForCandidates = async (candidateData,assigneeId) => {
    const response = await axios.post(`/hr/update-assignee-multiple-candidates`,{candidateData,assigneeId})
    return response.data;
} 

const rateMultipleCandidates = async (candidateData,rating) => {
    const response = await axios.post(`/hr/rate-multiple-candidates`,{candidateData,rating})
    return response.data;
} 

const globalStages = ['Portfolio','Screening','Design Task','Round 1','Round 2', 'Hired']

const multiSelectConfig = [
    {
        name : "MOVE",
        label : "Move to next round",
        customTitle : "Move to next round",
        customMessage : "All selected candidates will be moved to the following round. Are you sure you want to proceed?",
        icon : ArrowIcon,
        apiFunction : moveMultipleCandidates, 
        validStatus : ["Reviewed"],
        type : "MODAL",
        extraStyles : ""
    },
    {
        name : "REJECT",
        label : "Reject",
        customTitle : "Reject",
        customMessage : "",
        icon : BlendCloseButton,
        apiFunction : rejectMultipleCandidates, 
        validStatus : ["Reviewed"],
        type : "MODAL",
        extraStyles : "text-red-500"
    },
    {
        name : "ASSIGNEE",
        label : "Assignee",
        customTitle : "Assignee",
        customMessage : "",
        icon : WhiteProfileIcon,
        apiFunction : assignReviewerForCandidates,
        validStatus : ["Sent","Under Review","Not Assigned","Pending"],
        type : "POPUP",
        extraStyles : ""
    },
    // {
    //     name : "STAGE",
    //     label : "Stage",
    //     customTitle : "Stage",
    //     customMessage : "",
    //     icon : StageIcon,
    //     validStatus : [],
    //     type : "POPUP",
    //     extraStyles : ""
    // },
    // {
    //     name : "STATUS",
    //     label : "Status",
    //     customTitle : "Status",
    //     customMessage : "",
    //     icon : StatusIcon,
    //     validStatus : [],
    //     type : "POPUP",
    //     extraStyles : ""
    // },
    {
        name : "RATING",
        label : "Rating",
        customTitle : "Rating",
        customMessage : "",
        icon : Rating,
        apiFunction : rateMultipleCandidates, 
        validStatus : [
            "Accepted",
            "Call Scheduled",
            "Cleared",
            "No Show",
            "Not Assigned",
            "Not Submitted",
            "Offer Sent",
            "Pending",
            "Reviewed",
            "Sent",
            "Under Review"
          ],
        type : "POPUP",
        extraStyles : ""
    },
    // {
    //     name : "RESCHEDULE",
    //     label : "Reschedule",
    //     customTitle : "Reschedule",
    //     customMessage : "",
    //     icon : WhiteCalenderIcon,
    //     validStatus : [],
    //     type : "POPUP",
    //     extraStyles : ""
    // },
    // {
    //     name : "REMIND CANDIDATE",
    //     label : "Remind Candidate",
    //     customTitle : "Remind Candidate",
    //     customMessage : "",
    //     icon : BellIcon,
    //     validStatus : [],
    //     type : "POPUP",
    //     extraStyles : ""
    // },
]

function isSubsetAndOnly(validArray, itemsArray) {
    // Check if no items in itemsArray exist in validArray
    return itemsArray.every(item => !validArray.includes(item));
}

function MultiSelectBar({selectedData,jobId,clearSelection}) {
  const [filteredCandidates,setFilteredCandidates] = useState([]);
  const [trimCount,setTrimCount] = useState(4);
  const [openPalette,setOpenPalette] = useState(false);
  const [action,setAction] = useState(null);
  const [multiSelectConfigState,setMultiSelectConfigState] = useState(multiSelectConfig);

  const queryClient = useQueryClient();

  const [isLoading,setIsLoading] = useState(false);

  const [selectedAssignee,setSelectedAssignee] = useState({});
  
  //For assignee dropdown anchor
  const [selectedAnchor,setSelectedAnchor] = useState(null);

  const [isValid,setIsValid] = useState(false);

  useEffect(()=>{
    if(action?.name === "REJECT"){
        setIsValid(false)
    }else{
        setIsValid(true)
    }
  },[action])

  useEffect(()=> {
    if(action?.name === "REJECT"){
        let isValidForRejection = true;
        Object.entries(filteredCandidates).map(([currentStage,currentCandidates])=>{
            currentCandidates.map((eachCandidate)=>{
                    if(eachCandidate?.checked && !eachCandidate?.rejectionReason){
                        isValidForRejection = false
                    }
                    return eachCandidate
            })
                return [currentStage,currentCandidates]
            }
        )
        setIsValid(isValidForRejection)
    }
  },[filteredCandidates])

  useEffect(()=>{
    if(selectedData && Array.isArray(selectedData)){
        let filteredCandidatesObj = {};
        selectedData?.map(candidate => {
            if(action?.validStatus.includes(candidate.stageStatuses[candidate.currentStage].status)){
                if(filteredCandidatesObj[candidate.currentStage]){
                    filteredCandidatesObj[candidate.currentStage].push({candidate,checked:true})
                }else{
                    filteredCandidatesObj[candidate.currentStage] = [{candidate,checked:true}]
                }
            }
        })
        setFilteredCandidates(filteredCandidatesObj)
        
        //Status based actions
        let currentStatuses = new Set();
        selectedData.forEach(selectedCandidate=>{
            currentStatuses.add(selectedCandidate.stageStatuses[selectedCandidate.currentStage].status)
        })

        const updatedMultiSelect = multiSelectConfig.map(config => {
            return {
                ...config,
                disabled : isSubsetAndOnly(config.validStatus,Array.from(currentStatuses))
            }
        })
        setMultiSelectConfigState(updatedMultiSelect)
    }
  },[selectedData,action])

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

    const [anchorEl, setAnchorEl] = useState(null);
    const [chosenCandidate, setChosenCandidate] = useState(null);
    const [chosenStage, setChosenStage] = useState(null);

  const handleReasonSelect = (reason,candidateId,stage) => {
    setFilteredCandidates(prevCandidates => {
        let prevCandidatesArray = Object.entries(prevCandidates);
        const updatedCandidates = prevCandidatesArray.map(([currentStage,currentCandidates])=>{
            if(currentStage === stage){
                const updatedByStage = currentCandidates.map((eachCandidate)=>{
                    if(eachCandidate?.candidate?._id === candidateId){
                        return {
                            ...eachCandidate,
                            rejectionReason : reason
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
    setChosenCandidate(null)
    setChosenStage(null)
    setAnchorEl(null)
  }

  const handleConfirm = async (confirmFunction, scheduledDate, scheduledTime) =>{
    try {
        setIsLoading(true);
        const candidatesData = Object.entries(filteredCandidates).map(([stage,candidates]) => {
            let candidatesArray = candidates.filter(eachCandidate=> eachCandidate.checked).map(eachCandidate =>{
                if(action.name === "REJECT"){
                    return { 
                        candidateId : eachCandidate?.candidate._id,
                        jobId : eachCandidate?.candidate?.jobId || jobId,
                        stage : stage,
                        rejectionReason : eachCandidate?.rejectionReason,
                        ...(scheduledDate ? {scheduledDate : scheduledDate} : {}),
                        ...(scheduledTime ? {scheduledTime : scheduledTime} : {}),
                    }
                }else{
                    return { 
                        candidateId : eachCandidate?.candidate._id,
                        jobId : eachCandidate?.candidate?.jobId || jobId,
                        stage : stage,
                    }
                }
            }) 
            return candidatesArray
        }).flat()
        const response = await confirmFunction(candidatesData);
        if(response.message){
            showSuccessToast("Success",response.message)
            queryClient.invalidateQueries(['candidates', jobId], { refetch: true });
        }
        setIsLoading(false);
        clearSelection([])
    } catch (error) {
        setIsLoading(false);
        console.log(`${action.name} Function error `,error)
        showErrorToast("Error",error?.response?.data?.error || `Error in ${action.label} action`)
    }
  }

  const getCandidatesArray = (candidatesData) => {
    const updatedCandidatesData = Object.entries(candidatesData).map(([stage,candidates]) => {
        let candidatesArray = candidates.map(eachCandidate =>{
            
                return { 
                    candidateId : eachCandidate?.candidate._id,
                    jobId : eachCandidate?.candidate?.jobId || jobId,
                    stage : stage,
                }
        }) 
        return candidatesArray
    }).flat()
    return updatedCandidatesData
  }

  const handleAssigneeChange = async (assignee) => {
      try {
        setIsLoading(true);
        const selectedCandidates = getCandidatesArray(filteredCandidates)
        const response = await action?.apiFunction(selectedCandidates,assignee?._id);
        if(response?.message){
            showSuccessToast("Success",response.message)
            queryClient.invalidateQueries(['candidates', jobId], { refetch: true });
        }
        setIsLoading(false);
        clearSelection([])
        setAction(null);
      } catch (error) {
        setIsLoading(false);
        console.log(`${action.name} Function error `,error)
        showErrorToast("Error",error?.response?.data?.error || `Error in ${action.label} action`)
      }
  }

  const handleRatingSelect = async (rating) => {
    try {
        setIsLoading(true);
        const selectedCandidates = getCandidatesArray(filteredCandidates)
        const response = await action?.apiFunction(selectedCandidates,rating);
        if(response?.message){
            showSuccessToast("Success",response.message)
            queryClient.invalidateQueries(['candidates', jobId], { refetch: true });
        }
        setIsLoading(false);
        clearSelection([])
        setAction(null);
      } catch (error) {
        setIsLoading(false);
        console.log(`${action.name} Function error `,error)
        showErrorToast("Error",error?.response?.data?.error || `Error in ${action.label} action`)
      }
  }

  return (
    <div className='bg-black-100 font-outfit p-4 rounded-xl mb-4 flex justify-between items-center h-14 relative'>
        {isLoading && <LoaderModal/>}
        <div>
            <p className='text-teal-100 typography-body'>{selectedData?.length ?? 0} Items Selected</p>
        </div>
        <div className='flex justify-between items-center gap-4 '>
            {
                multiSelectConfigState.map((config,i)=>{
                    return (
                        i < trimCount ?
                        <div key={config.name} className='flex justify-between items-center gap-4 relative'>
                        {i !== 0 && <div className='h-8 w-[1px] bg-font-gray'></div>}
                        <div onClick={!config?.disabled ? (e)=>{setAction(prev => prev ? null : config); setSelectedAnchor(e.currentTarget)} : null} className={'flex items-center justify-center gap-4 ' + (config?.disabled ? "text-font-gray" : `cursor-pointer  ${config.extraStyles}`)}>
                            {config?.icon && config.icon()}
                            <p className={'typography-body '}>{config.label}</p>
                        </div>
                        {
                            action?.type === "POPUP" && action?.name === config?.name && (action?.name === "ASSIGNEE" ? 
                            <AssigneeSelector
                            mode='dropdown'
                            selectedAnchor={selectedAnchor}
                            value={selectedAssignee?._id ?? ""}
                            onChange={(newAssignee) => handleAssigneeChange(
                                newAssignee
                            )}
                            closeSelectedAnchor={()=>{setSelectedAnchor(null); setAction(null)}}
                            onSelect={() => { }}
                            />
                            : action?.name === "RATING" ? 
                                <RatingSelector 
                                anchorEl={selectedAnchor} 
                                setAnchorEl={()=>{setSelectedAnchor(null); setAction(null)}} 
                                onSelectRating={handleRatingSelect} />
                            : <></>)
                        }
                        </div>
                        : i === trimCount ? 
                        <div key={config.name} className='relative flex items-center justify-between gap-4'>
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
                                        <div onClick={!config?.disabled ? ()=>setAction(config) : null} className={'flex items-center justify-start gap-4 ' + (config?.disabled ? "text-font-gray" : `cursor-pointer  ${config.extraStyles}`)}>
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
        {action?.type === "MODAL" && 
        <Modal
            open={action}
            onConfirm={(_,scheduledDate, scheduledTime)=>handleConfirm(action?.apiFunction, scheduledDate, scheduledTime)}
            onClose={() => setAction(null)}
            isconfirmButtonDisabled={!isValid}
            customTitle={action?.customTitle}
            customConfirmLabel={action?.confirmLabel || action?.customTitle}
            confirmVariant={action?.name === "REJECT" ? "cancel" : null}
            useScheduledReject={action?.name === "REJECT"}
            customMessage={action?.customMessage}
            specifiedWidth={"max-w-4xl"}
        >
           <div className='mt-6 max-h-[60vh] scrollbar-hide overflow-y-scroll'>
            {Object.entries(filteredCandidates)?.map(([stage,candidateData])=>{
                    const nextStageIndex = globalStages.findIndex(each=>each === stage)
                    return (
                        <div key={stage}>
                            <div className='flex items-center justify-between my-2'>
                                <h2>{globalStages[nextStageIndex + 1] || stage}</h2>
                                <p className='typography-small-p font-light text-font-gray'>{candidateData?.length ?? 0} candidates</p>
                            </div>
                            <div className='gap-4 grid grid-cols-2  bg-background-70 rounded-xl p-4'>
                                {
                                    candidateData?.map(({candidate,checked,rejectionReason})=>{
                                        let score =  0;
                                        if(stage === "Screening"){
                                            score = (candidate.stageStatuses[stage].score.Attitude ? candidate.stageStatuses[stage].score.Attitude : 0) + 
                                            (candidate.stageStatuses[stage].score.UI ? candidate.stageStatuses[stage].score.UI : 0 )+ 
                                            (candidate.stageStatuses[stage].score.UX ? candidate.stageStatuses[stage].score.UX : 0) + 
                                            (candidate.stageStatuses[stage].score.Communication ? candidate.stageStatuses[stage].score.Communication : 0) + 
                                            (candidate.stageStatuses[stage].score.Tech ? candidate.stageStatuses[stage].score.Tech : 0) + 
                                            (candidate.stageStatuses[stage].score.Budget ? candidate.stageStatuses[stage].score.Budget : 0 )
                                        }else{
                                            score = candidate.stageStatuses[stage].score 
                                        }
                                        return (
                                            <div key={candidate?._id} className='bg-background-80  p-4 rounded-xl relative flex flex-col typography-body  items-center min-h-11'>
                                                <label  htmlFor={candidate?._id} className='flex justify-between items-center w-full'>
                                                    <div className='flex items-center gap-4'>
                                                        <input 
                                                        type="checkbox" 
                                                        id={candidate?._id} 
                                                        onChange={(e)=>toggleSelect(e.target.checked,candidate._id,stage)}
                                                        checked={checked}
                                                        className="appearance-none border border-background-80  h-4 w-4 text-black-100 rounded-sm bg-background-60 hover:border-grey-100 checked:bg-accent-100 checked:border-accent-100 peer" 
                                                        />
                                                        <span className="absolute hidden left-4 h-4 w-4 text-black-100 items-center justify-center text-black peer-checked:flex ">✔</span>
                                                        <div className='w-8 h-8 rounded-full overflow-hidden'>
                                                            <img src={candidate?.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover w-full' />
                                                        </div>
                                                        {candidate?.firstName + " " + candidate?.lastName}
                                                    </div>
                                                    <div>
                                                        {score} <span className='typography-small-p text-font-gray'>out of {getMaxScoreEachStage(stage)}</span>
                                                    </div>
                                                </label>
                                                {action?.name === "REJECT" && 
                                                <div className='mt-2 w-full '>
                                                    <p className='typography-h3 text-sm font-bricolage my-4'>Please provide the reason for rejecting this candidate</p>
                                                    <div 
                                                    onClick={(e)=>{setAnchorEl(!anchorEl ? e.currentTarget : null); setChosenCandidate(chosenCandidate ? null : candidate?._id); setChosenStage(chosenStage ? null : stage);}}
                                                    className={`${rejectionReason ? "text-white" : "text-font-gray"}   typography-body mt-1 h-[44px] flex items-center justify-between bg-background-40 hover:bg-background-60 w-full outline-none rounded-xl shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4`}
                                                    >
                                                    <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{rejectionReason ? rejectionReason : "-Select-"}</p>
                                                    
                                                    </div>
                                                </div>}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
           </div>
        </Modal>}
        <RejectionSelector 
        selectedAnchor={anchorEl} 
        handleClose={()=>{setAnchorEl(null); setChosenCandidate(null); setChosenStage(null)}} 
        handleReasonSelect={(reason) => {
            handleReasonSelect(reason,chosenCandidate,chosenStage)
        }} />
    </div>
  )
}

export default MultiSelectBar
