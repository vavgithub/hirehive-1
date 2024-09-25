import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from '../../models/admin/user.model.js';
import generateToken from '../../utils/generateToken.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict", 
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};



// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, cookieOptions);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Authenticate User
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, cookieOptions);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export const getAvailableDesignReviewers = async (req, res) => {
    try {
      const allReviewers = await User.find({ 
        role: 'Design Reviewer'
      }).select('_id name email isAvailable'); // Include _id and isAvailable
  
      res.status(200).json({ 
        success: true, 
        data: allReviewers 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching design reviewers', 
        error: error.message 
      });
    }
  };

 
