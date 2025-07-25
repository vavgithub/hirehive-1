import { candidates } from "../../models/candidate/candidate.model.js";
import { formatDateForUser } from "../../utils/dateUtilities.js";
import { getBotSignupEmailContent } from "../../utils/emailTemplates.js";
import { bot } from "../../utils/integrations/telegram.js";
import { sendEmail } from "../../utils/sentEmail.js";
//otp.js

// Store OTPs in memory (in production, use Redis or similar)
const botOtpStore = new Map();

// Generate OTP
const generateBotOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const startUser = async (bot,msg,userId) => {
    try {
        if(!msg?.from?.id){
            throw new Error('Telegram User ID Not Found!');
        }
        const telegram_user_id = msg.from.id;
        const chat_id = msg.chat.id;
        const firstName = msg.from.first_name || "there";

        const candidateExist = await candidates.findOne({'integrations.telegram.user_id' : telegram_user_id});
        if(userId){
            const candidate = await candidates.findOne({_id : userId});
            if(candidate && candidate?.integrations?.telegram?.user_id){
                //Matched Telegram with Hirehive connected id
                if(telegram_user_id === candidate.integrations.telegram.user_id){
                    await bot.sendMessage(telegram_user_id,`Hi ${candidateExist.firstName} ${candidateExist.lastName}, Welcome to HireHive.`);
                    if(candidate.integrations.telegram.status === 'CONNECTED'){
                        bot.sendMessage(telegram_user_id,`How can I help you ??`);
                    }else if(candidate.integrations.telegram.status === 'EMAIL'){
                        bot.sendMessage(telegram_user_id,`Please enter you email for authorization.`);
                    }else if(candidate.integrations.telegram.status === 'OTP'){
                        bot.sendMessage(telegram_user_id,`Please enter you OTP to continue with HireHive.`);
                    }
                }else{
                    //Handle different telegram account sync
                    const hasEntry = botOtpStore.get(telegram_user_id)
                    if(!hasEntry?.isUpdating){
                        await bot.sendMessage(telegram_user_id,`Hi ${candidate.firstName} ${candidate.lastName}, You need to verify your account to continue.`);
                        botOtpStore.set(telegram_user_id,{
                            status : "EMAIL",
                            userId : userId,
                            isUpdating : true , 
                            timestamp : Date.now() 
                        })
                        //Removing current telegram from other attached hirehive accounts
                        if(candidateExist){
                            candidateExist.integrations.telegram = null;
                            await candidateExist.save();
                        }

                        await bot.sendMessage(telegram_user_id , `Please enter your email to continue verification.`)
                    }
                    return 
                }
            }else if(candidate && !candidate?.integrations?.telegram?.user_id){
                candidate.integrations.telegram.user_id = telegram_user_id;
                candidate.integrations.telegram.status = "EMAIL";
                await candidate.save();

                //Removing current telegram from other attached hirehive accounts
                if(candidateExist){
                    candidateExist.integrations.telegram = null;
                    await candidateExist.save();
                }

                await bot.sendMessage(telegram_user_id,`Hi ${candidate.firstName} ${candidate.lastName}, Welcome to HireHive.`);
                bot.sendMessage(telegram_user_id,`Please enter you email for authorization.`);
                return
            }else{
                await bot.sendMessage(chat_id, `👋 Hello ${firstName}! You lost the connection with HireHive.`);
                bot.sendMessage(chat_id, `To Connect back again, Please delete this chat and Connect from Hirehive again.`);
            }
        }else if(candidateExist){
              await bot.sendMessage(telegram_user_id,`Hi ${candidateExist.firstName} ${candidateExist.lastName}, Welcome to HireHive.`);
            if(candidateExist.integrations.telegram.status === 'CONNECTED'){
                bot.sendMessage(telegram_user_id,`How can I help you ??`);
            }else if(candidateExist.integrations.telegram.status === 'EMAIL'){
                bot.sendMessage(telegram_user_id,`Please enter you email for authorization.`);
            }else if(candidateExist.integrations.telegram.status === 'OTP'){
                bot.sendMessage(telegram_user_id,`Please enter you OTP to continue with HireHive.`);
            }
            return
        }else{

        }
    } catch (error) {
        console.log("Error in greet user",error);
        if(msg?.from?.id){
            const firstName = msg.from.first_name || "there";
            bot.sendMessage(chat_id, `👋 Hello ${firstName}! Can't process your request, Please try again after sometime.`);
        }
        return 
    }
}

