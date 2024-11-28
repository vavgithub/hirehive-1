// JobCard.jsx

import React from 'react';
import ThreeDots from './ThreeDots';
import { getTimeAgo } from '../utility/getTimeAgo';
import PriceIcon from '../svg/JobCard/PriceIcon';
import JobTypeIcon from '../svg/JobCard/JobTypeIcon';
import GraphIcon from '../svg/JobCard/GraphIcon';

// Helper function to truncate text to specific number of words
const truncateWords = (text, wordLimit) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const JobDetailItem = ({ icon: Icon, text }) => (
  <div className="mr-8 flex gap-2 items-center">
    <Icon />
    <p className="typography-body">{text}</p>
  </div>
);

const JobFooterItem = ({ label, value }) => (
  <div className="flex flex-col md:mr-8">
    <span className="typography-small-p text-font-gray">{label}</span>
    <span className="typography-body">{value}</span>
  </div>
);

const JobCard = ({
  job,
  handleAction,
  page,
  onClick,
  withKebab,
  isAdmin,
  isCandidate,
  isAuthenticatedCandidate,
  application, // Receive the application prop
}) => {
  const formattedCreatedAt = getTimeAgo(job.createdAt);

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
          ? formattedCreatedAt
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
  const truncatedDescription = truncateWords(job.jobDescription || 'No description available', 20);

  return (
    <div
    className="bg-background-90 hover:bg-background-60 transition-colors duration-200 shadow cursor-pointer rounded-xl mb-4 group"
    onClick={onClick ? handleCardClick : undefined}
  >
    <div className="flex flex-col items-start justify-between p-4 md:flex-row gap-3">
      <h3 className="typography-h3 group-hover:text-font-accent">{job.jobTitle}</h3>
      <div className="flex items-center">
        <span className="bg-background-70 typography-body px-4 py-2 rounded-xl">
          {job.jobProfile}
        </span>
        {withKebab && (
          <ThreeDots job={job} handleAction={handleAction} page={page} />
        )}
      </div>
    </div>
  
    <div className="flex flex-col px-4 md:flex-row items-start gap-3">
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
    <div className="px-4 p-4">
        <p className="typography-body text-font-gray">
          {truncatedDescription}
        </p>
      </div>
  
    {job.status === 'closed' && (
      <div className="flex p-4">
        <p className="typography-body text-font-gray mr-2">
          Closure Reason:
        </p>
        <p className="typography-body">{job.closingReason || 'N/A'}</p>
      </div>
    )}
  
    {(isAdmin || isCandidate) && (
      <div className="flex items-center bg-background-40 p-4 rounded-b-xl">
        <div className="flex justify-between w-full md:justify-start gap-3">
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
      </div>
    )}
  </div>
  
  
  );
};

export default JobCard;
