import mongoose from "mongoose";

// Schema for question responses in job applications
const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answer: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
); // Prevents creation of _id for subdocuments

// Schema for stage status within a job application
const stageStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "Not Assigned",
        "Under Review",
        "Reviewed",
        "Cleared",
        "Rejected",
        "Pending",
        "Call Scheduled",
        "Rescheduled",
        "No Show",
        "Accepted",
        "Sent",
        "Not Submitted",
      ],
      default: "Not Assigned",
    },
    rejectionReason: {
      type: String,
      default: "N/A",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    score: {
      // Flexible field to store scores; can be an object with dynamic keys
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    feedback: {
      type: String,
      default: "N/A",
    },
    scheduledDate : {
      type : Date
    },
    currentCall: {
      scheduledDate: Date,
      scheduledTime: String,
      meetingLink: String,
    },
    callHistory: [
      {
        scheduledDate: Date,
        scheduledTime: String,
        meetingLink: String,
        status: String, // e.g., 'Scheduled', 'Completed', 'Rescheduled', 'No Show', 'Cancelled'
      },
    ],
    taskDescription: {
      // New field for Design Task
      type: String,
      default: "",
    },
    // ... (keep existing fields)
    submittedTaskLink: {
      type: String,
      default: "",
    },
    submittedComment: {
      type: String,
      default: "",
    },
    submissionDate: {
      type: Date,
    },
  },
  { _id: false }
);

// Schema for professional information at the time of application
const professionalInfoSchema = new mongoose.Schema(
  {
    website: {
      type: String,
    },
    portfolio: {
      type: String,
      required: true,
    },
    noticePeriod: {
      type: Number,
      default: 0,
    },
    currentCTC: {
      type: Number,
      default: 0,
    },
    expectedCTC: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    skills: [String],
  },
  { _id: false }
);

// Schema for individual job applications within a candidate
const jobApplicationSchema = new mongoose.Schema(
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
    jobProfile: {
      type: String,
    },
    questionResponses: [answerSchema],
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: String,
      enum: ["N/A", "Good Fit", "May Be", "Not A Good Fit"],
      default: "N/A",
    },
    currentStage: {
      type: String,
      default: "", // Will be set when the candidate applies
    },
    stageStatuses: {
      type: Map,
      of: stageStatusSchema,
      default: {},
    },
    resumeUrl: String,
    // Add professional info field to store information at time of application
    professionalInfo: professionalInfoSchema,
  },
  { _id: false }
);

// In your candidate model, add this schema
const questionnaireResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  selectedAnswer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  }
});

const questionnaireAttemptSchema = new mongoose.Schema({
  totalTimeInSeconds: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  responses: [questionnaireResponseSchema],
  attemptDate: {
    type: Date,
    default: Date.now,
  },
   // Add recording URL field
   recordingUrl: {
    type: String,
  }
});

// Main candidate schema
const candidateSchema = new mongoose.Schema(
  {
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
    profilePictureUrl: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    hasGivenAssessment: {
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
    website: {
      type: String,
    },
    resumeUrl: String,
    portfolio: {
      type: String,
      required: true,
    },
    noticePeriod: {
      type: Number,
      default: 0,
    },
    currentCTC: {
      type: Number,
      default: 0,
    },
    expectedCTC: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    skills: [String],
    jobApplications: [jobApplicationSchema], // Contains multiple job applications
    questionnaireAttempts: [questionnaireAttemptSchema],
    location: String,

    // Removed 'stage', 'status', and 'stageStatus' from the root level
  },
  { timestamps: true }
);

export const candidates = mongoose.model("candidates", candidateSchema);
