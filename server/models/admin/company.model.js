import mongoose from 'mongoose';

const customScreeningSchema = new mongoose.Schema(
    {
        defaultKey : {
            type : String
        },
        customKey : {
            type : String
        },
        description : {
            type : String
        }
    }
)

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
    about : {
        type: String,
        trim: true,
    },
    website : {
        type: String,
        trim: true,
    },
    founded : {
        type: String,
        trim: true,
    },
    assessmentAccess : {
        type : String,
        enum : ['ALLOWED','DENIED']
    },
    focusAreas : [String],
    invited_team_members : [{
        id : String,
        // name : String,
        firstName : String,
        lastName : String,
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
    },
    customScreeningParam : {
        type : Map,
        of : [customScreeningSchema],
        default : {}
    }
}, { timestamps: true })

export const Company = mongoose.model('Company', companyschema);