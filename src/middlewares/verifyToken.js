const jwt = require('jsonwebtoken');
const {userModel}=require("../models/userModel");

const verifyToken = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];

    // Get token from cookies
    const tokenFromCookies = req.cookies.accessToken;

    // Use token from header if available, otherwise use token from cookies
    const token = tokenFromHeader || tokenFromCookies;

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = verifyToken;
