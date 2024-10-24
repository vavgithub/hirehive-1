// user.model.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Hiring Manager', 'Design Reviewer'],
    required: true,
  },
  profilePicture: {
    type: String,
    default: null
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  assignedCandidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidates'
  }]
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare plaintext password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);

