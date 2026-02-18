const sequelize = require('../common/database');
const defineUser = require('../common/models/user');
const User = defineUser(sequelize);

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, data: user });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt']
    });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role. Must be user or admin.' });
    }
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Prevent demoting the last admin
    if (role === 'user' && user.role === 'admin') {
      const adminCount = await User.count({ where: { role: 'admin' } });
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, error: 'Cannot demote the last admin' });
      }
    }
    
    user.role = role;
    await user.save();
    
    res.json({ 
      success: true, 
      message: `User ${user.username} role updated to ${role}`,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Prevent deleting the last admin
    if (user.role === 'admin') {
      const adminCount = await User.count({ where: { role: 'admin' } });
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, error: 'Cannot delete the last admin' });
      }
    }
    
    const username = user.username;
    await user.destroy();
    
    res.json({ 
      success: true, 
      message: `User ${username} has been deleted`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
