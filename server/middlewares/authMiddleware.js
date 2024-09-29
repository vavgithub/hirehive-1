import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/admin/user.model.js';
import { candidates as Candidate } from '../models/candidate/candidate.model.js';

console.log("this is middlewares",process.env.JWT_SECRET)

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  });

const roleProtect = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403);
            throw new Error('Not authorized for the desired role');
        }
    };
};

const protectCandidate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find candidate by ID
    const candidate = await Candidate.findById(decoded.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    req.candidate = candidate;
    next();
  } catch (error) {
    console.error('Error in protectCandidate middleware:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


export { protect, roleProtect , protectCandidate};
