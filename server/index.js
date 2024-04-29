import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors";    
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}));

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

connectDB().then(()=>{
    app.listen( process.env.PORT ||  3000, ()=>{
        console.log("Server is running on port 3000")
    });
    app.on("error", (error)=>{
        console.log("Error in starting server", error)
    });
}).catch((error)=>{
    console.log(error)
});