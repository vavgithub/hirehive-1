import { jobStagesStatuses } from "../config/jobStagesStatuses.js";

export const updateStatusOnAssigneeChange = (jobProfile, stage, currentStatus, hasAssignee) => {
    const stageConfig = jobStagesStatuses[jobProfile]?.find(s => s.name === stage);
    if (!stageConfig) return currentStatus;
  
    const statusIndex = stageConfig.statuses.indexOf(currentStatus);
    if (statusIndex === -1) return currentStatus;
  
    if (hasAssignee) {
      // If assigning, move to the next status that's not 'Not Assigned'
      const nextStatus = stageConfig.statuses.find((status, index) => 
        index > statusIndex && !status.toLowerCase().includes('not assigned')
      );
      return nextStatus || currentStatus;
    } else {
      // If unassigning, find the 'Not Assigned' status or keep current
      return stageConfig.statuses.find(status => 
        status.toLowerCase().includes('not assigned')
      ) || currentStatus;
    }
  };