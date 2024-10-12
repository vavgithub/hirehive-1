import React from 'react';


const getStatusColor = (status) => {
  const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : '';

  switch (normalizedStatus) {
    case 'not assigned':
      return 'bg-red-80 text-red-90';
    case 'rejected':
      return 'bg-red-200 text-red-100';
    case 'call pending':
      return 'bg-red-200 text-red-100';
    case 'under review':
        return 'bg-yellow-90 text-yellow-100';
    case 'call scheduled':
      return 'bg-yellow-100 text-yellow-200';
    case 'reviewed':
    case 'cleared':
    case 'sent':
      return 'bg-green-900 text-green-300';
    default:
      return 'bg-gray-700 text-gray-300';
  }
};

const StatusBadge = ({ status }) => {
  const colorClasses = getStatusColor(status);

  // If status is not a string, display a fallback message
  const displayStatus = typeof status === 'string' ? status : 'Unknown Status';

  return (
    <div className={`flex items-center rounded-xl justify-between px-4 py-2 h-8 ${colorClasses}`}>
      <span className="typography-body">{displayStatus}</span>
    </div>
  );
};

export default StatusBadge;