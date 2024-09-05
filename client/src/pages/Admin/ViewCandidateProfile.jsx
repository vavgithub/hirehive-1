import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import ResumeIcon from '../../svg/ResumeIcon';
import PortfolioIcon from '../../svg/PortfolioIcon';
import WebsiteIcon from '../../svg/WebsiteIcon';
import AssignmentIcon from '../../svg/AssignmentIcon';
import BudgetIcon from '../../svg/BudgetIcon';
import PhoneIcon from '../../svg/PhoneIcon';
import EmailIcon from '../../svg/EmailIcon';
import Tabs from '../../components/Tabs';
import MultiRoundStages from '../../components/MultiRoundStages';
import Staging from '../../components/Staging';
import Header from '../../components/utility/Header';
import axios from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import CandidateTabDetail from '../../components/ui/CandidateTabDetail';
import useAuth from '../../hooks/useAuth';
import Stars from "../../svg/Background/Stars.svg"
import { ApplicationIcon, ApplicationIconActive } from '../../svg/Tabs/ApplicationIcon';
import { CandidateDetailsIcon, CandidateDetailsIconActive } from '../../svg/Tabs/CandidateDetailsIcon';
import WebsiteMainIcon from '../../svg/WebsiteMainIcon';
import FileMainIcon from '../../svg/FileMainIcon';

// This function would typically be defined in your page component


const fetchCandidateData = async (id) => {
    const { data } = await axios.get(`/candidates/${id}`);
    return data;
};

const exampleData = {
    professionalDetails: [
        { label: "Experience", value: "8 Years" },
        { label: "Notice Period", value: "1 Month" },
        { label: "Current CTC", value: "4 LPA" },
        { label: "Expected CTC", value: "8 LPA" },
    ],
    previousExperiences: [
        {
            company: "ABC Company",
            position: "UI Designer",
            startDate: "21 Jan 2022",
            endDate: "05 July 2024",
        },
        {
            company: "DEF Company",
            position: "Junior UI Designer",
            startDate: "16 Feb 2019",
            endDate: "27 Sept 2021",
        },
    ],
    skillSet: ["Figma", "Sketch", "Adobe Suites", "Zeplin"],
};

const ViewCandidateProfile = () => {
    const { data: userData } = useAuth(); // Get user data including role

    const usePageActions = () => {
        const navigate = useNavigate();

        const handleAction = (action) => {
            switch (action) {
                case ACTION_TYPES.EDIT:
                    console.log('Performing Action 1');
                    navigate(`/admin/jobs/edit-candidate/${mainId}`);
                    setModalOpen(false);
                    break;
                // Example: Open a modal
                // openModal('action1Modal');
                case 'ACTION_2':
                    console.log('Performing Action 2');
                    // Example: Navigate to a different page
                    navigate('/some-other-page');
                    break;
                case 'ACTION_3':
                    console.log('Performing Action 3');
                    // Example: Trigger a state update
                    // setState({ someKey: newValue });
                    break;
                case 'ACTION_4':
                    console.log('Performing Action 4');
                    // Example: Show a confirmation dialog
                    if (window.confirm('Are you sure you want to perform Action 4?')) {
                        // Perform the action if confirmed
                        console.log('Action 4 confirmed');
                    }
                    break;
                default:
                    console.log('Unknown action:', action);
            }
        };

        return handleAction;
    };

    const handleAction = usePageActions();

    const [activeTab, setActiveTab] = useState('application');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        {
            name: 'application', label: 'Application', icon: <ApplicationIcon />,
            activeIcon: <ApplicationIconActive />,
        },
        {
            name: 'candidateDetails', label: 'CandidateDetails', icon: <CandidateDetailsIcon/>,
            activeIcon: <CandidateDetailsIconActive />,
        },
    ];
    const { id: mainId } = useParams();
    console.log(mainId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['candidate', mainId],
        queryFn: () => fetchCandidateData(mainId),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }



    const handleAutoAssign = () => {
        // Implement the auto-assign logic here
        console.log('Auto assigning portfolio...');
    };

    const handleActionFunction = () => {
        // Implement the auto-assign logic here
        console.log('Auto assigning portfolio...');
    };



    return (
        <div className="mx-4 pt-4 h-screen">
            <Header
                HeaderText="Candidate Profile"
                withKebab="true"
                withBack="true"
                page="page1"
                handleAction={handleAction}
            />
            <div className='flex gap-3'>
                <div className='bg-background-90 w-full p-4 rounded-xl flex' >
                    <div className='to-background-100'>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h1 className='typography-h2'> {data.firstName}  {data.lastName}</h1>
                        <div className='flex items-center gap-2 mb-3 mt-2'>
                            <span className='typography-small-p text-gray-500'>{data.jobApplied}</span>
                            {
                                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                    <circle cx="2" cy="2" r="2" fill="#808389" />
                                </svg>
                            }
                            <span className='typography-small-p text-gray-500'>{data.location}</span>
                        </div>

                        <div className='flex mb-3 gap-5'>
                            <div className='flex items-center gap-2'>
                                <PhoneIcon />
                                <span className='typography-large-p '>{data.phone}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <EmailIcon />
                                <span className='typography-large-p '>{data.email}</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <ResumeIcon />
                            <FileMainIcon />
                            <WebsiteMainIcon />
                            <AssignmentIcon />
                        </div>
                        <p>{data.location}</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between bg-background-90 typography-h3 w-[430px] p-5 rounded-xl'>
                    <div className='bg-red-100 absolute'></div>
                    VAV Score
                    <img src={Stars} alt="" />
                </div>

            </div>
            {
                userData.role == "Hiring Manager" && (
                    <div className='flex  mt-4 mb-4' >
                        <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
                    </div>
                )
            }

            {activeTab === 'application' && (
                <div>

                    <Staging
                        currentStage={data.stage}
                        candidateData={data} />

                </div>
            )}
            {activeTab === 'candidateDetails' && (
                <div>
                    {/* Candidate Details tab content */}
                    <CandidateTabDetail data={exampleData} />
                </div>
            )}
        </div>

    )
}

export default ViewCandidateProfile

