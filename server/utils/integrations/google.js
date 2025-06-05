import { google } from 'googleapis';
import { randomBytes } from 'crypto'

const getOauthClient = () => {
    const  CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const  REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    );

    return oauth2Client
}

export const getAuthorizedOauthClient = (saveTokenCallback) => {
    const  CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const  REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    );

    oauth2Client.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
            // store the refresh_token in my database!
            if(typeof saveTokenCallback === 'function'){
                console.log("SAVING")
                saveTokenCallback(tokens.refresh_token)
            }
            console.log('REFRESH : ',tokens.refresh_token);
        }
    });

    return oauth2Client
}

export const getAuthorizationUrl = async (sessionState) => {
    try {
        const  CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
        const  REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT

        const oauth2Client = getOauthClient()

        const scopes = [
            'https://www.googleapis.com/auth/calendar.readonly'
        ];

        // Generate a url that asks permissions for the Drive activity and Google Calendar scope
        const authorizationUrl = oauth2Client.generateAuthUrl({
            client_id : CLIENT_ID,
            redirect_uri : REDIRECT_URL,
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            /** Pass in the scopes array defined above.
                * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
            scope: scopes,
            prompt : 'consent',
            // Enable incremental authorization. Recommended as a best practice.
            include_granted_scopes: true,
            // Include the state parameter to reduce the risk of CSRF attacks.
            state: sessionState
        });
        return { authorizationUrl }
    } catch (error) {
        throw new Error(error?.message)
    }
}

export const getOAuthTokens = async (code) => {
    const oauth2Client = getOauthClient();
    let { tokens } = await oauth2Client.getToken(code);
    return tokens
}