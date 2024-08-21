import jwt from 'jsonwebtoken';
import {User} from '../../models/admin/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const JWT_SECRET = 'your_jwt_secret';  // Store this in environment variables in production

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json(new ApiResponse(201, { user, token }, 'User registered successfully'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

  res.json(new ApiResponse(200, { user, token }, 'Login successful'));
});