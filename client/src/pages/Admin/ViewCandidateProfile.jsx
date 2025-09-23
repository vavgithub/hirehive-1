import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tabs from '../../components/ui/Tabs';
import Header from '../../components/utility/Header';
import axios from '../../services/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import CandidateTabDetail from '../../components/ui/CandidateTabDetail';
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
import ScoreChart from '../../components/Charts/ScoreChart';
import {  getStageColorForChart, maxScoreOfEachStage } from '../../config/staging.config';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { ArrowLeftRight, ChevronUp, ChevronRight, ClipboardCheck, FileText, FileUser, FolderOpen, Globe, Mail, MonitorDot, Notebook, NotebookPen, Phone, Users, Calendar1 } from 'lucide-react';
import RatingSelector, { getRatingIcon } from '../../components/MUIUtilities/RatingSelector';
import Modal from '../../components/Modals/Modal';
import TextEditor from '../../components/utility/TextEditor';
import LoaderModal from '../../components/Loaders/LoaderModal';
import { truncatedText } from '../../utility/truncatedHTML';
import { formatTime } from '../../utility/formatTime';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { formatPhoneNumber } from '../../components/Form/PhoneInputField';
import { UTCToDateFormatted } from '../../utility/timezoneConverter';
import GlobalDropDown from '../../components/Dropdowns/GlobalDropDown';
import { getRoute, hasPermission, hasRoutePermission, PERMISSIONS, ROUTE_KEY } from '../../config/permissions.config';
import { fetchTotalScore, updateCandidateRating } from '../../services/hr.service';
import { addNotes, fetchCandidateData, fetchCandidateJobs, toggleShortlistStatus } from '../../services/admin.candidate.service';
import { fetchAllDesignReviewers } from '../../services/auth.service';
import { useScoreBg, useUnknownProfilePicture } from '../../context/ThemeContext';

export const VAVScoreCard = ({ score, stage, scoreStages }) => {
    const [showBreakDown, setShowBreakDown] = useState(false);

    const getScreeningTotalScore = (scoreObj = {}) => {
    return Object.values(scoreObj).reduce((total, score) => {
        return total + parseInt(score ?? 0);
    }, 0);
    };
    
    const scoreData = useMemo(() => {
        const mappedData = Object.entries(scoreStages)?.map(([stage, stageData]) => {
            if (stage !== "Screening") {
                return {
                    name: stage,
                    value: stageData?.score ? parseInt(stageData?.score) : 0,
                    maxScore: maxScoreOfEachStage(stage),
                    itemStyle: {
                        color: getStageColorForChart(stage)
                    }
                }
            } else {
                return {
                    name: stage,
                    value: stageData?.score ? getScreeningTotalScore(stageData?.score) : 0,
                    scoreObj: stageData?.score,
                    maxScore: maxScoreOfEachStage(stage),
                    itemStyle: {
                        color: getStageColorForChart(stage)
                    }
                }
            }
        })
        return mappedData.filter(data => data?.name !== "Hired");
    }, [scoreStages])

    const stars = useScoreBg()

    if (!showBreakDown) {
        return (
            <StyledCard style={{backgroundImage : `url(${stars})`}} extraStyles="flex   flex-col items-center sm:w-[55%] lg:w-[35%]  max-w-[27rem] bg-cover relative">
                <h2 className="text-font-main">VAV SCORE</h2>
                <button onClick={() => setShowBreakDown(true)} className='absolute top-4 right-4 hover:text-font-gray'>
                    <CustomToolTip title={'View Score Breakdown'}>
                        <IconWrapper icon={ArrowLeftRight} size={0} customStrokeWidth={7} inheritColor />
                    </CustomToolTip>
                </button>
                <span className="marks text-font-primary">{score}</span>
                <p className="typography-large-p">Out of {getMaxScoreForStage(stage)}</p>
            </StyledCard>
        )
    } else {
        return (<StyledCard style={{backgroundImage : `url(${stars})`}} extraStyles="flex   flex-col items-center sm:w-[55%] lg:w-[35%]  max-w-[27rem] bg-cover relative">
            <h2>Score Breakdown</h2>
            <button onClick={() => setShowBreakDown(false)} className='absolute top-4 right-4 hover:text-font-gray'>
                <CustomToolTip title={'View VAV Score'}>
                    <IconWrapper icon={ArrowLeftRight} size={0} customStrokeWidth={7} inheritColor />
                </CustomToolTip>
            </button>
            <ScoreChart scoreData={scoreData} />
        </StyledCard>)
    }
}

