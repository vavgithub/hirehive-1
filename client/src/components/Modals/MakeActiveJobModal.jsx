import React from 'react';
import StyledCard from '../Cards/StyledCard';
import { Button } from '../Buttons/Button';
import IconWrapper from '../Cards/IconWrapper';
import { CircleCheck, ClockArrowUp, DatabaseZap, SignalHigh, SquarePen, X } from 'lucide-react';
import { getTimeAgo } from '../../utility/getTimeAgo';

const truncateWords = (text, wordLimit) => {
  if (!text) return '';
  const plainText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = plainText.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return plainText;
};

const JobDetailItem = ({ icon: Icon, text }) => (
  <div className="flex gap-2 items-center w-fit">
    <Icon />
    <p className="typography-body text-font-gray whitespace-nowrap">{text}</p>
  </div>
);

const JobFooterItem = ({ label, value }) => (
  <div className="flex flex-col min-w-0">
    <span className="typography-small-p text-font-gray mb-[2px]">{label}</span>
    <span className="typography-body text-font-main whitespace-nowrap">{value}</span>
  </div>
);

const MakeActiveJobModal = ({
  open,
  job,
  onClose,
  onEdit,
  onMakeActive,
  isPublishing = false,
}) => {
  if (!open || !job) return null;

  const isHourlyRateJob = job.employmentType === 'Part Time' || job.employmentType === 'Contract';
  const payUnit = isHourlyRateJob ? 'INR/hr' : 'LPA';
  const truncatedDescription = truncateWords(job.jobDescription || 'No description available', 18);

  const footerItems = [
    { label: 'Candidates', value: `${job.applied || 0} Applied` },
    { label: 'Engagement', value: `${job.applyClickCount || 0} Clicks` },
    { label: 'Applications', value: `${job.processed || 0} Processed` },
    { label: 'Posted', value: getTimeAgo(job.createdAt) },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed z-50 inset-0 flex justify-center items-center bg-background-overlay transition-colors bg-black/20 px-4"
    >
      <StyledCard
        onClick={(e) => e.stopPropagation()}
        backgroundColor="bg-background-90"
        padding={2}
        extraStyles="relative shadow w-full max-w-2xl transform transition-transform duration-200 ease-out"
      >
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80 z-10"
          aria-label="Close"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
        >
          <IconWrapper icon={X} size={0} />
        </div>

        <div className="pr-10">
          <h3 className="typography-h3 text-font-main mb-3">{job.jobTitle}</h3>

          <div className="flex flex-row flex-wrap items-start gap-4">
            {job.employmentType && (
              <JobDetailItem
                icon={() => <IconWrapper size={1} icon={ClockArrowUp} isInActiveIcon />}
                text={job.employmentType}
              />
            )}
            {((job.budgetTo > 1) || (job.budgetFrom > 0)) && (
              <JobDetailItem
                icon={() => <IconWrapper size={1} icon={DatabaseZap} isInActiveIcon />}
                text={`${job.budgetFrom} - ${job.budgetTo} ${payUnit}`}
              />
            )}
            {(job.experienceFrom != null || job.experienceTo != null) && (
              <JobDetailItem
                icon={() => <IconWrapper size={1} icon={SignalHigh} isInActiveIcon />}
                text={`${job.experienceFrom} - ${job.experienceTo} Year`}
              />
            )}
          </div>

          <p className="typography-body text-font-gray mt-4 mb-6 line-clamp-2">
            {truncatedDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-background-70">
            {footerItems.map(({ label, value }) => (
              <JobFooterItem key={label} label={label} value={value} />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(job)}
            icon={() => <IconWrapper icon={SquarePen} inheritColor size={0} customIconSize={5} customStrokeWidth={5} />}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={() => onMakeActive(job)}
            disabled={isPublishing}
            icon={() => <IconWrapper icon={CircleCheck} inheritColor size={0} customIconSize={5} customStrokeWidth={5} />}
          >
            {isPublishing ? 'Activating...' : 'Make it active'}
          </Button>
        </div>
      </StyledCard>
    </div>
  );
};

export default MakeActiveJobModal;
