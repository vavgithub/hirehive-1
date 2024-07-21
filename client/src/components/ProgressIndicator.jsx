import React from 'react';

const stageStatuses = {
  "Portfolio": ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'],
  "Screening": ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
  "Design Task": ['Sent', 'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'],
  "Round 1": ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
  "Round 2": ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
};


const ProgressIndicator = ({ stage, status }) => {
  const getCompletionPercentage = (stage, status) => {
    console.log(stage);
    console.log(status);
    const statuses = stageStatuses[stage];
    if (!statuses) return 0;

    const index = statuses.indexOf(status);
    if (index === -1) return 0;

    // Special cases
    if (status === 'Rejected' || status === 'No Show' || status === 'Not Submitted') return 100;
    if (status === 'Completed' || status === 'Cleared') return 100;

    return Math.round((index / (statuses.length - 1)) * 100);
  };

  const percentage = getCompletionPercentage(stage, status);

  return (
    <div className="w-[100px] h-1 bg-background-90 rounded-full">
      <div
        className=" h-full bg-primary-100 rounded-full"
        style={{ width: `${percentage}%` }}
      >
        {/* {percentage} */}
      </div>
      {/* <div className=" w-full h-full  flex items-center justify-center text-sm font-semibold text-gray-700">
        {percentage}% complete
      </div> */}
    </div>
  );
};

export default ProgressIndicator;