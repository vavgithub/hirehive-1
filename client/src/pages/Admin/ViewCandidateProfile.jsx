import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResumeIcon from '../../svg/ResumeIcon';
import AssignmentIcon from '../../svg/AssignmentIcon';
import PhoneIcon from '../../svg/PhoneIcon';
import EmailIcon from '../../svg/EmailIcon';
import Tabs from '../../components/ui/Tabs';
import Header from '../../components/utility/Header';
import axios from '../../api/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import CandidateTabDetail from '../../components/ui/CandidateTabDetail';

import WebsiteMainIcon from '../../svg/WebsiteMainIcon';
import FileMainIcon from '../../svg/FileMainIcon';
import { ApplicationIcon, ApplicationIconActive } from '../../svg/Tabs/ApplicationIcon';
import { CandidateDetailsIcon, CandidateDetailsIconActive } from '../../svg/Tabs/CandidateDetailsIcon';
import { useAuthContext } from '../../context/AuthProvider';
import ApplicationStaging from '../../components/Staging/ApplicationStaging';
import { useDispatch, useSelector } from 'react-redux';
import { setCandidateData, setError, setLoading } from '../../redux/candidateSlice';
import { setCurrentStage, setStageStatuses } from '../../redux/applicationStageSlice';
import Loader from '../../components/ui/Loader';
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl';
import ResumeViewer from '../../components/utility/ResumeViewer';
import CustomToolTip from '../../components/utility/CustomToolTip';
import StyledCard from '../../components/ui/StyledCard';
import { CustomDropdown } from '../../components/Form/FormFields';
import RatingSelector, { getRatingIcon } from '../../components/utility/RatingSelector';
import { fetchAllDesignReviewers } from '../../api/authApi';
import PencilIcon from '../../svg/Buttons/PencilIcon';
import Modal from '../../components/Modal';
import TextEditor from '../../components/utility/TextEditor';
import LoaderModal from '../../components/ui/LoaderModal';
import EyeIcon, { EyeIconSmall } from '../../svg/EyeIcon';
import AddNotes from '../../svg/Buttons/AddNotes';
import EditNotes from '../../svg/Buttons/EditNotes';
import { truncatedText } from '../../utility/truncatedHTML';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { formatTime } from '../../utility/formatTime';
import { BookmarkIcon, BookmarkWhiteFilledIcon } from '../../svg/Checkboxes/BookmarkIcons';
import { showSuccessToast } from '../../components/ui/Toast';



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

const addNotes = async ({ candidateId, jobId, notesData }) => {
    const response = await axios.post(`admin/candidate/${candidateId}/${jobId}/addNotes`, notesData);
    return response?.data;
};

