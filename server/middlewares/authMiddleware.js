import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/admin/user.model.js';
import { candidates as Candidate } from '../models/candidate/candidate.model.js';
import { getEnvironmentConfig } from '../config/environments.js';

// Load environment-specific configuration
const environment = process.env.NODE_ENV || "development";
dotenv.config({
  path: `.env.${environment}`
});

// Get environment config
const envConfig = getEnvironmentConfig(environment);

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error(`Token verification failed: ${error.message}`);
    return null;
  }
};

const getTokenFromRequest = (req) => {
  // Check for token in cookies
  if (req.cookies.jwt) {
    return req.cookies.jwt;
  }
  
  // Check for token in Authorization header
  if (req.headers.authorization?.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  
  return null;
};

const protect = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ 
      status: 'error',
      message: 'Not authorized, no token provided'
    });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid or expired token'
      });
    }

    // Get user and exclude password
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        status: 'error',
        message: 'User not found'
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      status: 'error',
      message: 'Authentication failed',
      error: environment === 'development' ? error.message : undefined
    });
  }
});

const roleProtect = (roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error',
        message: 'User not authenticated'
      });
    }

    // Allow single role or array of roles
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error',
        message: `Role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  });
};

const protectCandidate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      status: 'error',
      message: 'Not authorized, token missing'
    });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid or expired token'
      });
    }

    const candidate = await Candidate.findById(decoded.id);

    if (!candidate) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Candidate not found'
      });
    }

    req.candidate = candidate;
    next();
  } catch (error) {
    console.error('Candidate authentication error:', error);
    res.status(401).json({ 
      status: 'error',
      message: 'Authentication failed',
      error: environment === 'development' ? error.message : undefined
    });
  }
});

// Optional: Add refresh token functionality
const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ 
      status: 'error',
      message: 'Refresh token not found'
    });
  }

  try {
    const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid or expired refresh token'
      });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Set new access token in cookie
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: environment !== 'development',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    next();
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      status: 'error',
      message: 'Token refresh failed',
      error: environment === 'development' ? error.message : undefined
    });
  }
});

export { 
  protect, 
  roleProtect, 
  protectCandidate,
  refreshToken 
};