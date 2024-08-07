import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    jobApplied: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    assignees: {
      "Portfolio": {
        type: String,
        default: "N/A",
      },
      "Screening": {
        type: String,
        default: "N/A",
      },
      "Design Task": {
        type: String,
        default: "N/A",
      },
      "Round 1": {
        type: String,
        default: "N/A",
      },
      "Round 2": {
        type: String,
        default: "N/A",
      },
    },
    stage: {
      type: String,
      enum: ["Portfolio", "Screening", "Design Task", "Round 1", "Round 2", "Hired"],
      default: "Portfolio",
    },
    status: {
      type: String,
      default: "N/A",
    },
    stageStatus: {
      Portfolio: {
        status: {
          type: String,
          enum: ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'],
          default: 'Not Assigned'
        },
        rejectionReason:{
          type: String,
          default:"N/A"
        },
        assignee: {
          type: String,
          default: 'N/A'
        },
        score: {
          totalScore:{
            type:Number,
            default: 0,
          },
          remark:{
            type:String,
            default:"N/A"
          },
        },
      },
      Screening: {
        status: {
          type: String,
          enum: ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
          default: 'Call Pending'
        },
        rejectionReason:{
          type: String,
          default:"N/A"
        },
        assignee: {
          type: String,
          default: 'N/A'
        },
        currentCall: {
          scheduledDate: Date,
          scheduledTime: String,
          meetingLink: String
        },
        callHistory: [{
          scheduledDate: Date,
          scheduledTime: String,
          meetingLink: String,
          status: String // 'Scheduled', 'Completed', 'Rescheduled', 'No Show'
        }],     
        score: {
          remark:{
            type:String,
            default:"N/A"
          },
          totalScore:{
            Attitude:{
              type:Number,
              default:null,
              min:0,
              max:5
            },
            Communication:{
              type:Number,
              default:null,
              min:0,
              max:5
            },
            UX:{
              type:Number,
              default:null,
              min:0,
              max:5
            },
            UI:{
              type:Number,
              default:null,
              min:0,
              max:5
            },
            Tech:{
              type:Number,
              default:null,
              min:0,
              max:5
            },
            Budget:{
              type:Number,
              default:null,
              min:0,
              max:5
            }          
          },
        }
      },
      "Design Task": {
        status: {
          type: String,
          enum: ['Sent', 'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'],
          default: 'Not Assigned'
        },
        rejectionReason:{
          type: String,
          default:"N/A"
        },
        assignee: {
          type: String,
          default: 'N/A'
        },
        score: {
          type: Number,
          default: 0
        }
      },
      "Round 1": {
        status: {
          type: String,
          enum: ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
          default: 'Call Pending'
        },
        rejectionReason:{
          type: String,
          default:"N/A"
        },
        assignee: {
          type: String,
          default: 'N/A'
        },
        currentCall: {
          scheduledDate: Date,
          scheduledTime: String,
          meetingLink: String
        },
        callHistory: [{
          scheduledDate: Date,
          scheduledTime: String,
          meetingLink: String,
          status: String // 'Scheduled', 'Completed', 'Rescheduled', 'No Show'
        }],     
        score: {
          totalScore:{
            type:Number,
            default: 0,
          },
          remark:{
            type:String,
            default:"N/A"
          },
        },
      },
      "Round 2": {
        status: {
          type: String,
          enum: ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
          default: 'Call Pending'
        },
        rejectionReason:{
          type: String,
          default:"N/A"
        },
        assignee: {
          type: String,
          default: 'N/A'
        },
        currentCall: {
          scheduledDate: Date,
          scheduledTime: String,
          meetingLink: String
        },
        callHistory: [{
          scheduledDate: Date,
          scheduledTime: String,
          meetingLink: String,
          status: String // 'Scheduled', 'Completed', 'Rescheduled', 'No Show'
        }],     
        score: {
          totalScore:{
            type:Number,
            default: 0,
          },
          remark:{
            type:String,
            default:"N/A"
          },
        },
      }
    },
    noticePeriod : {
      type: Number,
      default:0
    },

    currentCTC : {
      type: Number,
      default:0
    },

    expectedCTC : {
      type: Number,
      default:0
    },
    
    experience: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    rating: {
      type: String,
      enum: ["", "Good Fit", "May Be", "Not A Good Fit"]
    }
  },
  { timestamps: true }
);

export const candidates = mongoose.model("candidates", candidateSchema);