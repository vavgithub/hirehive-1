import { scheduleJob } from 'node-schedule';

export const triggerScheduledStatusUpdater = (date, time, candidateId, jobId, stage, status, scheduledFunction) => {
  try {
    // Extract hours and minutes from the time string
    const [hours, minutes] = time.split(":");
    
    // Create a local date object from the provided date string
    const localDate = new Date(date);
    
    // Set the hours and minutes
    localDate.setHours(hours, minutes, 0, 0);

    // Schedule the job
    const job = scheduleJob(localDate, () => {
      
      // Call the scheduled function
      scheduledFunction(candidateId, jobId, status, stage);
    });

    // Log the job scheduling
    console.log("Job scheduled for:", localDate);
    
  } catch (error) {
    console.error("Error in scheduling job:", error.message);
    throw new Error("Failed to schedule job: " + error.message);
  }
};
