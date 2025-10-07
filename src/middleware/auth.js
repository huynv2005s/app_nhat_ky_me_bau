// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(400).json({ message: 'Invalid Authorization header format. Use: Bearer <token>' });
    }

    const token = parts[1];

    jwt.verify(token, "my-app", (err, decoded) => {
        // if (err) {
        //     return res.status(401).json({ message: 'Invalid or expired token' });
        // }
        // bạn có thể gán thông tin user vào req
        req.user = { id: decoded.id, email: decoded.email };
        next();
    });
};

module.exports = { verifyToken };
