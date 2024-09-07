import mongoose from "mongoose";

const stageStatusSchema = {
  status: {
    type: String,
    enum: ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Call Pending', 'Call Scheduled', 'No Show', 'Sent', 'Not Submitted'],
    default: 'Not Assigned'
  },
  rejectionReason: {
    type: String,
    default: "N/A"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  score: {
    totalScore: {
      type: Number,
      default: 0,
    },
    remark: {
      type: String,
      default: "N/A"
    },
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
};

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
    website: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    noticePeriod: {
      type: Number,
      default: 0
    },
    currentCTC: {
      type: Number,
      default: 0
    },
    expectedCTC: {
      type: Number,
      default: 0
    },
    experience: {
      type: Number,
      required: true,
    },
    skills: {
      type: [String],
    },
    age: {
      type: Number,
      required: true,
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
      Portfolio: stageStatusSchema,
      Screening: {
        ...stageStatusSchema,
        score: {
          ...stageStatusSchema.score,
          totalScore: {
            Attitude: { type: Number, default: null, min: 0, max: 5 },
            Communication: { type: Number, default: null, min: 0, max: 5 },
            UX: { type: Number, default: null, min: 0, max: 5 },
            UI: { type: Number, default: null, min: 0, max: 5 },
            Tech: { type: Number, default: null, min: 0, max: 5 },
            Budget: { type: Number, default: null, min: 0, max: 5 }
          }
        }
      },
      "Design Task": stageStatusSchema,
      "Round 1": stageStatusSchema,
      "Round 2": stageStatusSchema
    },   
    location: {
      type: String,
      required: true,
      trim: true,
    },    
    budget: {
      type: Number,
      required: true,
    },
    rating: {
      type: String,
      enum: ["", "Good Fit", "May Be", "Not A Good Fit"]
    },
  },
  { timestamps: true }
);

export const candidates = mongoose.model("candidates", candidateSchema);