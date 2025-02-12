//otp.js

// Store OTPs in memory (in production, use Redis or similar)
export const otpStore = new Map();

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
