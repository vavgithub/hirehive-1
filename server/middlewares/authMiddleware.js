import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/admin/user.model.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies?.jwt) {
        try {
            token = req.cookies.jwt;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const roleProtect = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403);
            throw new Error('Not authorized');
        }
    };
};

export { protect, roleProtect };
