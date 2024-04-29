import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        unique : true,
        lowercase : true,
        trim : true,
    },
    refreshToken : {
        type : String,
    },
} , {timestamps:true});

export const userdb = mongoose.model("user" , userSchema);
