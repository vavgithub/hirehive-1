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

// This function would typically be defined in your page component
const usePageActions = () => {
    const navigate = useNavigate();

    const handleAction = (action) => {
        switch (action) {
            case 'ACTION_1':
                console.log('Performing Action 1');
                // Example: Open a modal
                // openModal('action1Modal');
                break;
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

const fetchCandidateData = async (id) => {
    const { data } = await axios.get(`/candidates/${id}`);
    return data;
};

const ViewCandidateProfile = () => {
    const handleAction = usePageActions();

    const [activeTab, setActiveTab] = useState('application');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const tabs = [
        { name: 'application', label: 'Application' },
        { name: 'candidateDetails', label: 'Candidate Details' }
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
                <div className='bg-background-90 w-full p-4 rounded-xl' >
                    <h1 className='typography-h1 text-white'> {data.firstName}  {data.lastName}</h1>
                    <div className='flex items-center gap-2'>
                        <span className='typography-small-p text-white'>{data.jobApplied}</span>
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                <circle cx="2" cy="2" r="2" fill="#808389" />
                            </svg>
                        }
                        <span className='typography-small-p text-white'>{data.location}</span>
                    </div>

                    <div className='flex'>
                        <div className='flex'>
                            <PhoneIcon />
                            <span className='typography-large-p text-white'>{data.phone}</span>
                        </div>
                        <div className='flex'>
                            <EmailIcon />
                            <span className='typography-large-p text-white'>{data.email}</span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <ResumeIcon />
                        {/* <PortfolioIcon /> */}
                        {/* <WebsiteIcon /> */}
                        <AssignmentIcon />
                        {/* {
                            data.budget < 100000 && <BudgetIcon />
                        } */}
                    </div>


                    <p>{data.location}</p>
                    <p>{data.experience}</p>
                    <p>{data.skills}</p>
                </div>



                <div className=' flex justify-center bg-stars bg-cover typography-h3 w-[430px]'>
                    <div className='bg-red-100'></div>
                    VAV Score
                </div>

            </div>
            <div className='flex  mt-4 mb-4' >
                <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>

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
                </div>
            )}
        </div>

    )
}

export default ViewCandidateProfile

