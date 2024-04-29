import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    description : {
        type : String,
        required : [true , "Description is required"],
        unique : true,
        lowercase : true,
        trim : true,
    },
    location : {
        type : String,
        required : [true , "Location is required"],
        lowercase : true,
        trim : true,
    },
    salary : {
        type : Number,
        required : [true , "Salary is required"],
    },
    company : {
        type : String,
        required : [true , "Company is required"],
        lowercase : true,
        trim : true,
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true,
        lowercase : true,
        trim : true,
    },
} , {timestamps:true});