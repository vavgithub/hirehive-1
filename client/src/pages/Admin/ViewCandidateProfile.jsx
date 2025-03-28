import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResumeIcon from '../../svg/Icons/ResumeIcon';
import AssignmentIcon from '../../svg/Icons/AssignmentIcon';
import PhoneIcon from '../../svg/Icons/PhoneIcon';
import EmailIcon from '../../svg/Icons/EmailIcon';
import Tabs from '../../components/ui/Tabs';
import Header from '../../components/utility/Header';
import axios from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import CandidateTabDetail from '../../components/ui/CandidateTabDetail';
import WebsiteMainIcon from '../../svg/Icons/WebsiteMainIcon';
import FileMainIcon from '../../svg/Icons/FileMainIcon';
import { ApplicationIcon, ApplicationIconActive } from '../../svg/Tabs/ApplicationIcon';
import { CandidateDetailsIcon, CandidateDetailsIconActive } from '../../svg/Tabs/CandidateDetailsIcon';
import { useAuthContext } from '../../context/AuthProvider';
import ApplicationStaging from '../../components/Staging/ApplicationStaging';
import { useDispatch, useSelector } from 'react-redux';
import { setCandidateData, setError, setLoading } from '../../redux/candidateSlice';
import { setCurrentStage, setStageStatuses } from '../../redux/applicationStageSlice';
import Loader from '../../components/Loaders/Loader';
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl';
import ResumeViewer from '../../components/utility/ResumeViewer';
import CustomToolTip from '../../components/Tooltip/CustomToolTip';
import StyledCard from '../../components/Cards/StyledCard';
import SwitchArrows from '../../svg/Icons/SwitchArrows';
import ScoreChart from '../../components/Charts/ScoreChart';
import { getStageColor, maxScoreOfEachStage } from '../../components/Staging/staging.config';
import { CustomDropdown } from '../../components/Dropdowns/CustomDropdown';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';

export const VAVScoreCard = ({score,stage,scoreStages})=>{
    const [showBreakDown,setShowBreakDown] = useState(false);

    const getScreeningTotalScore = (scoreObj) => {
        const Attitude = scoreObj?.Attitude ?? 0;
        const Communication = scoreObj?.Communication ?? 0;
        const Tech = scoreObj?.Tech ?? 0;
        const UI = scoreObj?.UI ?? 0;
        const UX = scoreObj?.UX ?? 0;
        const Budget = scoreObj?.Budget ?? 0;
        return 0 + Attitude + Communication + Tech + UI + UX + Budget 
    }

    const scoreData = useMemo(()=>{
        const mappedData = Object.entries(scoreStages)?.map(([stage,stageData])=>{
            if(stage !== "Screening"){
                return {
                    name : stage,
                    value : stageData?.score ? parseInt(stageData?.score) : 0,
                    maxScore : maxScoreOfEachStage(stage),
                    itemStyle  : {
                        color : getStageColor(stage)
                    }
                }
            }else {
                return {
                    name : stage,
                    value : stageData?.score ? getScreeningTotalScore(stageData?.score) : 0,
                    scoreObj : stageData?.score,
                    maxScore : maxScoreOfEachStage(stage),
                    itemStyle  : {
                        color : getStageColor(stage)
                    }
                }
            }
        })
        return mappedData.filter(data=>data?.name !== "Hired");
    },[scoreStages])

    if(!showBreakDown){
        return(
        <StyledCard extraStyles="flex bg-stars  flex-col items-center  w-[430px] bg-cover relative">
            <h3 className="typography-h2">VAV SCORE</h3>
            <button onClick={()=>setShowBreakDown(true)} className='absolute top-8 right-8 hover:text-font-gray'>
             <SwitchArrows />
            </button>
            <span className="marks text-font-primary">{score}</span>
            <p className="typography-large-p">Out of {getMaxScoreForStage(stage)}</p>
        </StyledCard>
    )}else{
        return(<StyledCard extraStyles="flex bg-stars  flex-col items-center  w-[430px] bg-cover relative">
            <h3 className="typography-h2">Score Breakdown</h3>
            <button onClick={()=>setShowBreakDown(false)} className='absolute top-8 right-8 hover:text-font-gray'>
             <SwitchArrows />
            </button>
            <ScoreChart scoreData={scoreData} />
        </StyledCard>)
    }
}

const fetchCandidateData = async (candidateId, jobId) => {
    const { data } = await axios.get(`admin/candidate/${candidateId}/job/${jobId}`);
    return data;
};
const fetchTotalScore = async (candidateId, jobId) => {
    const { data } = await axios.get(`hr/candidate/${candidateId}/job/${jobId}/scores`);
    return data;
}

const fetchCandidateJobs = async (candidateId) => {
    const { data } = await axios.get(`admin/candidate/${candidateId}/jobs`);
    return data;
};

