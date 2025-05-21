import { getToken } from "firebase/messaging"
import { messaging } from "./config"
import axios from "../../api/axios";

async function sendTokenForRegistration(token){
    const response = await axios.post('/hr/register-fcm-token',{token});
    return response.data
}

export async function requestNotificationPermission(registeredTokens){
    try {
        const publicVapidKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;
        const permission = await Notification.requestPermission()
        if(permission === 'granted'){
            const token = await getToken(messaging,{
                vapidKey : publicVapidKey
            })
            console.log(token)
            console.log("REG",registeredTokens)
            if(registeredTokens?.length === 0 || (registeredTokens?.length > 0 && !registeredTokens.includes(token))){
                await sendTokenForRegistration(token)
            }
        }else{
            console.log("Permission denied with status : ", permission )
        }
    } catch (error) {
        console.log("Requesting Permission error : ",error)
    }
}