const toggleShortlistStatus = async ({ candidateId, jobId, shortlisted }) => {
    const response = await axios.post(`/admin/candidate/${candidateId}/job/${jobId}/shortlist`, { shortlisted });
    return response?.data;
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
        mutationFn: ({ candidateId, jobId, rating }) =>
            axios.post('/hr/update-candidate-rating', { candidateId, jobId, rating }),
        onSuccess: () => {
            setRatingAnchor(null)
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
    });

    const handleRateCandidate = (rating) => {
        updateCandidateRatingMutation.mutate({ candidateId, jobId, rating })
    }

    const [originalPath] = useState(() => {
        const isJobPath = location.pathname.includes('/admin/jobs/');
        if (isJobPath) {
            return `/admin/jobs/view-job/${jobId}`;
        }
        return role === "Hiring Manager" ? `/admin/candidates` : `/design-reviewer/candidates`;;
    })

    // Effect for job switching
    useEffect(() => {
        if (selectedJob && role === "Hiring Manager" && selectedJob !== jobId) {
            const isJobsPath = originalPath.includes('/admin/jobs/');
            const basePath = isJobsPath ? '/admin/jobs' : '/admin/candidates';

            navigate(`${basePath}/view-candidate/${candidateId}/${selectedJob}`, {
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

    const shortlistMutation = useMutation({
        mutationFn: toggleShortlistStatus,
        onSuccess: () => {
          queryClient.invalidateQueries(['candidate', candidateId, jobId]);
          showSuccessToast("Candidate shortlisted successfully");
        },
        onError: (error) => {
          console.error("Error updating shortlist status:", error);
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
                navigate(`/admin/jobs/edit-candidate/${candidateId}`);
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

        navigate(`/admin/assessment/${candidateId}`)

    }

    const handleResumeOpen = () => {
        setResumeOpen(true)
    }

    const handleWhatsappOpen = (candidateName, phone) => {
        const text = `Hi ${candidateName},\n\n` +
            `Hope you're doing well.\n\n` +
            `I'm ${user.name} from the Value at Void team.\n\n` +
            `Best regards,\nTeam VAV\n\n` +
            `For more information, log on to: https://www.hire.atvoid.com`
        const message = encodeURIComponent(text);
        const url = `https://wa.me/${phone}?text=${message}`;
        window.open(url, "_blank");
    }

    const handleEmailOpen = (candidateName, email, designation, dateTime) => {
        const subject = encodeURIComponent(`Application for the ${designation} Role – Value at Void`);

        const body = encodeURIComponent(
            `Hi ${candidateName},\n\n` +
            `Hope you're doing well.\n\n` +
            `I'm ${user.name} from the Value at Void team. We’ve received your application for the ${designation} role and were really impressed with the portfolio and profile you shared.\n\n` +
            `Best regards,\nTeam VAV\n\n` +
            `For more information, log on to: https://www.hire.atvoid.com`
        );

        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        window.open(mailtoLink, "_blank");
    };

    const handleOpenNotes = (e) => {
        setOpenNotes(true)
        e.stopPropagation();
    }


    return (
        <div className='w-full p-4'>
            <div className="container mx-auto">
                {addNotesMutation?.isPending && <LoaderModal />}
                {/* Page header */}
                <Header
                    HeaderText="Candidate Profile"
                    withKebab={role === "Hiring Manager" ? "true" : "false"}
                    withBack="true"
                    page="page1"
                    handleAction={handleAction}
                    onBack={handleBack} // Pass custom back handler
                    rightContent={role === "Hiring Manager" &&
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
                    (role === "Hiring Manager" || role === "Design Reviewer") && (
                        <div className="flex gap-3">
                            <StyledCard padding={2} extraStyles="w-full flex gap-4 relative justify-between relative">
                                <div className='flex gap-4'>
                                    <div className="relative to-background-100 w-[200px] min-h-auto max-h-[200px] rounded-xl overflow-hidden">
                                        <img src={data.profilePictureUrl || " https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover w-full overflow-hidden' />
                                        {(role === "Hiring Manager" || role === "Admin") &&
                                            <span onClick={(e) => setRatingAnchor(e.currentTarget)} className='absolute cursor-pointer bg-[#2d2d2eae] min-w-10 min-h-10 top-2 right-2 rounded-full flex justify-center items-center'>
                                                {getRatingIcon(data?.jobApplication?.rating)}
                                            </span>}
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
                                                    <div className='cursor-pointer' onClick={() => handleWhatsappOpen(data.firstName + " " + data.lastName, data.phone)}>
                                                        <PhoneIcon />
                                                    </div>
                                                    <span className="typography-large-p">{data.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className='cursor-pointer' onClick={() => handleEmailOpen(data?.firstName + " " + data?.lastName, data?.email, data?.jobApplication?.jobApplied, new Date(data?.jobApplication?.stageStatuses['Screening']?.currentCall?.scheduledDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + formatTime(data?.jobApplication?.stageStatuses['Screening']?.currentCall?.scheduledTime))}>
                                                        <EmailIcon />
                                                    </div>
                                                    <span className="typography-large-p">{data.email}</span>
                                                </div>
                                            </div>}
                                        <div className="flex gap-2 items-center ">
                                            <a href={ensureAbsoluteUrl(data.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                                <CustomToolTip title={'Portfolio'} arrowed size={2}>
                                                    <FileMainIcon />
                                                </CustomToolTip>
                                            </a>
                                            {data.website && (
                                                <a href={ensureAbsoluteUrl(data.website)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                                    <CustomToolTip title={'Website'} arrowed size={2}>
                                                        <WebsiteMainIcon />
                                                    </CustomToolTip>
                                                </a>
                                            )}
                                            <div onClick={handleResumeOpen}>
                                                <CustomToolTip title={'Resume'} arrowed size={2}>
                                                    <ResumeIcon />
                                                </CustomToolTip>
                                            </div>
                                            {resumeOpen && <ResumeViewer documentUrl={data.resumeUrl} onClose={() => setResumeOpen(false)} />}

                                            {
                                                (data.hasGivenAssessment && role === "Hiring Manager") && <div className='cursor-pointer' onClick={handleAssignmentNavigation}>
                                                    <CustomToolTip title={'Assessment'} arrowed size={2}>
                                                        <AssignmentIcon />
                                                    </CustomToolTip>
                                                </div>
                                            }

                                            {/* Add Shortlist Button/Icon */}
                                            {(role === "Hiring Manager" || role === "Admin") &&
                                                <div className='cursor-pointer bg-background-70 hover:bg-accent-300 rounded-xl w-11 h-11 flex justify-center items-center' onClick={handleToggleShortlist}>
                                                    <CustomToolTip title={data?.jobApplication?.shortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'} arrowed size={2}>
                                                        {data?.jobApplication?.shortlisted ? <BookmarkWhiteFilledIcon /> : <BookmarkIcon />}
                                                    </CustomToolTip>
                                                </div>
                                            }

                                        </div>
                                    </div>

                                    {/* ready only current reviewer */}
                                    {data?.jobApplication?.stageStatuses[data?.jobApplication?.currentStage]?.assignedTo && (role === "Hiring Manager" || role === "Admin") &&
                                        <div className='absolute bottom-4 right-4 flex gap-2'>
                                            <div className='flex flex-col items-end'>
                                                <p className='typography-small-p text-font-gray'>Current reviewer </p>
                                                <p className='typography-small-p '>{designReviewers?.data?.find(dr => dr?._id === data?.jobApplication?.stageStatuses[data?.jobApplication?.currentStage]?.assignedTo)?.name}</p>
                                            </div>
                                            <div className='w-8 h-8 overflow-hidden rounded-full'>
                                                <img src={designReviewers?.data?.find(dr => dr?._id === data?.jobApplication?.stageStatuses[data?.jobApplication?.currentStage]?.assignedTo)?.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover w-full overflow-hidden' />
                                            </div>
                                        </div>}
                                </div>
                                {role === "Hiring Manager" && candidateData?.jobApplication?.notes?.content ?
                                    <StyledCard onClick={() => setOpenNotesView(true)} padding={2} backgroundColor={"bg-background-80"} extraStyles={'w-[30%] h-fit max-h-36 cursor-pointer max  relative overflow-hidden'}>
                                        <div className=' flex justify-between items-center  ' >

                                            <h3 className='typography-body font-semibold font-bricolage'>Notes</h3>
                                            <div onClick={handleOpenNotes} className={'hover:bg-accent-300  bg-background-70 p-2 rounded-xl' + (candidateData?.jobApplication?.notes?.content ? " top-8 right-8 " : " top-4 right-4")}>
                                                <CustomToolTip title={candidateData?.jobApplication?.notes?.content ? "Edit notes" : "Add a note"} arrowed>
                                                    {
                                                        candidateData?.jobApplication?.notes?.content ? <EditNotes /> : <AddNotes />
                                                    }
                                                </CustomToolTip>
                                            </div>
                                        </div>

                                        <div className='overflow-hidden font-outfit text-font-gray ' dangerouslySetInnerHTML={{ __html: truncatedText(candidateData?.jobApplication?.notes?.content, 55) }}></div>

                                    </StyledCard> :
                                    <div onClick={handleOpenNotes} className={'hover:bg-accent-300  bg-background-70 p-2 h-fit rounded-xl' + (candidateData?.jobApplication?.notes?.content ? " top-8 right-8 " : " top-4 right-4")}>
                                        <CustomToolTip title={candidateData?.jobApplication?.notes?.content ? "Edit notes" : "Add a note"} arrowed>
                                            {
                                                candidateData?.jobApplication?.notes?.content ? <EditNotes /> : <AddNotes />
                                            }
                                        </CustomToolTip>
                                    </div>
                                }

                            </StyledCard>

                            {/* VAV Score Section */}
                            <StyledCard extraStyles="flex bg-stars  flex-col items-center  w-[430px] bg-cover ">
                                <h3 className="typography-h2">VAV SCORE</h3>
                                <span className="marks text-font-primary">{score?.totalScore}</span>
                                <p className="typography-large-p">Out of {getMaxScore()}</p>
                            </StyledCard>
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
                        <div className='mb-4 bg-background-40 p-4 rounded-xl'>
                            <div className='flex justify-between items-center '>
                                <h3 className='typography-body font-regular'>{candidateData?.jobApplication?.jobApplied}</h3>
                                <p className='text-font-gray typography-large-p '>{new Date(candidateData?.jobApplication?.notes?.addedDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}</p>
                            </div>
                            <div className='text-font-gray p-1 w-full overflow-x-hidden overflow-y-scroll scrollbar-hide text-ellipsis whitespace-normal break-words' dangerouslySetInnerHTML={{ __html: candidateData?.jobApplication?.notes?.content }}></div>
                        </div>
                        {
                            showMore && candidateData?.applications?.filter(app => (app?.notes?.content !== "" && app?.notes?.content !== undefined && app?.notes?.content !== null && app.jobId !== jobId))?.map(app => {
                                return (
                                    <div className='mb-4 bg-background-40 p-4 rounded-xl'>
                                        <div className='flex justify-between items-center '>
                                            <h3 className='typography-body font-regular'>{app?.jobApplied}</h3>
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
                        {candidateData?.applications?.filter(app => (app?.notes?.content !== "" && app?.notes?.content !== undefined && app?.notes?.content !== null && app.jobId !== jobId))?.length > 0 && <p onClick={() => setShowMore(!showMore)} className='cursor-pointer typography-body text-font-gray text-start flex gap-1 items-center'>{showMore ? <> <ChevronDown /> Hide </> : <> <ChevronRight /> Show more </>}</p>}
                    </div>
                </Modal>

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
                {activeTab === 'candidateDetails' && (
                    <CandidateTabDetail data={transformedData} job={data?.jobApplication} candidateId={data?._id} role={role} />
                )}
            </div>
        </div>
    );
};

export default ViewCandidateProfile;