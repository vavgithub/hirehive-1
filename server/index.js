import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";    
import cookieParser from "cookie-parser";

import jobRoutes from './routes/jobs.js';
import userRoutes from './routes/user.js';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}));

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(morgan('dev'))

app.use("/api" , jobRoutes);
app.use('/api/users', userRoutes);

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


