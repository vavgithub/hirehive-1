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
    geoLocation : {
      type : {
        type : String,
      },
      coordinates : {
        type : [Number],
      },
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
    },
    multiReviewerSettings: {
        enabled: {
            type: Boolean,
            default: false,
        },
        jobProfiles: {
            type: [String],
            default: [],
        },
    },
    subscription: {
        stripeCustomerId: {
            type: String,
            default: null
        },
        stripeSubscriptionId: {
            type: String,
            default: null
        },
        plan: {
            type: String,
            enum: ['free', 'trial', 'pro', 'enterprise'],
            default: 'free'
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'past_due', 'canceled'],
            default: 'active'
        },
        trialEndsAt: {
            type: Date,
            default: null
        },
        currentPeriodEnd: {
            type: Date,
            default: null
        },
        seatCount: {
            type: Number,
            default: 0
        },
        billingInterval: {
            type: String,
            enum: ['monthly', 'yearly'],
            default: 'monthly'
        },
        cancelAtPeriodEnd: {
            type: Boolean,
            default: false
        },
        // When a paid (Pro) subscription ends, the workspace keeps access until
        // this date so the user can review/export/back up data before moving to Free.
        dataRetentionEndsAt: {
            type: Date,
            default: null
        }
    },
}, { timestamps: true })

// Create geospatial index
companyschema.index({ geoLocation: '2dsphere' });

export const Company = mongoose.model('Company', companyschema);