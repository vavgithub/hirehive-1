import btoa from "btoa";
import axios from "axios";

const ZOOM_AUTH_URL = "https://zoom.us/oauth/token";

const generateAccountToken = async () => {
    try {
        const accountId = process.env.ZOOM_ACCOUNT_ID;
        const clientId = process.env.ZOOM_CLIENT_ID;
        const clientSecret = process.env.ZOOM_CLIENT_SECRET;

        const base_64 = btoa(clientId + ":" + clientSecret);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${ZOOM_AUTH_URL}?grant_type=account_credentials&account_id=${accountId}`,
            headers: {
              Authorization: "Basic " + `${base_64} `,
            },
          };
          let authResponse = await axios.request(config)
            
          return authResponse?.data?.access_token;
    } catch (error) {
        console.log("Token generation error : ",error);
        throw new Error(error?.message || "Token generation error")
    }
}

export const createMeeting = async (dateTime,stage = "Interview",emails) =>{
    try {
      const access_token = await generateAccountToken() 
      const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      // Ensure `dateTime` is converted properly to ISO 8601 without milliseconds
      const formattedStartTime = new Date(dateTime).toISOString().split(".")[0] + "Z";
      const emailArray = emails?.map(email=>({email : email}));
      
      let data = JSON.stringify({
        topic: `HireHive ${stage} call`,
        type: 2,
        start_time: formattedStartTime,
        duration: 60,
        default_password: false,
        timezone: "Asia/Kolkata",
        settings: {
          join_before_host: true,
          waiting_room: false,
          email_notification : true,
          calendar_type : 2,
          meeting_invitees : emailArray
        },
      });
      const response = await axios.request({
        method :"post",
        headers,
        data,
        url : "https://api.zoom.us/v2/users/me/meetings" 
      });
      return {
        start_url : response?.data?.start_url,
        join_url : response?.data?.join_url,
      }
    } catch (error) {
        console.log("Meeting creation error : ",error);
        throw new Error(error?.message || "Meeting creation error")
    }
} 
