import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResumeIcon from '../../svg/ResumeIcon';
import AssignmentIcon from '../../svg/AssignmentIcon';
import PhoneIcon from '../../svg/PhoneIcon';
import EmailIcon from '../../svg/EmailIcon';
import Tabs from '../../components/Tabs';
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
import { Loader } from 'lucide-react';



const fetchCandidateData = async (candidateId, jobId) => {
    console.log('Fetching candidate data for:', { candidateId, jobId });
    const { data } = await axios.get(`admin/candidate/${candidateId}/job/${jobId}`);
    console.log('API Response:', data);
    return data;
};

const fetchTotalScore = async (candidateId, jobId) => {
    const { data } = await axios.get(`hr/candidate/${candidateId}/job/${jobId}/scores`);
    return data;
}

// Transform the fetched data to match the expected structure
const transformCandidateData = (data) => {
    return {
        professionalDetails: [
            { label: 'Experience', value: data.experience || 'Not provided' },
            { label: 'Notice Period', value: data.noticePeriod || '1 Month' },
            { label: 'Current CTC', value: data.currentCtc || '4 LPA' },
            { label: 'Expected CTC', value: data.expectedCtc || '8 LPA' },
        ],
        previousExperiences: data.previousExperiences?.map((experience) => ({
            company: experience.company,
            position: experience.position,
            startDate: experience.startDate,
            endDate: experience.endDate,
        })) || [],
        skillSet: data.skillSet || ['Figma', 'Sketch', 'Adobe Suites', 'Zeplin'],
    };
};


const ViewCandidateProfile = () => {
    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified

    console.log('User role:', role);


    const [activeTab, setActiveTab] = useState('application');
    console.log('ViewCandidateProfile component rendered');
    const { candidateId, jobId } = useParams();
    console.log('Params:', { candidateId, jobId });
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
            console.log('Data fetched or updated:', data);
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
        console.log('useEffect triggered, isLoading:', isLoading);
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    const reduxState = useSelector((state) => state);
    console.log('Current Redux State:', reduxState);

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
            label: 'CandidateDetails',
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
                console.log('Performing Action 3');
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

    console.log('Rendering main component content');


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
                role === "Hiring Manager" && (




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
                                    <span className="typography-small-p text-gray-500">{data.jobApplied}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                        <circle cx="2" cy="2" r="2" fill="#808389" />
                                    </svg>
                                    <span className="typography-small-p text-gray-500">{data.location}</span>
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
                                    <ResumeIcon />
                                    <FileMainIcon />
                                    <WebsiteMainIcon />
                                    <AssignmentIcon />
                                </div>
                                <p>{data.location}</p>
                            </div>
                        </div>

                        {/* VAV Score Section */}
                        <div className="flex bg-stars flex-col items-center bg-background-90 w-[430px] bg-cover p-5 rounded-xl">
                            <h3 className="typography-h3">VAV SCORE</h3>
                            <span className="marks text-font-primary">{score?.totalScore}</span>
                            <p className="typography-large">Out of 100</p>
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