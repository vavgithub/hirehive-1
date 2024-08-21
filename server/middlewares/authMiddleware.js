import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {User} from '../models/admin/user.model.js';

const JWT_SECRET = 'your_jwt_secret';  // Store this in environment variables in production

export const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        throw new ApiError(401, 'Invalid token');
      }
  
      req.user = user;  // This line is crucial
      next();
    } catch (error) {
      throw new ApiError(401, 'Invalid token');
    }
  });