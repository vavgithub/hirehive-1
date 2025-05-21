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

const generateUserAccountToken = async () => {
    try {
        const accountId = process.env.ZOOM_ACCOUNT_ID;
        const clientId = "3Q1yCm6SySC6UZJMELAPQ" ?? process.env.ZOOM_CLIENT_ID;
        const clientSecret = "b8mdX10syDNHRekiYHgguTbLSUp0fAzc" ?? process.env.ZOOM_CLIENT_SECRET;

        const base_64 = btoa(clientId + ":" + clientSecret);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${ZOOM_AUTH_URL}?grant_type=authorization_code&code=Sczywli5mgqUVY9TRvwT6GvK7Bjr7_UYg&redirect_uri=http://localhost:5173/admin/dashboard`,
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

export const createMeeting = async (dateTime,stage = "Interview",invitees) =>{
    try {
    //   const access_token = await generateUserAccountToken() 
      const access_token = "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjQxMTBiODIzLTMyZTQtNGQ3ZS04NDc3LTYwMGViNTE5ZmUyYSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJzRWMtS01Wb1FDQzFoVHBFeVQ5ck5nIiwidmVyIjoxMCwiYXVpZCI6ImQyNWVmY2VkYTY4NGUxZWE1NmNiOTJjYjY0MjFiOGZiZDI1Y2RhN2E4NzlkMTY0MzBkNmI5YWVhODY5ZDFiNjkiLCJuYmYiOjE3NDc3NDQyNDEsImNvZGUiOiJTY3p5d2xpNW1ncVVWWTlUUnZ3VDZHdks3QmpyN19VWWciLCJpc3MiOiJ6bTpjaWQ6M1ExeUNtNlN5U0M2VVpKTUVMQVBRIiwiZ25vIjowLCJleHAiOjE3NDc3NDc4NDEsInR5cGUiOjAsImlhdCI6MTc0Nzc0NDI0MSwiYWlkIjoick8taDVrNnZTcGlNVWc0MzMyMkFmUSJ9.oKqM_orvI9j3P4NbNoXjgugeLz7zrrNM9wWvBZTlTqdteluE_F8jJNO4-Qp390U72wcUocce_xDX99QCa6aHdA" 

      console.log("TOKEN : ",access_token)
      const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      // Ensure `dateTime` is converted properly to ISO 8601 without milliseconds
      const formattedStartTime = new Date(dateTime).toISOString().split(".")[0] + "Z";
      const emailArray = invitees?.map(member=>({email : member?.email}));
      
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
          push_change_to_calendar: false,
          registrants_confirmation_email: true,
          registrants_email_notification: true,
          calendar_type : 2,
          meeting_invitees : emailArray
        },
      });
      const response = await axios.request({
        method :"post",
        headers,
        data,
        url : `https://api.zoom.us/v2/users/me/meetings` 
      });
      console.log(response.data)
      return {
        start_url : response?.data?.start_url,
        join_url : response?.data?.join_url,
      }
    } catch (error) {
        console.log("Meeting creation error : ",error);
        throw new Error(error?.message || "Meeting creation error")
    }
} 
