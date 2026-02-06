// utils/telegramBot.js
import TelegramBot from 'node-telegram-bot-api';
import { checkUserMessage, getAppliedJobsUpdates,  getImageUrlFromTelegram,  getLatestJobsOfUser, getSelectedJobUpdates, handleSupportSession, startUser, submitSupport, telegramSessions } from '../../controllers/candidate/bot.controller.js';
import { uploadGoogleImageToS3 } from '../s3utility.js';
import { submitToGoogleSheets } from '../submitSupport.js';

let bot = null;

const initializeBot = async (app) => {
    try {
        const env = process.env.NODE_ENV || 'development';
        const token = process.env.TELEGRAM_BOT_TOKEN;

        if (!token) {
            throw new Error('TELEGRAM_BOT_TOKEN not set in environment variables');
        }

        if (bot) return bot; // Singleton pattern to prevent reinitialization

        if (env === 'development') {
            bot = new TelegramBot(token, { polling: true });
            console.log('Telegram bot started in polling mode (development)');
        } else {
            bot = new TelegramBot(token);
            const domain = process.env.TELEGRAM_WEBHOOK_DOMAIN;
            const route = `/telegram-webhook/${token}`;
            const webhookUrl = `${domain}${route}`;

            await bot.setWebHook(webhookUrl);
            console.log(`Telegram bot webhook set to ${webhookUrl}`);
        
            // Add express route to receive webhook updates
            app.post(route, (req, res) => {
                bot.processUpdate(req.body);
                res.sendStatus(200);
            });

        }
        // Attach bot command/event handlers here
        registerBotHandlers(bot);

        return bot;        
    } catch (error) {
        console.log("Telegram Bot Error : ",error)
    }
};


const registerBotHandlers = (botInstance) => {

    botInstance.on('message', (msg) => {
        try {
            
            const messageText = msg.text?.trim();
    
            if(!messageText) return

            // Ignore if this is a /start message or system message
            if (messageText.startsWith("/start")) return;
    
            if (messageText.startsWith("/latest_jobs")) return;
    
            if (messageText.startsWith("/get_updates")) return;
    
            if (messageText.startsWith("/support")) return;
    
            
            if(telegramSessions.has(msg.from.id)){
                const currentSession = telegramSessions.get(msg.from.id);
                if(currentSession?.session === "SUPPORT"){
                    return handleSupportSession(bot,msg)
                }
            }
    
            checkUserMessage(botInstance,msg)
            
            // Optionally, reply to the user with their ID:
            // bot.sendMessage(msg.chat.id, `Welcome to Value at Void`);
        } catch (error) {
            console.error(error)
        }
    });

    bot.on('photo', async (msg) => {
        const chatId = msg.chat.id;
        const telegram_user_id = msg.from.id;
                
        try {
            if(telegramSessions.has(telegram_user_id)){
                const currentSession = telegramSessions.get(telegram_user_id)
                if(currentSession.session === "SUPPORT" && currentSession.status === "IMAGE"){
                    const imageUrl = await getImageUrlFromTelegram(bot,msg);
                    if(imageUrl){
                        const s3Url = await uploadGoogleImageToS3(imageUrl,'screenshots');
                        if(s3Url){
                            const submissionData = {
                                name : currentSession.data.name,
                                email : currentSession.data.email,
                                message : currentSession.data.message,
                                screenshotUrl : s3Url,
                                timestamp : new Date().toISOString()
                            }
                            try {
                                await submitToGoogleSheets(submissionData);
                                await bot.sendMessage(telegram_user_id,`Hey ${submissionData.name}, Your query was submitted successfully`);
                                await bot.sendMessage(telegram_user_id,`Our team will follow up with this.`);
                                telegramSessions.delete(telegram_user_id)
                            } catch (error) {
                                console.log(error)
                                await bot.sendMessage(telegram_user_id,`Oops, there was an error submitting the query. Please try once again.`);
                                telegramSessions.delete(telegram_user_id);
                            }
                        }else{
                            bot.sendMessage(chatId, `❌ Failed to upload your photo. Please try again.`);
                            return
                        }
                    }else{
                        bot.sendMessage(chatId, `❌ Failed to upload your photo. Please try again.`);
                        return
                    }
                }
            }
        }catch(error){
            console.error('Upload error:', error);
            bot.sendMessage(chatId, `❌ Failed to upload your photo. Please try again.`);
        }
    })

    // Handles /start with token (e.g. /start abc123)
    botInstance.onText(/\/start(?:\s(.+))?/, async (msg, match) => {

        const token = match[1]; // This will be undefined if just "/start"

        //Support command addition
        await botInstance.setMyCommands(
            [
                { command: 'support', description: 'Submit your queries and concerns' },
            ],
            {
                scope: {
                type: 'chat',
                chat_id: msg.from.id  
                }
            }
        );

        startUser(botInstance,msg,token)
    })

    // Handle /latest_jobs
    bot.onText(/\/latest_jobs/, (msg) => {
        getLatestJobsOfUser(bot,msg)
    });

    // Handle /latest_jobs
    bot.onText(/\/get_updates/, (msg) => {
        getAppliedJobsUpdates(bot,msg)
    });

    // Handle /support
    bot.onText(/\/support/, (msg) => {
        submitSupport(bot,msg)
    });

    bot.on('callback_query', async (query) => {
        const telegram_user_id = query.message.chat.id;
        const messageId = query.message.message_id;
        const callbackData = query.data; 

        await getSelectedJobUpdates(bot,telegram_user_id,messageId,callbackData)
        // Optional: Respond to the button click (required for smooth UX)
        await bot.answerCallbackQuery(query.id);
    })

  // You can add more handlers here (e.g., /help, callback queries, etc.)
};

export { initializeBot, bot };
