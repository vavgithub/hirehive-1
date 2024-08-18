import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";    
import cookieParser from "cookie-parser";

import jobRoutes from './routes/admin/jobs.router.js';
import candidateRoutes from './routes/candidate/candidate.router.js';
const app = express();

const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173', // Vite's default development server
        'http://localhost:4173', // Vite's default preview server
        'https://hirehive-steel.vercel.app/' // Replace with your actual production domain
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable if you're using cookies or authentication
    optionsSuccessStatus: 200
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(morgan('dev'))

app.use("/api/v1" , jobRoutes);
app.use("/api/v1/candidates",candidateRoutes )

connectDB().then(()=>{
    app.listen( process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)

    });
    app.on("error", (error)=>{
        console.log("Error in starting server", error)
    });
}).catch((error)=>{
    console.log(error)
});

app.get("/", (req, res)=>{
    res.send("Welcome to HireHive Job Portal API")
})


