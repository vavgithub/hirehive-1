import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    location : {
        type : String,
        required : [true , "loc is required"],
        lowercase : true,
        trim : true,
    },
    category : {
        type : String,
        required : [true , "cat is required"],
        lowercase : true,
        trim : true,
    },
    description : {
        type : String,
        required : [true , "des is required"],
    },
    overview : {
        type : String,
        required : [true , "overview is required"],
        lowercase : true,
        trim : true,
    },
    requirements : {
            type : String,
            required : [true , "req is required"],
            lowercase : true,
            trim : true,
        }
} , {timestamps:true});

export const jobs = mongoose.model("jobs" , jobSchema);