const jwt = require('jsonwebtoken');

exports.check = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    console.error('No authorization header provided');
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    console.error('Invalid authorization format:', type);
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    console.log('Token verified for user:', decoded.username);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};