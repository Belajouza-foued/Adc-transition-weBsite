const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
//forgot//
const dotenv = require('dotenv');
dotenv.config();
//forgot//
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { userId: ... }
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
