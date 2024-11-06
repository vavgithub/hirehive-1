const getCorsOrigin = (environment) => {
    switch (environment) {
      case 'development':
        return ['http://localhost:5173', 'http://localhost:8008'];
      case 'staging':
        return ['https://staging.antiquerustleatherbags.com'];
      case 'production':
        return ['https://antiquerustleatherbags.com', 'https://hirehive-1-lmln.onrender.com'];
      default:
        return ['http://localhost:5173'];
    }
  };
  
  const corsConfig = (environment) => {
    return {
      origin: function (origin, callback) {
        const allowedOrigins = getCorsOrigin(environment);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204
    };
  };
  
  export default corsConfig;