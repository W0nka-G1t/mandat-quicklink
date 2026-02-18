const sequelize = require('../database');
const defineUser = require('../models/user');
const User = defineUser(sequelize);

exports.has = (requiredRole) => async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      console.error(`User not found with ID: ${req.user.userId}`);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log(`CheckPermission: User ${user.username} has role ${user.role}, requires ${requiredRole}`);
    
    if (user.role !== requiredRole) {
      return res.status(403).json({ error: `Requires ${requiredRole} role (you have ${user.role})` });
    }
    next();
  } catch (err) {
    console.error('CheckPermission error:', err.message);
    res.status(500).json({ error: 'Permission check failed' });
  }
};