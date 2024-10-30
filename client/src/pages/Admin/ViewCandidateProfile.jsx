import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResumeIcon from '../../svg/ResumeIcon';
import AssignmentIcon from '../../svg/AssignmentIcon';
import PhoneIcon from '../../svg/PhoneIcon';
import EmailIcon from '../../svg/EmailIcon';
import Tabs from '../../components/ui/Tabs';
import Header from '../../components/utility/Header';
import axios from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
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



const fetchCandidateData = async (candidateId, jobId) => {
    const { data } = await axios.get(`admin/candidate/${candidateId}/job/${jobId}`);
    return data;
};

const fetchTotalScore = async (candidateId, jobId) => {
    const { data } = await axios.get(`hr/candidate/${candidateId}/job/${jobId}/scores`);
    return data;
}

// Update the transformCandidateData function
const transformCandidateData = (data) => {
    const professionalInfo = data.jobApplication.professionalInfo;
    
    return {
        professionalDetails: [
            { label: 'Experience', value: `${professionalInfo.experience} Years` },
            { label: 'Notice Period', value: `${professionalInfo.noticePeriod} Days` },
            { label: 'Current CTC', value: `${professionalInfo.currentCTC} LPA` },
            { label: 'Expected CTC', value: `${professionalInfo.expectedCTC} LPA` },
        ],
        // Remove previousExperiences since it's not in the API yet
        skillSet: professionalInfo.skills || [],
    };
};

const ViewCandidateProfile = () => {
    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified
    const candidateData = useSelector(state => state.candidate.candidateData);
    console.log("bad boii vevvvaar" , candidateData);
    const [activeTab, setActiveTab] = useState('application');
    const { candidateId, jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isLoading, isError, error: queryError } = useQuery({
        queryKey: ['candidate', candidateId, jobId],
        queryFn: () => fetchCandidateData(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            console.error('Query Error:', error);
            dispatch(setError(error.message));
        },
    });

    const { data: score, error } = useQuery({
        queryKey: ['candidateScore', candidateId, jobId],
        queryFn: () => fetchTotalScore(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            console.error('Query Error:', error);
            dispatch(setError(error.message));
        },
    });

    // Use useEffect to dispatch actions when data changes
    useEffect(() => {
        if (data) {
            dispatch(setCandidateData(data));
            if (data.jobApplication) {
                dispatch(setCurrentStage(data.jobApplication.currentStage));
                dispatch(setStageStatuses(data.jobApplication.stageStatuses));
            } else {
                console.error('jobApplication data is missing');
            }
        }
    }, [data, dispatch]);

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    const reduxState = useSelector((state) => state);

    // Tab click handler
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        {
            name: 'application',
            label: 'Application',
            icon: <ApplicationIcon />,
            activeIcon: <ApplicationIconActive />,
        },
        {
            name: 'candidateDetails',
            label: 'Candidate Details', // Add the space here
            icon: <CandidateDetailsIcon />,
            activeIcon: <CandidateDetailsIconActive />,
        },
    ];

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
    // if (isLoading) {
    //     console.log('Rendering loading state');
    //     return <div>Loading...</div>;
    // }

    if (isError) {
        console.error('Rendering error state:', queryError);
        return <div>Error: {queryError.message}</div>;
    }

    if (!data) {
        console.log('No data available, rendering null');
        return null;
    }



    const transformedData = transformCandidateData(data);

    return (
        <div className="mx-4 pt-4 h-screen">
            {/* Page header */}
            <Header
                HeaderText="Candidate Profile"
                withKebab={role === "Hiring Manager" ? "true" : "false"}
                withBack="true"
                page="page1"
                handleAction={handleAction}
            />
            {/* Candidate Profile Card */}

            {
                (role === "Hiring Manager" || role === "Design Reviewer") && (
                    <div className="flex gap-3">
                        <div className="bg-background-90 w-full p-4 rounded-xl flex">
                            <div className="to-background-100">
                                <img src="" alt="" />
                            </div>
                            <div>
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
                                <div className="flex mb-3 gap-5">
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon />
                                        <span className="typography-large-p">{data.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EmailIcon />
                                        <span className="typography-large-p">{data.email}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <a href={ensureAbsoluteUrl(data.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                                        <FileMainIcon />

                                    </a>



                                    <a href={ensureAbsoluteUrl(data.website)} target="_blank" rel="noopener noreferrer" className="icon-link">

                                        <WebsiteMainIcon />
                                    </a>

                                    <ResumeIcon />

                                    {
                                        data.hasGivenAssessment && <AssignmentIcon />
                                    }

                                </div>
                                <p>{data.location}</p>
                            </div>
                        </div>

                        {/* VAV Score Section */}
                        <div className="flex bg-stars flex-col items-center bg-background-90 w-[430px] bg-cover p-5 rounded-xl">
                            <h3 className="typography-h3">VAV SCORE</h3>
                            <span className="marks text-font-primary">{score?.totalScore}</span>
                            <p className="typography-large-p">Out of 100</p>
                        </div>
                    </div>
                )
            }

            {/* Conditional rendering of tabs for "Hiring Manager" */}

            <div className="flex mt-4 mb-4">
                <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>

            {/* Content of the selected tab */}
            {activeTab === 'application' && (
                <div>
                    <ApplicationStaging
                        candidateId={candidateId}
                        jobId={jobId}
                    />
                </div>
                // <Staging currentStage={data.stage} candidateData={data} />
            )}
            {activeTab === 'candidateDetails' && (
                <CandidateTabDetail data={transformedData} />
            )}
        </div>
    );
};

export default ViewCandidateProfile;