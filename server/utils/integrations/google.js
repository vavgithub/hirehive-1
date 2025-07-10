import { google } from 'googleapis';
import axios from 'axios';

export const USE_TYPES = {
    'LOGIN/REGISTER' : 'LOGIN/REGISTER',
    'WORKSPACE' : 'WORKSPACE',
}

export const SCOPE_KEYS = {
  AUTH: "AUTH",
  VIEW_CALENDAR: "VIEW_CALENDAR",
  EDIT_CALENDAR: "EDIT_CALENDAR",
  VIEW_EVENTS: "VIEW_EVENTS",
  EDIT_EVENTS: "EDIT_EVENTS"
}

export const SCOPES = {
  "AUTH": [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ],
  "VIEW_CALENDAR": [
    "https://www.googleapis.com/auth/calendar.readonly"
  ],
  "EDIT_CALENDAR": [
    "https://www.googleapis.com/auth/calendar"
  ],
  "VIEW_EVENTS": [
    "https://www.googleapis.com/auth/calendar.events.readonly"
  ],
  "EDIT_EVENTS": [
    "https://www.googleapis.com/auth/calendar.events"
  ]
};

export const WORKSPACE_KEYS = (role) => {
    switch (role) {
        case 'Admin':
            return [SCOPE_KEYS.EDIT_CALENDAR,SCOPE_KEYS.VIEW_CALENDAR,SCOPE_KEYS.EDIT_EVENTS,SCOPE_KEYS.VIEW_EVENTS]    
        case 'Hiring Manger':
            return [SCOPE_KEYS.EDIT_CALENDAR,SCOPE_KEYS.VIEW_CALENDAR,SCOPE_KEYS.EDIT_EVENTS,SCOPE_KEYS.VIEW_EVENTS]  
        case 'Design Reviewer':
            return [SCOPE_KEYS.VIEW_CALENDAR,SCOPE_KEYS.VIEW_EVENTS]    
        default:
            break;
    }
}

export const getRoleBasedScopes = (role) => {
    switch (role) {
        case 'Admin':
            return [...SCOPES.EDIT_CALENDAR,...SCOPES.VIEW_CALENDAR,...SCOPES.VIEW_EVENTS,...SCOPES.EDIT_EVENTS]
        case 'Hiring Manager':
            return [...SCOPES.EDIT_CALENDAR,...SCOPES.VIEW_CALENDAR,...SCOPES.VIEW_EVENTS,...SCOPES.EDIT_EVENTS]
        case 'Design Reviewer':
            return [...SCOPES.VIEW_CALENDAR,...SCOPES.VIEW_EVENTS]
        default:
            return []
    }
}

export const checkScopes = (receivedScopes) => {
    const allowedScopes = [];

    for (const [key, requiredScopes] of Object.entries(SCOPES)) {
        const allPresent = requiredScopes.every(scope => receivedScopes.includes(scope));
        if (allPresent) {
        allowedScopes.push(key);
        }
    }

    return allowedScopes;
}

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

export const getAccessOauthClient = async (token,saveTokenCallback) => {
    const  CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const  REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    );
    oauth2Client.setCredentials({ access_token: token });

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

    // Now use oauth2Client to fetch user info
    const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
    });

    return oauth2
}

export const getAuthorizedOauthClient = async (token,saveTokenCallback) => {
    const  CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const  REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    );
    oauth2Client.setCredentials({ refresh_token: token });

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

export const revokeOauthClient = async (refreshToken) => {
  try {
    const params = new URLSearchParams();
    params.append('token', refreshToken);

    const result = await axios.post(
      'https://oauth2.googleapis.com/revoke',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (result.status === 200) {
      return true;
    } else {
      console.error('Unexpected status:', result.status);
      return false;
    }
  } catch (err) {
    console.error('Token revocation failed:', err.response?.data || err.message);
    return false;
  }
};

export const getUserInfoClient = async (oauth2Client) => {
    // Now use oauth2Client to fetch user info
    const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
    });

    return oauth2
}

export const getCalendarClient = async (oauth2Client) => {
    const oauth2 = google.calendar({
    auth: oauth2Client,
    version: 'v3',
    });

    return oauth2
}

export const getAuthorizationUrl = async (sessionState,scopes = []) => {
    try {
        const  CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
        const  REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT

        const oauth2Client = getOauthClient()

        if(!scopes || scopes?.length === 0){
            throw new Error('No scopes found for authorization')
        }
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

export const getUserInfo = async (googleClient) => {
    try {
        const response = await googleClient?.userinfo?.get();
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function createMeetEvent(calendar, eventDetails) {
  if (!calendar) {
    throw new Error('No Google Calendar client found.');
  }

  try {
    const event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startDateTime, // ISO string
        timeZone: eventDetails.timeZone,
      },
      end: {
        dateTime: eventDetails.endDateTime,
        timeZone: eventDetails.timeZone,
      },
      attendees: eventDetails.attendees.map(email => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: 'meet-' + Date.now(), // Must be unique
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Sends email invites to attendees
    });

    const createdEvent = response.data;
    const meetLink = createdEvent.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === 'video'
    )?.uri;

    return {
      eventId : createdEvent.id,
      joinLink: meetLink,              // Google Meet joining link
    };
  } catch (error) {
    console.error('Failed to create Meet event:', error.message);
    throw new Error('Unable to create Google Meet event. Please try again later.');
  }
}


export async function cancelMeetEvent(calendar, eventId) {
  if (!calendar) {
    throw new Error('No Google Calendar client found.');
  }
  try {
    await calendar.events.delete({
      calendarId: 'primary', // or the specific calendar ID
      eventId: eventId,
      sendUpdates: 'all' // optionally notify attendees
    });

    console.log('Event successfully canceled.');
  } catch (error) {
    console.error('Failed to cancel event:', error.response?.data || error.message);
    throw new Error('Could not cancel the event.');
  }
}