// Update the transformCandidateData function
const transformCandidateData = (data) => {
    const professionalInfo = data.jobApplication.professionalInfo;

    return {
        professionalDetails: [
            { label: 'Experience', value: `${professionalInfo.experience} Years` },
            { label: 'Notice Period', value: `${professionalInfo.noticePeriod} Days` },
            { label: 'Current CTC', value: professionalInfo?.currentCTC ? `${professionalInfo.currentCTC} LPA` : '-' },
            { label: 'Expected CTC', value: professionalInfo?.expectedCTC ? `${professionalInfo.expectedCTC} LPA` : '-' },
            { label: 'Hourly Rate', value: professionalInfo?.hourlyRate ? `${professionalInfo.hourlyRate} INR/hr` : '-' },
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
    const [resumeOpen, setResumeOpen] = useState(false);
    const { candidateId, jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchJobRef = useRef();
    const [selectedJob, setSelectedJob] = useState(jobId);

    const [openNotes, setOpenNotes] = useState(false);
    const [openNotesView, setOpenNotesView] = useState(false);
    const [notes, setNotes] = useState("");
    const [showMore, setShowMore] = useState(false);

    const [ratingAnchor, setRatingAnchor] = useState(null);
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error: queryError } = useQuery({
        queryKey: ['candidate', candidateId, jobId],
        queryFn: () => fetchCandidateData(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            dispatch(setError(error.message));
        },
    });

    useEffect(() => {
        if (candidateData?.jobApplication?.notes?.content !== undefined) {
            setNotes(candidateData?.jobApplication?.notes?.content);
        } else {
            setNotes("")
        }
    }, [candidateData, jobId]);
    const { data: designReviewers, isLoading: isDesignReviewersLoading } = useQuery({
        queryKey: ['getAllDesignReviewers'],
        queryFn: () => fetchAllDesignReviewers(),
    });

    const updateCandidateRatingMutation = useMutation({
        mutationFn: updateCandidateRating,
        onSuccess: () => {
            setRatingAnchor(null)
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
    });

    const handleRateCandidate = (rating) => {
        updateCandidateRatingMutation.mutate({ candidateId, jobId, rating })
    }

    const [originalPath] = useState(() => {
        const isJobPath = location.pathname.includes('/jobs/');
        const isShortlistedPath = location.pathname.includes('/shortlisted');

        if (isShortlistedPath) {
            return getRoute(role,ROUTE_KEY.SHORTLISTED);
        } else if (isJobPath) {
            return `${getRoute(role,ROUTE_KEY.JOBS_VIEW_JOB)}/${jobId}`;
        }

        return hasRoutePermission(role,ROUTE_KEY.ALL_CANDIDATES) ? getRoute(role,ROUTE_KEY.ALL_CANDIDATES) : getRoute(role,ROUTE_KEY.CANDIDATES);
    });

    // Effect for job switching
    useEffect(() => {
        if (selectedJob && hasPermission(role,PERMISSIONS.SHOW_JOB_SWITCH) && selectedJob !== jobId) {
            const isJobsPath = originalPath.includes('/jobs/');

            navigate(`${getRoute(role,isJobsPath ? ROUTE_KEY.JOBS_VIEW_CANDIDATE : ROUTE_KEY.CANDIDATES_VIEW_CANDIDATE)}/${candidateId}/${selectedJob}`, {
                replace: true,
                state: { from: originalPath }
            });
        }
    }, [selectedJob]);

    // Handle back navigation
    const handleBack = () => {
        if (role === "Candidate") {
            navigate(-1);
        }else {
            // Check if we're on a shortlisted candidate view
            const isShortlistedPath = location.pathname.includes('/shortlisted/');
            const isReviewsPath = location.pathname.includes('/reviews/');
            if(isReviewsPath && role === "Design Reviewer"){
                navigate(getRoute(role,ROUTE_KEY.REVIEWS));
            }else if (isShortlistedPath) {
                navigate(getRoute(role,ROUTE_KEY.SHORTLISTED));
            } else {
                navigate(-1);
            }
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


    const { data: candidateJobs, error: jobsError } = useQuery({
        queryKey: ['candidateJobs', candidateId],
        queryFn: () => fetchCandidateJobs(candidateId),
    });

    const formattedAppliedJobs = candidateJobs?.jobs?.map(appliedJob => ({ value: appliedJob.jobId, label: appliedJob.jobApplied })) || []
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
            icon: <IconWrapper icon={Users} size={0} inheritColor={true} customIconSize={4} />,
            activeIcon: <IconWrapper icon={Users} inheritColor={true} size={0} customIconSize={4} />,
        },
        ...(hasPermission(role,PERMISSIONS.SHOW_TAB_CANDIDATE_DETAIL) ? [
            {
                name: 'candidateDetails',
                label: 'Candidate Details',
                icon: <IconWrapper icon={FileText} size={0} inheritColor={true} customIconSize={4} />,
                activeIcon: <IconWrapper inheritColor={true} icon={FileText} size={0} customIconSize={4} />,
            }
        ] : []),
    ];

    const shortlistMutation = useMutation({
        mutationFn: toggleShortlistStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);

            // Show different toast messages based on the shortlist action
            if (variables.shortlisted) {
                showSuccessToast("Added to Future Gems", "Candidate has been added to Future Gems");
            } else {
                showErrorToast("Removed", "Candidate has been removed from Future Gems");
            }
        },
        onError: (error) => {
            console.error("Error updating shortlist status:", error);
            showErrorToast("Error", "Failed to update Future Gems status");
        }
    });
    // Add this handler function
    const handleToggleShortlist = () => {
        const currentStatus = data?.jobApplication?.shortlisted || false;
        shortlistMutation.mutate({
            candidateId,
            jobId,
            shortlisted: !currentStatus
        });
    };

    const addNotesMutation = useMutation({
        mutationFn: addNotes,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
        onError: (error) => {
            console.error("Error adding notes :", error);
            // Handle error (e.g., show error message to user)
        }
    })

    const handleAddNotes = () => {
        addNotesMutation.mutate({ candidateId, jobId, notesData: { notes: notes } })
    }

    // Handle action switcher
    const handleAction = (action) => {
        switch (action) {
            case ACTION_TYPES.EDIT:
                navigate(`${getRoute(role,
                    location.pathname.includes('/candidates/all') 
                    ? ROUTE_KEY.CANDIDATES_EDIT_CANDIDATE_PROFILE 
                    : 
                    location.pathname.includes('/candidates/shortlisted') 
                    ? ROUTE_KEY.SHORTLISTED_EDIT_CANDIDATE_PROFILE
                    : ROUTE_KEY.JOBS_EDIT_CANDIDATE_PROFILE)}/${candidateId}`);
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

    const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture()

    const handleAssignmentNavigation = () => {

        navigate(`${getRoute(role,
            location.pathname.includes('/jobs/all') 
            ? ROUTE_KEY.JOBS_ASSESSMENT_RESPONSE 
            : location.pathname.includes('/candidates/shortlisted') 
            ? ROUTE_KEY.SHORTLISTED_ASSESSMENT_RESPONSE 
            : ROUTE_KEY.CANDIDATES_ASSESSMENT_RESPONSE)}/${candidateId}/${jobId}`)

    }

    const handleResumeOpen = () => {
        setResumeOpen(true)
    }

    const handleWhatsappOpen = (candidateName, phone) => {
        const text = `Hi ${candidateName},\n\n` +
            `Hope you're doing well.\n\n` +
            `I'm ${user?.firstName + " " + user?.lastName} from the Value at Void team.\n\n` +
            `Best regards,\nTeam VAV\n\n` +
            `For more information, log on to: https://hire.atvoid.com`
        const message = encodeURIComponent(text);
        const url = `https://wa.me/${phone}?text=${message}`;
        window.open(url, "_blank");
    }

    const handleEmailOpen = (candidateName, email, designation, dateTime) => {
        const subject = encodeURIComponent(`Application for the ${designation} Role – Value at Void`);

        const body = encodeURIComponent(
            `Hi ${candidateName},\n\n` +
            `Hope you're doing well.\n\n` +
            `I'm ${user?.firstName + " " + user?.lastName} from the Value at Void team. We’ve received your application for the ${designation} role and were really impressed with the portfolio and profile you shared.\n\n` +
            `Best regards,\nTeam VAV\n\n` +
            `For more information, log on to: https://hire.atvoid.com`
        );

        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        window.open(mailtoLink, "_blank");
    };

    const handlePhoneCopy = (phone) => {
    if (!phone) return;

        navigator.clipboard.writeText(phone)
        .then(() => {
            showSuccessToast('Success','Phone Number copied to clipboard');
            // Optionally show a success message/toast here
        })
        .catch((err) => {
            console.error('Failed to copy phone number:', err);
            // Optionally show an error message/toast
        });
    };

    const handleEmailCopy = (email) => {
    if (!email) return;

        navigator.clipboard.writeText(email)
        .then(() => {
            showSuccessToast('Success','Email copied to clipboard');
            // Optionally show a success message/toast here
        })
        .catch((err) => {
            console.error('Failed to copy email:', err);
            // Optionally show an error message/toast
        });
    };

    const handleOpenNotes = (e) => {
        setOpenNotes(true)
        e.stopPropagation();
    }

const currentAssignedId = data?.jobApplication?.stageStatuses[data?.jobApplication?.currentStage]?.assignedTo;

const currentReviewer = designReviewers?.data?.find(dr => dr?._id === currentAssignedId);
const isAdminReviewer = designReviewers?.admin?._id === currentAssignedId;
const fallbackReviewer = isAdminReviewer ? designReviewers?.admin : null;

const reviewerName = currentReviewer
  ? `${currentReviewer.firstName ?? ""} ${currentReviewer.lastName ?? ""}`.trim()
  : fallbackReviewer
    ? `${fallbackReviewer.firstName ?? ""} ${fallbackReviewer.lastName ?? ""}`.trim()
    : "";

const reviewerProfilePic = currentReviewer?.profilePicture
  ?? fallbackReviewer?.profilePicture
  ?? UNKNOWN_PROFILE_PICTURE_URL;


    return (
        <Container>
            {addNotesMutation?.isPending && <LoaderModal />}
            {/* Page header */}
            <Header
                HeaderText="Candidate Profile"
                withKebab={hasPermission(role,PERMISSIONS.SHOW_KEBAB)}
                withBack="true"
                page="page1"
                handleAction={handleAction}
                onBack={handleBack} // Pass custom back handler
                rightContent={hasPermission(role,PERMISSIONS.SHOW_JOB_SWITCH) &&
                    <div className='flex items-center h-full w-72 z-10'>
                        <GlobalDropDown
                        bgColor='bg-background-80'
                        extraStylesForLabel=" hidden "
                        value={selectedJob}
                        onChange={setSelectedJob}
                        options={formattedAppliedJobs}
                        />
                    </div>
                }
            />
            <StyledCard >
            {/* Candidate Profile Card */}
            {
                hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_CARD) && (
                    <div className="flex gap-3">
                        <StyledCard padding={2} backgroundColor={'bg-background-100'} extraStyles="w-full flex gap-4 relative justify-between relative">
                            <div className='flex gap-4 '>
                                <div className="relative to-background-100 w-[210px] min-h-auto max-h-[210px] rounded-xl overflow-hidden">
                                    <img src={data.profilePictureUrl || UNKNOWN_PROFILE_PICTURE_URL} alt="" className='object-cover w-full overflow-hidden' />
                                    {hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_RATING) &&
                                        <span onClick={(e) => setRatingAnchor(e.currentTarget)} className='absolute cursor-pointer bg-background-60 min-w-10 min-h-10 top-2 right-2 rounded-full flex justify-center items-center'>
                                            {getRatingIcon(data?.jobApplication?.rating)}
                                        </span>}
                                </div>
                                <div className={`flex flex-col gap-2 ${candidateData?.jobApplication?.notes?.content ? ' max-w-[60%] ' : ''}`}>
                                    <h2>
                                        {data.firstName} {data.lastName}
                                    </h2>
                                    <div className="flex items-center gap-2 mb-3 mt-2">
                                        <span className="typography-small-p text-font-gray">{data.jobApplication.jobApplied}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                            <circle cx="2" cy="2" r="2" fill="#808389" />
                                        </svg>
                                        <span className="typography-small-p text-font-gray">{data.location}</span>
                                    </div>
                                    {hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_PERSONAL_DETAILS) &&
                                        <div className=' mb-3 '>
                                        <div className="flex gap-5">
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={()=>handlePhoneCopy(data?.phone)}>
                                                    <IconWrapper size={0} customIconSize={2} icon={Phone} />
                                                <span className="typography-large-p">{data.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 overflow-hidden cursor-pointer" onClick={() => handleEmailCopy(data?.email)}>
                                                    <IconWrapper size={0} customIconSize={2} icon={Mail} />
                                                <span className="typography-large-p whitespace-nowrap text-ellipsis overflow-hidden ">{data.email}</span>
                                            </div>
                                        </div>
                                        {data?.dob && <div className="flex items-center gap-2 overflow-hidden cursor-pointer mt-4 " onClick={() => handleEmailCopy(data?.email)}>
                                                <IconWrapper size={0} customIconSize={2} icon={Calendar1} />
                                            <span className="typography-large-p whitespace-nowrap text-ellipsis overflow-hidden ">{UTCToDateFormatted(data.dob)}</span>
                                        </div>}
                                        </div>
                                        }
                                    <div className="flex gap-2 items-center ">
                                        <a href={ensureAbsoluteUrl(data.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                            <CustomToolTip title={'Portfolio'} arrowed size={2}>
                                                <IconWrapper hasBg icon={FolderOpen} />
                                            </CustomToolTip>
                                        </a>
                                        {data.website && (
                                            <a href={ensureAbsoluteUrl(data.website)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                                <CustomToolTip title={'Website'} arrowed size={2}>
                                                    <IconWrapper hasBg icon={Globe} />
                                                </CustomToolTip>
                                            </a>
                                        )}
                                        <div onClick={handleResumeOpen}>
                                            <CustomToolTip title={'Resume'} arrowed size={2}>
                                                <IconWrapper hasBg icon={FileUser} />
                                            </CustomToolTip>
                                        </div>
                                        {resumeOpen && <ResumeViewer documentUrl={data.resumeUrl} onClose={() => setResumeOpen(false)} />}

                                        {
                                            ((data.jobApplication?.assessmentResponse) && hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_ASSESSMENT_RESPONSE)) && <div className='cursor-pointer' onClick={handleAssignmentNavigation}>
                                                <CustomToolTip title={'Assessment'} arrowed size={2}>
                                                    <IconWrapper hasBg icon={ClipboardCheck} />
                                                </CustomToolTip>
                                            </div>
                                        }

                                        {/* Add Shortlist Button/Icon */}
                                        {hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_SHORTLIST_BUTTON) &&
                                            <div className='cursor-pointer bg-background-70 hover:bg-accent-300 rounded-xl w-11 h-11 flex justify-center items-center' onClick={handleToggleShortlist}>
                                                <CustomToolTip title={data?.jobApplication?.shortlisted ? 'Remove from Future Gems' : 'Add to Future Gems'} arrowed size={2}>
                                                    {data?.jobApplication?.shortlisted ? <IconWrapper hasBg icon={MonitorDot} /> : <IconWrapper isInActiveIcon hasBg icon={MonitorDot} />}
                                                </CustomToolTip>
                                            </div>
                                        }

                                    </div>
                                </div>

                                {/* ready only current reviewer */}
                                {data?.jobApplication?.stageStatuses[data?.jobApplication?.currentStage]?.assignedTo && hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_CURRENT_REVIEWER) &&
                                    <div className='absolute bottom-8 right-8 flex gap-2'>
                                        <div className='flex flex-col items-end'>
                                            <p className='typography-small-p text-font-gray'>Current reviewer </p>
                                            <p className='typography-small-p '>{reviewerName}</p>
                                        </div>
                                        <div className='w-8 h-8 overflow-hidden rounded-full'>
                                            <img src={reviewerProfilePic} alt="" className='object-cover w-full overflow-hidden' />
                                        </div>
                                    </div>}
                            </div>
                            {hasPermission(role,PERMISSIONS.SHOW_CANDIDATE_PROFILE_NOTES_SECTION) && (candidateData?.jobApplication?.notes?.content ?
                                <StyledCard  onClick={() => setOpenNotesView(true)} padding={3} backgroundColor={"bg-background-70"} extraStyles={'w-[30%] h-fit max-h-36 cursor-pointer max  relative overflow-hidden'}>
                                    <div className=' flex justify-between items-center  ' >

                                        <p className='typography-body'>Notes</p>
                                        <div onClick={handleOpenNotes} className={'hover:bg-accent-300  bg-background-70  rounded-xl' + (candidateData?.jobApplication?.notes?.content ? " top-8 right-8 " : " top-4 right-4")}>
                                            <CustomToolTip title={candidateData?.jobApplication?.notes?.content ? "Edit notes" : "Add a note"} arrowed>
                                                {
                                                    candidateData?.jobApplication?.notes?.content ? <IconWrapper icon={NotebookPen} /> : <IconWrapper icon={Notebook} />
                                                }
                                            </CustomToolTip>
                                        </div>
                                    </div>

                                    <div className='overflow-hidden text-font-gray typography-body ' dangerouslySetInnerHTML={{ __html: truncatedText(candidateData?.jobApplication?.notes?.content, 50) }}></div>

                                </StyledCard> :
                                <div onClick={handleOpenNotes} className={'hover:bg-accent-300  bg-background-70  h-fit rounded-xl' + (candidateData?.jobApplication?.notes?.content ? " top-8 right-8 " : " top-4 right-4")}>
                                    <CustomToolTip title={candidateData?.jobApplication?.notes?.content ? "Edit notes" : "Add a note"} arrowed>
                                        {
                                            candidateData?.jobApplication?.notes?.content ? <IconWrapper icon={NotebookPen} /> : <IconWrapper icon={Notebook} />
                                        }
                                    </CustomToolTip>
                                </div>)
                            }

                        </StyledCard>

                        {/* VAV Score Section */}
                        <VAVScoreCard score={score?.totalScore} stage={data?.jobApplication?.currentStage} scoreStages={data?.jobApplication?.stageStatuses} />
                    </div>
                )
            }

            <RatingSelector
                anchorEl={ratingAnchor}
                onSelectRating={handleRateCandidate}
                setAnchorEl={() => setRatingAnchor(null)}
            />

            {/* Notes Editor Modal */}
            <Modal
                open={openNotes}
                onClose={() => setOpenNotes(false)}
                onConfirm={handleAddNotes}
                customTitle={candidateData?.jobApplication?.notes?.content ? "Edit notes" : "Add Notes"}
                customMessage={`${candidateData?.jobApplication?.notes?.content ? "Edit" : "Add"} valuable insights and observations about  ${candidateData?.firstName + " " + candidateData?.lastName} here.`}
                customConfirmLabel={candidateData?.jobApplication?.notes?.content ? "Save" : "Add"}
                specifiedWidth={"max-w-xl"}
            >
                <div className='mt-4'>
                    <TextEditor htmlData={notes} loaded={false} placeholder={"Add Your Notes Here"} setEditorContent={(data) => setNotes(data)} />
                </div>
            </Modal>

            {/* Notes Display Modal */}
            <Modal
                open={openNotesView}
                onClose={() => setOpenNotesView(false)}
                customTitle={"Notes"}
                customMessage={`Insights and observations about  ${candidateData?.firstName + " " + candidateData?.lastName}.`}
                noCancel={true}
                customConfirmLabel={"OK"}
            >
                <div className='mt-4  overflow-y-scroll scrollbar-hide text-ellipsis max-h-[50vh] w-full'>
                    <div className='mb-4 bg-background-80 p-4 rounded-xl'>
                        <div className='flex justify-between items-center '>
                            <p className='typography-body font-regular'>{candidateData?.jobApplication?.jobApplied}</p>
                            <p className='text-font-gray typography-large-p '>{UTCToDateFormatted(candidateData?.jobApplication?.notes?.addedDate)}</p>
                        </div>
                        <div className='text-font-gray p-1 w-full overflow-x-hidden overflow-y-scroll scrollbar-hide text-ellipsis whitespace-normal break-words' dangerouslySetInnerHTML={{ __html: candidateData?.jobApplication?.notes?.content }}></div>
                    </div>
                    {
                        showMore && candidateData?.applications?.filter(app => (app?.notes?.content !== "" && app?.notes?.content !== undefined && app?.notes?.content !== null && app.jobId !== jobId))?.map(app => {
                            return (
                                <div className='mb-4 bg-background-80 p-4 rounded-xl'>
                                    <div className='flex justify-between items-center '>
                                        <p className='typography-body'>{app?.jobApplied}</p>
                                        <p className='text-font-gray typography-large-p '>{new Date(app.notes?.addedDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}</p>
                                    </div>
                                    <div className='text-font-gray p-1 w-full overflow-x-hidden overflow-y-scroll scrollbar-hide text-ellipsis whitespace-normal break-words' dangerouslySetInnerHTML={{ __html: app?.notes?.content }}></div>
                                </div>
                            )
                        })
                    }
                    {candidateData?.applications?.filter(app => (app?.notes?.content !== "" && app?.notes?.content !== undefined && app?.notes?.content !== null && app.jobId !== jobId))?.length > 0 && <p onClick={() => setShowMore(!showMore)} className='cursor-pointer typography-body text-font-gray text-start flex gap-1 items-center'>{showMore ? <> <ChevronUp /> Hide </> : <> <ChevronRight /> Show more </>}</p>}
                </div>
            </Modal>
            {/* Conditional rendering of tabs for "Hiring Manager" */}

            <div className={`flex ${role === 'Candidate' ? 'mb-4' : 'my-4'}`}>
                <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>

            {/* Content of the selected tab */}
            {activeTab === 'application' && (
                <div className='w-full my-4'>
                    <ApplicationStaging
                        candidateId={candidateId}
                        jobId={jobId}
                        jobStatus={data.jobApplication.jobStatus}
                    />
                </div>
                // <Staging currentStage={data.stage} candidateData={data} />
            )}
            {activeTab === 'candidateDetails' && (
                <CandidateTabDetail data={transformedData} job={data?.jobApplication} candidateId={data?._id} role={role} />
            )}
        </StyledCard>
        </Container>
    );
};

export default ViewCandidateProfile;