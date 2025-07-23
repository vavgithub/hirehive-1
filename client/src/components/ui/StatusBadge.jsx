import React from 'react';
import { useTheme } from '../../context/ThemeContext';


const getStatusColor = (status) => {
  const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : '';

  switch (normalizedStatus) {
    case 'not assigned':
      return 'bg-status-bgred text-status-textred border-status-borderred';
    case 'rejected':
      return 'bg-status-bgred text-status-textred border-status-borderred';
    case 'pending':
      return 'bg-status-bgred text-status-textred border-status-borderred';
    case 'under review':
        return 'bg-status-bgyellow text-status-textyellow border-status-borderyellow';
    case 'call scheduled':
      return 'bg-status-bgyellow text-status-textyellow border-status-borderyellow';
    case 'reviewed':
    case 'cleared':
    case 'sent':
      return 'bg-status-bggreen text-status-textgreen border-status-bordergreen';
    default:
      return 'bg-status-bggray text-status-textgray border-status-bordergray';
  }
};

const StatusBadge = ({ status ,customWidth}) => {
  const colorClasses = getStatusColor(status);

  // If status is not a string, display a fallback message
  const displayStatus = typeof status === 'string' ? status : 'Unknown Status';
  const themeContext = useTheme();

  return (
    <div style={{...(themeContext?.theme === 'light' ? {borderWidth : '1px'} : {borderWidth : '0px'})}} className={`flex items-center rounded-xl justify-center ${customWidth ? customWidth : " w-[85%] "} px-4 py-2 h-8 ${colorClasses}`}>
      <span className="typography-body ">{displayStatus}</span>
    </div>
  );
};

export default StatusBadge;