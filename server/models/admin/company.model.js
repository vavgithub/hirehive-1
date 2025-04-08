import mongoose from 'mongoose';

const companyschema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    logoUrl : {
        type: String,
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
    invited_team_members : [{
        id : String,
        name : String,
        email : String,
        role : {
          type : String,
          enum: ['Admin','Hiring Manager', 'Design Reviewer'],
        },
        invited : Boolean,
        status : {
            type : String,
            enum: ["ADDED",'INVITED','JOINED', 'REQUESTED','APPROVED'],
          },
        member_id : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          default : null
        }
    }],
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