export const checkUserMessage = async (bot,msg) => {
    try {
        if(!msg?.from?.id){
            throw new Error('Telegram User ID Not Found!');
        }
        const telegram_user_id = msg.from.id;
        const hasEntry = botOtpStore.get(telegram_user_id)
        if(hasEntry?.isUpdating && hasEntry?.userId){
            const twoMinutes = 2 * 60 * 1000;
            if((Date.now() - hasEntry.timestamp) > twoMinutes){
                await bot.sendMessage(telegram_user_id,`Sorry, Your request timed out.`);
                await bot.sendMessage(telegram_user_id,`Please connect again from HireHive to continue your verification.`);
                botOtpStore.delete(telegram_user_id)
                return
            }else{
                const matchedCandidate = await candidates.findOne({_id : hasEntry.userId})
                if(hasEntry.status === 'EMAIL'){
                    if(matchedCandidate){
                        if(msg.text?.trim() === matchedCandidate.email){
                            //Creating OTP for email verification through Telegram
                            const otp = generateBotOTP();
                            botOtpStore.set(telegram_user_id,{
                                ...hasEntry,
                                status : 'OTP',
                                otp,
                                timestamp : Date.now()
                            });
                            
                            try {     
                                await bot.sendChatAction(telegram_user_id, 'typing');
                                // Send OTP email using template
                                await sendEmail(
                                    matchedCandidate.email,
                                    'Welcome to HireHive - Verify Your Email for Telegram Connect',
                                    getBotSignupEmailContent(matchedCandidate?.firstName + " " + matchedCandidate?.lastName, otp)
                                );

                                await bot.sendMessage(telegram_user_id,`A verification email was sent to ${matchedCandidate.email}.`);
                                await bot.sendMessage(telegram_user_id,`Please type the OTP for confirmation.`);
                            } catch (error) {
                                // handle Send Email Error 
                                console.log("Email Error",error)
                                bot.sendMessage(telegram_user_id,`Oops, Something went wrong. Please sent your email again.`);
                            }

                        }else{
                            //Handle unmatched emails
                            bot.sendMessage(telegram_user_id,`Email mismatched. Please sent your valid email connected with HireHive.`);
                        }
                    }else{
                        await bot.sendMessage(telegram_user_id,`Unable to find a user. Please try connecting again.`);
                        return
                    }
                }else if(hasEntry.status === 'OTP'){
                    const otpFromStore = botOtpStore.get(telegram_user_id)
                    if(!otpFromStore){
                        await bot.sendMessage(telegram_user_id,`OTP not found. Please connect from HireHive again.`);
                        return
                    }else if(otpFromStore && (otpFromStore?.otp?.toString() === msg.text?.toString()?.trim())){
                        const oneMinute = 1 * 60 * 1000
                        if(Date.now() - otpFromStore.timestamp < oneMinute){
                            matchedCandidate.integrations.telegram.user_id = telegram_user_id
                            await matchedCandidate.save();

                            botOtpStore.delete(telegram_user_id);
                            await bot.sendMessage(telegram_user_id,`Congrats. You have connected successfully with HireHive`);
                            await bot.sendMessage(telegram_user_id,`Stay tuned for updates.`);
                        }else{
                            botOtpStore.delete(telegram_user_id);
                            bot.sendMessage(telegram_user_id,`OTP timed out. Please connect from HireHive again.`);
                        }
                    }else{
                        bot.sendMessage(telegram_user_id,`Invalid OTP. Please sent your valid 6-Digit OTP.`);
                    }
                }
            }
            return //Stop here after updation
        }

        const existingCandidate = await candidates.findOne({'integrations.telegram.user_id' : telegram_user_id});
        if(existingCandidate){
            if(existingCandidate.integrations.telegram.status === 'EMAIL'){
                console.log(msg.text);
                if(msg.text?.trim() === existingCandidate.email){
                    //Creating OTP for email verification through Telegram
                    const otp = generateBotOTP();
                    botOtpStore.set(existingCandidate.email,{
                        otp,
                        timestamp : Date.now()
                    });
                    
                    try {     
                        await bot.sendChatAction(telegram_user_id, 'typing');
                        // Send OTP email using template
                        await sendEmail(
                            existingCandidate.email,
                            'Welcome to HireHive - Verify Your Email for Telegram Connect',
                            getBotSignupEmailContent(existingCandidate?.firstName + " " + existingCandidate?.lastName, otp)
                        );
                        existingCandidate.integrations.telegram.status = 'OTP'
                        await existingCandidate.save();

                        await bot.sendMessage(telegram_user_id,`A verification email was sent to ${existingCandidate.email}.`);
                        await bot.sendMessage(telegram_user_id,`Please type the OTP for confirmation.`);
                    } catch (error) {
                        // handle Send Email Error 
                        console.log("Email Error",error)
                        bot.sendMessage(telegram_user_id,`Oops, Something went wrong. Please sent your email again.`);
                    }

                }else{
                    //Handle unmatched emails
                    bot.sendMessage(telegram_user_id,`Email mismatched. Please sent your valid email connected with HireHive.`);
                }
            }else if(existingCandidate.integrations.telegram.status === 'OTP'){
                const otpFromStore = botOtpStore.get(existingCandidate.email)
                if(!otpFromStore){
                    existingCandidate.integrations.telegram.status = 'EMAIL'
                    await existingCandidate.save()
                    bot.sendMessage(telegram_user_id,`OTP not found. Please sent your email connected with HireHive again.`);
                }else if(otpFromStore && (otpFromStore?.otp?.toString() === msg.text?.toString()?.trim())){
                    const fiveMinutes = 5 * 60 * 1000
                    if(Date.now() - otpFromStore.timestamp < fiveMinutes){
                        botOtpStore.delete(existingCandidate.email);
                        existingCandidate.integrations.telegram.status = 'CONNECTED'
                        await existingCandidate.save()
                        await bot.sendMessage(telegram_user_id,`Congrats. You have connected successfully with HireHive`);
                        await bot.sendMessage(telegram_user_id,`Stay tuned for updates.`);
                    }else{
                        botOtpStore.delete(existingCandidate.email);
                        existingCandidate.integrations.telegram.status = 'EMAIL'
                        await existingCandidate.save()
                        bot.sendMessage(telegram_user_id,`OTP timed out. Please sent your email connected with HireHive again.`);
                    }
                }else{
                    bot.sendMessage(telegram_user_id,`Invalid OTP. Please sent your valid 6-Digit OTP.`);
                }
            }
        }
    } catch (error) {
        console.error("Error in greet user",error);
        return null
    }
}

