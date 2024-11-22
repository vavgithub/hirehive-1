const environments = {
  development: {
    PORT: 8008,
    CORS_ORIGIN: "http://localhost:8008", // Note: Consider restricting this in staging/production
    DATABASE_URL:"mongodb+srv://vevaaratvav:FOWCVU944K1Lj49Y@cluster0.wgbqmbj.mongodb.net/HireHive?retryWrites=true&w=majority&appName=Cluster0DATABASE_NAME = HireHive",
    LOG_LEVEL: "debug",
    UPLOAD_DIR: "./uploads/dev",
  },
  staging: {
    PORT: process.env.PORT || 8008,
    CORS_ORIGIN: "https://stage.hire.atvoid.com", // Update with your staging domain
    LOG_LEVEL: "info",
    DATABASE_URL:"mongodb+srv://vevaaratvav:FOWCVU944K1Lj49Y@cluster0.wgbqmbj.mongodb.net/HireHive?retryWrites=true&w=majority&appName=Cluster0DATABASE_NAME = HireHive",
    UPLOAD_DIR: "./uploads/staging",
  },
  production: {
    PORT: process.env.PORT || 8008,
    CORS_ORIGIN: "https://hire.atvoid.com/", // Update with your production domain
    DATABASE_URL:
      "mongodb+srv://vevaar:vevaar@vavprodcluster.lwurg.mongodb.net/?retryWrites=true&w=majority&appName=VAVProdCluster",
    LOG_LEVEL: "error",
    UPLOAD_DIR: "./uploads/prod",
  },
};

export const getEnvironmentConfig = (environment) => {
  return environments[environment] || environments.development;
};

export const validateEnvVariables = () => {
  const requiredVars = [
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
