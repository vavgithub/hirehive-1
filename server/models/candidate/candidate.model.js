// models/candidate.js

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
    status: {
      type: String,
      enum: ["Portfolio", "Screening", "Design Task", "Round 1", "Round 2", "Hired"],
      default: "Portfolio",
    },
    stage: {
      type: String,
      default: "N/A",
    },
    experience: {
      type: Number,
      required: true,
    },
    latestScore: {
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
  },
  { timestamps: true }
);

export const candidates = mongoose.model("candidates", candidateSchema);
