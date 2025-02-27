// JobCard.jsx

import React from 'react';
import ThreeDots from '../ui/ThreeDots';
import { getTimeAgo } from '../../utility/getTimeAgo';
import PriceIcon from '../../svg/JobCard/PriceIcon';
import JobTypeIcon from '../../svg/JobCard/JobTypeIcon';
import GraphIcon from '../../svg/JobCard/GraphIcon';
import ClosedBadge from '../../svg/ClosedBadge';
import StyledCard from './StyledCard';
import CustomBadge from '../Badge/CustomBadge';

// Helper function to truncate text to specific number of words
const truncateWords = (text, wordLimit) => {
  if (!text) return '';
  const words = text.replace("<br>","").split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const JobDetailItem = ({ icon: Icon, text }) => (
  <div className=" flex gap-2 items-center w-fit">
    <Icon />
    <p className="typography-body">{text}</p>
  </div>
);

const JobFooterItem = ({ label, value }) => (
  <div className="flex flex-col ">
    <span className="typography-small-p text-font-gray">{label}</span>
    <span className="typography-body">{value}</span>
  </div>
);

const JobCard = ({
  job,
  handleAction,
  page,
  onClick,
  isApplied,
  withKebab,
  isAdmin,
  isCandidate,
  isAuthenticatedCandidate,
  application, // Receive the application prop
}) => {
  const formattedCreatedAt = getTimeAgo(job.createdAt);
  const formattedAppliedAt = getTimeAgo(job.applicationDate);

  // Initialize variables for application data
  let applicationDate = null;
  let currentStage = null;
  let currentStageStatus = null;

  if (isAuthenticatedCandidate && application) {
    applicationDate = application.applicationDate;
    currentStage = application.currentStage;
    currentStageStatus =
      application.stageStatuses &&
      application.currentStage &&
      application.stageStatuses[application.currentStage] &&
      application.stageStatuses[application.currentStage].status
        ? application.stageStatuses[application.currentStage].status
        : 'N/A';
  }

  const handleCardClick = () => {
    if (onClick) onClick(job._id);
  };

  const adminFooterItems = [
    { label: 'Candidates', value: `${job.applied || 0} Applied` },
    { label: 'Engagement', value: `${job.applyClickCount || 0} Clicks` },
    { label: 'Applications', value: `${job.processed || 0} Processed` },
    { label: 'Posted', value: formattedCreatedAt },
  ];

  let candidateFooterItems = [];

  if (isAuthenticatedCandidate) {
    candidateFooterItems = [
      {
        label: 'Applied on',
        value: applicationDate
          ? formattedAppliedAt
          : 'N/A',
      },
      {
        label: 'Current Stage',
        value: currentStage || 'N/A',
      },
      {
        label: 'Stage Status',
        value: currentStageStatus || 'N/A',
      },
    ];
  } else if (isCandidate) {
    candidateFooterItems = [
      {
        label: 'Posted',
        value: formattedCreatedAt,
      },
      {
        label: 'Workplace Type',
        value: job.workplaceType,
      },
    ];
  }
  // Truncate job description to 10 words
  const truncatedDescription = truncateWords(job.jobDescription || 'No description available', 40);

  return (
    <StyledCard
    padding={0}
    extraStyles={(onClick ? 'cursor-pointer' : '' ) + `  hover:bg-background-60 transition-colors duration-200 shadow rounded-xl  group relative`}
    onClick={onClick ? handleCardClick : undefined}
  >
    <div className={(isApplied && "flex-col md:flex-row" ) +" flex items-start justify-between pt-4 px-4  gap-3"}>
      <h3 className={(isApplied ? "w-full md:w-[50%] xl:w-[70%]" : "w-[70%]") + " typography-h3 group-hover:text-font-accent  text-ellipsis overflow-hidden whitespace-nowrap "}>{job.jobTitle}</h3>
      <div className="flex items-center gap-3">
        {isApplied &&         
        <span className="bg-blue-300 text-blue-100 typography-body px-4 py-2 rounded-xl">
          Applied
        </span>}
        {(job.status !== "deleted" && job.status !== "closed") &&
          <CustomBadge label={job?.jobProfile} paddingX={2} />}
        {withKebab && (
          <ThreeDots job={job} handleAction={handleAction} page={page} />
        )}
      </div>
    </div>
  
    {job.status !== "deleted" ?
    <>
    <div className="flex px-4 flex-row items-start flex-wrap gap-x-8 gap-y-5">
      <JobDetailItem icon={JobTypeIcon} text={job.employmentType} />
      {((job.budgetTo > 1) || (job.budgetFrom > 0)) && 
      <JobDetailItem
        icon={PriceIcon}
        text={`${job.budgetFrom} - ${job.budgetTo} LPA`}
      />}
      <JobDetailItem
        icon={GraphIcon}
        text={`${job.experienceFrom} - ${job.experienceTo} Year`}
      />
    </div>
    <div className=" p-4 ">
        <p className="typography-body text-font-gray h-11 overflow-hidden" dangerouslySetInnerHTML={{__html : truncatedDescription}}>
          {/* {truncatedDescription} */}
        </p>
      </div>
    </> :
    <div className=" p-4 ">
    <p className="typography-body text-font-gray h-11 overflow-hidden" dangerouslySetInnerHTML={{__html : truncatedDescription}}>
      {/* {truncatedDescription} */}
    </p>
  </div>
      }
  {(job.status === 'closed' || job.status === 'deleted' ) && (
        <div className="flex px-4 pb-4 w-fit">
          <p className="typography-body text-font-gray mr-2 whitespace-nowrap">
            Closure Reason :
          </p>
          <p className="typography-body">{job.closingReason || 'N/A'}</p>
        </div>
        )}
    
  
    {(isAdmin || isCandidate) && (
      <div className="flex items-center justify-between bg-background-40 p-4 rounded-b-xl">
        <div className="flex justify-between w-full md:justify-start gap-3 md:gap-8">
          {(isAdmin ? adminFooterItems : candidateFooterItems).map(
            (item, index) => (
              <JobFooterItem
                key={index}
                label={item.label}
                value={item.value}
              />
            )
          )}
        </div>
        {(job.status === 'closed' || job.status === 'deleted' ) && (
        <div className="flex p-4 w-fit">
          <p className="typography-body text-font-gray mr-2 whitespace-nowrap">
            This job post has been closed 
          </p>
          {/* <p className="typography-body">{job.closingReason || 'N/A'}</p> */}
          <div className='absolute top-0  right-0'>
            <ClosedBadge />
          </div>
        </div>
        )}
      </div>
    )}
  </StyledCard>
  
  
  );
};

export default JobCard;
