import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const getHoursAndMinutes = (time) => {
  let [hour, minutes] = time.split(":");
  return { hour: parseInt(hour), minutes: parseInt(minutes) };
};
const TWELVEHOURS = 12 * 60 * 60 * 1000;

const updateStatus = async (candidateId,jobId,status) => {
    try {       
        const response = await axios.post(`/hr/change-status/${candidateId}/${jobId}`,{status})
        return response.data
    } catch (error) {
        console.log("Error in status update",error.response.data);
        return false
    }
};

function useScheduler(candidateData, stageData,status) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let timeout;
    if (stageData?.status === "Call Scheduled" && stageData.currentCall) {
      let { scheduledDate, scheduledTime } = stageData.currentCall;

      let { hour, minutes } = getHoursAndMinutes(scheduledTime);

      let scheduledDateObj = new Date(scheduledDate);
      scheduledDateObj.setHours(hour, minutes, 0, 0);

      let scheduledMilliseconds = scheduledDateObj.getTime();
      let timeFromNow = scheduledMilliseconds - new Date();
      
      if ((timeFromNow < TWELVEHOURS) && !data) {
        timeout = setTimeout(async() => {
          //do api call
          console.log("WORKED AT", scheduledDateObj);
          let result = await updateStatus(candidateData._id,candidateData.jobApplication.jobId,status);
          if(result?.message){
            setData(result.message)
          }
        }, timeFromNow > 0 ? timeFromNow : 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [stageData.status, stageData.currentCall, candidateData?._id]);
  return data;
}

export default useScheduler;
