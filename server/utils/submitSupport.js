import axios from "axios";

export const submitToGoogleSheets = async (data) => {
  try {
    const params = {
      name: data.name,
      email: data.email,
      message: data.message,
      screenshotUrl: data.screenshotUrl || '',
      timestamp: data.timestamp
    };

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    const response = await axios.get(GOOGLE_SCRIPT_URL, { params });

    // Optional: log response for debugging
    console.log('Google Sheets response:', response.data);

    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error.message);
    throw new Error('Failed to submit form');
  }
};