// config/environments.js
const environments = {
  development: {
    PORT: 8008,
    CORS_ORIGIN: "http://localhost:8008",
    LOG_LEVEL: "debug",
    UPLOAD_DIR: "./uploads/dev",
    DATABASE_URL :`vevaaratvav:FOWCVU944K1Lj49Y@cluster0.wgbqmbj.mongodb.net/HireHive?retryWrites=true&w=majority&appName=Cluster0DATABASE_NAME = HireHive`
 
  },
  staging: {
    PORT: process.env.PORT || 8008,
    CORS_ORIGIN: "https://stage.hire.atvoid.com",
    LOG_LEVEL: "info",
    UPLOAD_DIR: "./uploads/staging",
  },
  production: {
    PORT: process.env.PORT || 8008,
    CORS_ORIGIN: "https://hire.atvoid.com",
    LOG_LEVEL: "error",
    UPLOAD_DIR: "./uploads/prod",
  },
};

export const getEnvironmentConfig = (environment) => {
  // Get base configuration for the environment
  const baseConfig = environments[environment] || environments.development;
  
  // Merge with environment-specific variables from .env files
  console.log(baseConfig);
  return {
    ...baseConfig,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME
    // Add other environment-specific variables
  };
};


export const validateEnvVariables = () => {
  const requiredVars = [
    "DATABASE_URL",
    "JWT_SECRET",
    "OTP_EMAIL",
    "OTP_EMAIL_CRED",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "EMAIL_SERVICE",
    "EMAIL_USER",
    "EMAIL_PASS",
    "EMAIL_FROM_NAME",
    "EMAIL_FROM_ADDRESS",
  ];

  const missingVars = requiredVars.filter((variable) => !process.env[variable]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};