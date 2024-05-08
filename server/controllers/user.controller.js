// user.controller.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import{ User} from '../models/admin/user.model.js';

// Register a new user
const registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        
        // Check if user already exists
        const user = await User.findOne({ email});
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        
        // Create a new user instance
        const newUser = new User({ email, password: hashedPassword });
        
        // jwt token generation
        const token = jwt.sign({ email: newUser.email, id:newUser._id } , 'test' , { expiresIn: "1h"});
        
        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ message: "User registered successfully" , accessToken: token , user: savedUser , success: true});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, id:user._id } , 'test' , { expiresIn: "1h"});

        res.status(200).json({ message: "Login successful" , accessToken: token , user: user , success: true});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerUser, loginUser };
