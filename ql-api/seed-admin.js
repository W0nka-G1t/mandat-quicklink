const crypto = require('crypto');
const sequelize = require('./common/database');
const defineUser = require('./common/models/user');

const encryptPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

const seedAdminUser = async () => {
  try {
    await sequelize.sync();
    
    const User = defineUser(sequelize);
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ where: { username: 'admin.Gro' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      await sequelize.close();
      return;
    }

    // Create admin user
    const admin = await User.create({
      username: 'admin.Gro',
      email: 'admin@quicklink.com',
      password: encryptPassword('ADMIN.click'),
      role: 'admin'
    });

    console.log('✓ Admin user created successfully!');
    console.log('Username: admin.Gro');
    console.log('Email: admin@quicklink.com');
    console.log('Role: admin');
    
    await sequelize.close();
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
};

seedAdminUser();
