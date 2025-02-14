import mongoose from 'mongoose';

const companyschema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    size : {
        type: String,
        required: true,
        trim: true,
    },
    location : {
        type: String,
        required: true,
        trim: true,
    },
    industryType : {
        type: String,
        required: true,
        trim: true,
    },
    registeredBy : {
        user_id : {
            type: String,
            required: true,
        },
        name : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
        }
    }
}, { timestamps: true })

export const Company = mongoose.model('Company', companyschema);