const UPDATE_TYPES = {
    "PORTFOLIO_CLEARED" : {
        getMessage : (candidate,job) => `Congratulations ${candidate?.firstName ?? ''}, You have cleared Portfolio Review and moved to Screening for ${job.jobTitle || job?.jobApplied}.`,
        getAdditionalMessage : (candidate,job) => `Your Screening Interview call will be scheduled soon.`
    },
    "PORTFOLIO_REJECTED" : {
        getMessage : (candidate,job) => `Hey ${candidate?.firstName ?? ''}, Thank you applying for ${job.jobTitle || job.jobApplied}. Unfortuantely, Your application was rejected.`,
        getAdditionalMessage : (candidate,job) => `Please check Hirehive for more details.`
    },
    "SCREENING_CLEARED" : {
        getMessage : (candidate,job) => `Congratulations ${candidate?.firstName ?? ''}, You have cleared Screening Interview and moved to Design Task Round for ${job.jobTitle || job?.jobApplied}.`,
        getAdditionalMessage : (candidate,job) => `You will recieve a Design Task soon.`
    },
    "SCREENING_CALLSCHEDULED" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Screening Interview call is scheduled on ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
    },
    "SCREENING_CALL_RESCHEDULED" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Screening Interview call is rescheduled to ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
    },
    "SCREENING_REJECTED" : {
        getMessage : (candidate,job) => `Hey ${candidate?.firstName ?? ''}, Thank you applying for ${job.jobTitle || job.jobApplied}. Unfortuantely, Your application was rejected.`,
        getAdditionalMessage : (candidate,job) => `Please check Hirehive for more details.`
    },
    "DESIGN TASK_CLEARED" : {
        getMessage : (candidate,job) => `Congratulations ${candidate?.firstName ?? ''}, You have cleared Design Task Round and moved to Round 1 Interview for ${job.jobTitle || job?.jobApplied}.`,
        getAdditionalMessage : (candidate,job) => `Your Round 1 Interview call will be scheduled soon.`
    },
    "DESIGN TASK_SENT" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Design Task was shared with a Due Date of ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
        getAdditionalMessage : (candidate,job) => `Kindly complete and submit this on HireHive before deadline.`
    },
    "DESIGN TASK_REJECTED" : {
        getMessage : (candidate,job) => `Hey ${candidate?.firstName ?? ''}, Thank you applying for ${job.jobTitle || job.jobApplied}. Unfortuantely, Your application was rejected.`,
        getAdditionalMessage : (candidate,job) => `Please check Hirehive for more details.`
    },
    "ROUND 1_CLEARED" : {
        getMessage : (candidate,job) => `Congratulations ${candidate?.firstName ?? ''}, You have cleared Round 1 Interview and moved to Round 2 for ${job.jobTitle || job?.jobApplied}.`,
        getAdditionalMessage : (candidate,job) => `Your interview call will be scheduled soon.`
    },
    "ROUND 1_CALLSCHEDULED" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Round 1 Interview call is scheduled on ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
    },
    "ROUND 1_CALL_RESCHEDULED" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Round 1 Interview call is rescheduled to ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
    },
    "ROUND 1_REJECTED" : {
        getMessage : (candidate,job) => `Hey ${candidate?.firstName ?? ''}, Thank you applying for ${job.jobTitle || job.jobApplied}. Unfortuantely, Your application was rejected.`,
        getAdditionalMessage : (candidate,job) => `Please check Hirehive for more details.`
    },
    "ROUND 2_CLEARED" : {
        getMessage : (candidate,job) => `Congratulations ${candidate?.firstName ?? ''}, You have cleared Round 2 and moved to Final Hiring Round for ${job.jobTitle || job?.jobApplied}.`,
    },
    "ROUND 2_CALLSCHEDULED" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Round 2 Interview call is scheduled on ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
    },
    "ROUND 2_CALL_RESCHEDULED" : {
        getMessage : (candidate,job,scheduledDateTime) => `Hey ${candidate?.firstName ?? ''}, Your Round 2 Interview call is rescheduled to ${scheduledDateTime} UTC for ${job.jobTitle || job?.jobApplied}.`,
    },
    "ROUND 2_REJECTED" : {
        getMessage : (candidate,job) => `Hey ${candidate?.firstName ?? ''}, Thank you applying for ${job.jobTitle || job.jobApplied}. Unfortuantely, Your application was rejected.`,
        getAdditionalMessage : (candidate,job) => `Please check Hirehive for more details.`
    },
    "HIRED_CLEARED" : {
        getMessage : (candidate,job) => `Congratulations ${candidate?.firstName ?? ''}, You are Hired for ${job.jobTitle || job?.jobApplied}.`,
        getAdditionalMessage : (candidate,job) => `Check Hirehive for more details.`
    },
    "HIRED_REJECTED" : {
        getMessage : (candidate,job) => `Hey ${candidate?.firstName ?? ''}, Thank you applying for ${job.jobTitle || job.jobApplied}. Unfortuantely, Your application was rejected.`,
        getAdditionalMessage : (candidate,job) => `Please check Hirehive for more details.`
    },
    
}

export const sendUpdatesToTelegram = async (candidate, job, telegram_user_id, updateType , scheduledDateTime) =>{
    try {
        const botInstance = bot;
        if(!botInstance){
            throw new Error('Telegram Bot not connected');
        }
        if(!telegram_user_id){
            throw new Error('User not connected with Telegram');
        }
        const updateEntity = UPDATE_TYPES[updateType]
        let formatedDateTime = null
        if(scheduledDateTime){
            formatedDateTime = formatDateForUser(scheduledDateTime,'UTC')
        }
        await botInstance.sendMessage(telegram_user_id,`🎯NEW UPDATE`)
        await botInstance.sendMessage(telegram_user_id,updateEntity.getMessage(candidate,job,formatedDateTime))
        if(updateEntity.getAdditionalMessage){
            await botInstance.sendMessage(telegram_user_id,updateEntity.getAdditionalMessage(candidate,job,formatedDateTime))
        }
    } catch (error) {
        console.error("Error in sending updates",error);
        return null
    }
}