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


const ViewCandidateProfile = () => {
    const handleAction = usePageActions();
    const [data, setData] = useState([]);

    const [activeTab, setActiveTab] = useState('application');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const tabs = [
        { name: 'application', label: 'Application' },
        { name: 'candidateDetails', label: 'Candidate Details' }
    ];
    const { id: mainId } = useParams();


    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8008/api/v1/candidates/${mainId}`);
            const data = await response.json();
            console.log(data);
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [mainId]);

    const paths = [
        { name: 'Jobs', href: '/admin/jobs' },
        { name: `${data.jobApplied}`, href: `/admin/view-job/${data.jobId}` },
        { name: `${data.firstName} ${data.lastName}`, href: '' },
    ];

    const handleAutoAssign = () => {
        // Implement the auto-assign logic here
        console.log('Auto assigning portfolio...');
    };

    const handleActionFunction = () => {
        // Implement the auto-assign logic here
        console.log('Auto assigning portfolio...');
    };

    const [currentStage, setCurrentStage] = useState('Portfolio');

    return (
        <div className="mx-4 pt-4 h-screen">
            {/* <Breadcrumb paths={paths} /> */}
            {/* <Header HeaderText="Candidate Profile" withKebab="true" page="page1" /> */}
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

                    {/* <div className='flex gap-1 my-4'>
                        <PhoneIcon /> <p>{data.phone}</p>
                    </div>

                    <div className='flex gap-1 my-4'>
                        <EmailIcon /> <p>{data.email}</p>
                    </div>

                    <p>{data.budget}</p> */}
                    <p>{data.location}</p>
                    <p>{data.experience}</p>
                    <p>{data.skills}</p>
                </div>
                {/* <div className='flex flex-col gap-2 px-2'>
                    <button className="bg-black text-white px-4  py-2 rounded">Move Next Round</button>
                    <button className=" text-black outline px-4 py-2 outline-black rounded">
                        Reject
                    </button>
                </div> */}


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
                    {/* Application tab content */}
                    {/* <MultiRoundStages
                        currentStage={data.stage}
                        candidateData={data}
                        onAutoAssign={handleAutoAssign}
                        initialStage={data.stage}
                    /> */}
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

