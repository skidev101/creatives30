const admin = require('firebase-admin');

const verifyIdToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { 
      uid: decoded.uid,
      email: decoded.email || req.body.email 
    };
    next(); 
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyIdToken;