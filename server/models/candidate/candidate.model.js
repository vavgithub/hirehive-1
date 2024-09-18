import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

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


const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  jobApplied: {
    type: String,
    required: true,
  },
  questionResponses: [answerSchema],
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields relevant to a job application
});


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
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure uniqueness
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure uniqueness
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otpExpires: Date,
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
    website: {
      type: String,
    },
    portfolio: {
      type: String,
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
    skills: {
      type: [String],
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
    jobApplications: [jobApplicationSchema], // New field to store multiple job applications   
    location: {
      type: String,
    },    
    rating: {
      type: String,
      enum: ["", "Good Fit", "May Be", "Not A Good Fit"]
    },
    questionResponses: [answerSchema],
  },
  { timestamps: true }
);

export const candidates = mongoose.model("candidates", candidateSchema);