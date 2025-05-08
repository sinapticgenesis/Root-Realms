const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log('Incoming auth header:', authHeader); // <== log it
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Missing or malformed token');
        return res.status(401).json({ message: 'Missing or malformed token' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token decoded:', decoded); // <== log user data
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Token verification failed:', err);
        return res.status(401).json({ message: 'Token verification failed' });
    }
}

function verifyTokenOptional(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
      } catch (err) {
         req.user = null; // invalid token, but continue unauthenticated
      }
    } else {
        req.user = null;
    }
  
    next();
}

module.exports = { verifyToken, verifyTokenOptional };
