import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";    
import cookieParser from "cookie-parser";

import jobRoutes from './routes/jobs.router.js';
import userRoutes from './routes/user.router.js';
import candidateRoutes from './routes/candidate/candidate.router.js';
import { addCandidates } from "./utility/addCandidates.js";
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // specify the frontend origin
    credentials: true, // allow credentials
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(morgan('dev'))

app.use("/api" , jobRoutes);
// app.use('/api/users', userRoutes);
app.use("/api/v1/users", userRoutes)
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

    res.send("Welcome to Job Portal API")
})


