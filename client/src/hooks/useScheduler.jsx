import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { updateStatus } from "../services/hr.service";

const getHoursAndMinutes = (time) => {
  let [hour, minutes] = time.split(":");
  return { hour: parseInt(hour), minutes: parseInt(minutes) };
};
const TWELVEHOURS = 12 * 60 * 60 * 1000;

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
          let result = await updateStatus(candidateData._id,candidateData.jobApplication.jobId,status);
          if(result?.message){
            setData(result.message)
          }
        }, timeFromNow > 0 ? timeFromNow : 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [stageData?.status, stageData?.currentCall, candidateData?._id]);
  return data;
}

export default useScheduler;