// Update the transformCandidateData function
const transformCandidateData = (data) => {
    const professionalInfo = data.jobApplication.professionalInfo;

    return {
        professionalDetails: [
            { label: 'Experience', value: `${professionalInfo.experience} Years` },
            { label: 'Notice Period', value: `${professionalInfo.noticePeriod} Days` },
            { label: 'Current CTC', value: professionalInfo?.currentCTC ? `${professionalInfo.currentCTC} LPA` : '-' },
            { label: 'Expected CTC', value: professionalInfo?.expectedCTC ? `${professionalInfo.expectedCTC} LPA` : '-' },
            { label: 'Hourly Rate', value: professionalInfo?.hourlyRate ? `${professionalInfo.hourlyRate} INR/hr` : '-'  },
        ],
        // Remove previousExperiences since it's not in the API yet
        skillSet: professionalInfo.skills || [],
    };
};

// Add stage maximum scores mapping
const STAGE_MAX_SCORES = {
    'Portfolio': 5,
    'Screening': 35,
    'Design Task': 40,
    'Round 1': 45,
    'Round 2': 50
  };

export const getMaxScoreForStage = (currentStage) => {
    return STAGE_MAX_SCORES[currentStage] || 50; // Default to 50 if stage not found
  };

const ViewCandidateProfile = () => {
    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified
    const candidateData = useSelector(state => state.candidate.candidateData);
    const [activeTab, setActiveTab] = useState('application');
    const [resumeOpen,setResumeOpen] = useState(false);
    const { candidateId, jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchJobRef = useRef();
    const [selectedJob,setSelectedJob] = useState(jobId);

    const { data, isLoading, isError, error: queryError } = useQuery({
        queryKey: ['candidate', candidateId, jobId],
        queryFn: () => fetchCandidateData(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            dispatch(setError(error.message));
        },
    });


     const [originalPath] = useState(()=>{
        const isJobPath = location.pathname.includes('/admin/jobs/');
        const isJobPathHR = location.pathname.includes('/hiring-manager/jobs/');
        if (isJobPath) {
            return `/admin/jobs/view-job/${jobId}`;
        }
        if (isJobPathHR) {
            return `/hiring-manager/jobs/view-job/${jobId}`;
        }
        return role === "Hiring Manager" ?  `/hiring-manager/candidates` : role === "Admin" ? `/admin/candidates` :`/design-reviewer/candidates`; ;
     })

   // Effect for job switching
   useEffect(() => {
    if (selectedJob && (role === "Hiring Manager" || role === "Admin") && selectedJob !== jobId) {
        const isJobsPath = originalPath.includes('/admin/jobs/');
        const isJobsPathHR = originalPath.includes('/hiring-manager/jobs/');

        const basePath = ( role === "Admin" && isJobsPath ) ? '/admin/jobs' : '/admin/candidates';
        const basePathHR = ( role === "Hiring Manager" && isJobsPathHR ) ? '/hiring-manager/jobs' : '/hiring-manager/candidates';
        
        navigate(`${role === "Admin" ? basePath : basePathHR}/view-candidate/${candidateId}/${selectedJob}`, { 
            replace: true,
            state: { from: originalPath }
        });
    }
}, [selectedJob]);

    // Handle back navigation
    const handleBack = () => {
        if (role === "Candidate") {
            navigate(-1);
        } else {
            navigate(originalPath);
        }
    };


    const { data: score, error } = useQuery({
        queryKey: ['candidateScore', candidateId, jobId],
        queryFn: () => fetchTotalScore(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            dispatch(setError(error.message));
        },
    });


    const { data: candidateJobs, error : jobsError } = useQuery({
        queryKey: ['candidateJobs', candidateId],
        queryFn: () => fetchCandidateJobs(candidateId),
    });

    const formattedAppliedJobs = candidateJobs?.jobs?.map(appliedJob => ({value : appliedJob.jobId, label : appliedJob.jobApplied})) || []
    // Use useEffect to dispatch actions when data changes
    useEffect(() => {
        if (data) {
            dispatch(setCandidateData(data));
            if (data.jobApplication) {
                dispatch(setCurrentStage(data.jobApplication.currentStage));
                dispatch(setStageStatuses(data.jobApplication.stageStatuses));
            } else {
                // console.error('jobApplication data is missing');
            }
        }
    }, [data, dispatch]);

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);


    // Tab click handler
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

      // Get the maximum score based on current stage
      const getMaxScore = () => {
        if (data?.jobApplication?.currentStage) {
            return getMaxScoreForStage(data.jobApplication.currentStage);
        }
        return 50; // Default maximum score
    };

    const tabs = [
        {
            name: 'application',
            label: 'Application',
            icon: <ApplicationIcon />,
            activeIcon: <ApplicationIconActive />,
        },
        ...(role !== "Design Reviewer" ? [
            {
                name: 'candidateDetails',
                label: 'Candidate Details',
                icon: <CandidateDetailsIcon />,
                activeIcon: <CandidateDetailsIconActive />,
            }
        ] : []),
    ];

    // Handle action switcher
    const handleAction = (action) => {
        switch (action) {
            case ACTION_TYPES.EDIT:
                navigate(`/hiring-manager/jobs/edit-candidate/${candidateId}`);
                break;
            case 'ACTION_2':
                navigate('/some-other-page');
                break;
            case 'ACTION_3':
                // Example: Update state or trigger some function
                break;
            case 'ACTION_4':
                if (window.confirm('Are you sure you want to perform Action 4?')) {
                    console.log('Action 4 confirmed');
                }
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    // Show loader if data is loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }


    if (isError) {
        return <div>Error: {queryError.message}</div>;
    }

    if (!data) {
        return null;
    }

    const transformedData = transformCandidateData(data);

    const handleAssignmentNavigation = () => {

        navigate(`/hiring-manager/assessment/${candidateId}`)

    }

    const handleResumeOpen = ()=>{
        setResumeOpen(true)
    }


    return (
        // <div className='w-full p-4'>
        //     <div className="container ">
        <Container>
            {/* Page header */}
            <Header
                    HeaderText="Candidate Profile"
                    withKebab={role === "Hiring Manager" ? "true" : "false"}
                    withBack="true"
                    page="page1"
                    handleAction={handleAction}
                    onBack={handleBack} // Pass custom back handler
                    rightContent={(role === "Admin" || role === "Hiring Manager") &&
                        <div className='flex items-center h-full w-[285px] -translate-y-[6px] z-10'>
                            <CustomDropdown 
                                extraStylesForLabel=" w-[285px] " 
                                value={selectedJob} 
                                onChange={setSelectedJob} 
                                options={formattedAppliedJobs} 
                                ref={switchJobRef}
                            />
                        </div>
                    }
                />
            {/* Candidate Profile Card */}

            {
                (role === "Admin" || role === "Hiring Manager" || role === "Design Reviewer") && (
                    <div className="flex gap-3">
                        <StyledCard padding={2} extraStyles="w-full flex gap-4">
                            <div className="to-background-100 w-[200px] min-h-auto max-h-[200px] rounded-xl overflow-hidden">
                                <img src={data.profilePictureUrl || " https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover w-full overflow-hidden' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1 className="typography-h2">
                                    {data.firstName} {data.lastName}
                                </h1>
                                <div className="flex items-center gap-2 mb-3 mt-2">
                                    <span className="typography-small-p text-font-gray">{data.jobApplication.jobApplied}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                        <circle cx="2" cy="2" r="2" fill="#808389" />
                                    </svg>
                                    <span className="typography-small-p text-font-gray">{data.location}</span>
                                </div>
                                {role !== "Design Reviewer" &&
                                <div className="flex mb-3 gap-5">
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon />
                                        <span className="typography-large-p">{data.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EmailIcon />
                                        <span className="typography-large-p">{data.email}</span>
                                    </div>
                                </div>}
                                <div className="flex gap-2 items-center ">
                                    <a href={ensureAbsoluteUrl(data.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                        <CustomToolTip title={'Portfolio'} arrowed size={2}>
                                            <IconWrapper hasBg>
                                                <FileMainIcon />
                                            </IconWrapper>
                                        </CustomToolTip>
                                    </a>
                                    {data.website && (
                                        <a href={ensureAbsoluteUrl(data.website)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                            <CustomToolTip title={'Website'} arrowed size={2}>
                                                <IconWrapper hasBg>
                                                    <WebsiteMainIcon />
                                                </IconWrapper>
                                            </CustomToolTip>
                                        </a>
                                    )}
                                    <div onClick={handleResumeOpen}>
                                        <CustomToolTip title={'Resume'} arrowed size={2}>
                                            <IconWrapper hasBg>
                                                <ResumeIcon  />
                                            </IconWrapper>
                                        </CustomToolTip>
                                    </div>
                                    {resumeOpen && <ResumeViewer documentUrl={data.resumeUrl} onClose={() => setResumeOpen(false)}/>}
                                   
                                    {
                                        (data.hasGivenAssessment && role === "Hiring Manager") && <div className='cursor-pointer' onClick={handleAssignmentNavigation}> 
                                            <CustomToolTip title={'Assessment'} arrowed size={2}>
                                            <IconWrapper hasBg>
                                                <AssignmentIcon /> 
                                            </IconWrapper>
                                            </CustomToolTip>
                                        </div>
                                    }

                                </div>
                            </div>
                        </StyledCard>

                        {/* VAV Score Section */}
                        <VAVScoreCard score={score?.totalScore} stage={data?.jobApplication?.currentStage} scoreStages={data?.jobApplication?.stageStatuses} />
                    </div>
                )
            }

            {/* Conditional rendering of tabs for "Hiring Manager" */}

            <div className="flex mt-4 mb-4">
                <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>

            {/* Content of the selected tab */}
            {activeTab === 'application' && (
                <div className='w-full my-8'>
                    <ApplicationStaging
                        candidateId={candidateId}
                        jobId={jobId}
                        jobStatus={data.jobApplication.jobStatus}
                    />
                </div>
                // <Staging currentStage={data.stage} candidateData={data} />
            )}
            {activeTab === 'candidateDetails'  && (
                <CandidateTabDetail data={transformedData} />
            )}
        </Container>
        // </div>
        // </div>
    );
};

export default ViewCandidateProfile;