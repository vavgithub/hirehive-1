import React from 'react';
import ThreeDots from './ThreeDots';
import { getTimeAgo } from '../utility/getTimeAgo';
import PriceIcon from '../svg/JobCard/PriceIcon';
import JobTypeIcon from '../svg/JobCard/JobTypeIcon';
import GraphIcon from '../svg/JobCard/GraphIcon';

const JobDetailItem = ({ icon: Icon, text }) => (
  <div className="mr-8 flex gap-2 items-center">
    <Icon />
    <p className="typography-body">{text}</p>
  </div>
);

const JobFooterItem = ({ label, value }) => (
  <div className="flex flex-col">
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
}) => {
  const formattedCreatedAt = getTimeAgo(job.createdAt);

  const handleCardClick = () => {
    if (onClick) onClick(job._id);
  };

  const adminFooterItems = [
    { label: 'Candidates', value: `${job.applied || 0} Applied` },
    { label: 'Engagement', value: `${job.applyClickCount || 0} Clicks` },
    { label: 'Applications', value: `${job.processed || 0} Processed` },
    { label: 'Posted', value: formattedCreatedAt },
  ];

  const candidateFooterItems = [
    { label: 'Posted', value: formattedCreatedAt },
    { label: 'Workplace Type', value: job.workplaceType },
  ];

  return (
    <div
      className="bg-background-90 shadow cursor-pointer rounded-xl mb-4"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center p-4">
        <h3 className="typography-h3">{job.jobTitle}</h3>
        <div className="flex items-center">
          <span className="bg-background-70 typography-body px-4 py-2 rounded-xl">
            {job.jobProfile}
          </span>
          {withKebab && (
            <ThreeDots job={job} handleAction={handleAction} page={page} />
          )}
        </div>
      </div>

      <div className="flex items-center px-4">
        <JobDetailItem icon={JobTypeIcon} text={job.employmentType} />
        <JobDetailItem
          icon={PriceIcon}
          text={`${job.budgetFrom} - ${job.budgetTo} LPA`}
        />
        <JobDetailItem
          icon={GraphIcon}
          text={`${job.experienceFrom} - ${job.experienceTo} Year`}
        />
      </div>

      <div className="w-[750px] max-w-full p-4">
        <p className="typography-body inline-block truncate text-ellipsis text-font-gray max-w-full">
          {job.jobDescription || 'No description available'}
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

      <div className="flex items-center justify-between bg-background-40 p-4 rounded-b-xl">
        {isAdmin && (
          <div className="flex justify-between items-center w-full">
            {adminFooterItems.map((item, index) => (
              <JobFooterItem
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        )}
        {isCandidate && (
          <div className="flex gap-28">
            {candidateFooterItems.map((item, index) => (
              <JobFooterItem
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
