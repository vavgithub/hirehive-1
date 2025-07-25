// utils/telegramBot.js
import TelegramBot from 'node-telegram-bot-api';
import { checkUserMessage, startUser } from '../../controllers/candidate/bot.controller.js';

let bot = null;

const initializeBot = (app) => {
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

            bot.setWebHook(webhookUrl);
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
        console.log('User ID:', msg.from.id);
        console.log('User Input', msg);

        const messageText = msg.text?.trim();

        // Ignore if this is a /start message or system message
        if (messageText.startsWith("/start")) return;

        checkUserMessage(botInstance,msg)

        // Optionally, reply to the user with their ID:
        // bot.sendMessage(msg.chat.id, `Welcome to Value at Void`);
    });

    // Handles /start with token (e.g. /start abc123)
    botInstance.onText(/\/start(?:\s(.+))?/, async (msg, match) => {

        const token = match[1]; // This will be undefined if just "/start"
        console.log(msg,token)

        startUser(botInstance,msg,token)
    })

  // You can add more handlers here (e.g., /help, callback queries, etc.)
};

export { initializeBot, bot };
