const crypto = require('crypto');
const sequelize = require('./common/database');
const defineUser = require('./common/models/user');

const encryptPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

const createNewAdmin = async (username, password) => {
  try {
    await sequelize.sync();
    
    const User = defineUser(sequelize);
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    
    if (existingUser) {
      console.log(`✗ User ${username} already exists!`);
      if (existingUser.role === 'admin') {
        console.log(`  (Already an admin)`);
      } else {
        console.log(`  (Current role: ${existingUser.role})`);
      }
      await sequelize.close();
      return;
    }

    // Create new admin user
    const admin = await User.create({
      username: username,
      email: `${username}@quicklink.com`,
      password: encryptPassword(password),
      role: 'admin'
    });

    console.log('✓ New admin user created successfully!');
    console.log(`  Username: ${username}`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Password: ${password}`);
    console.log(`  Role: admin`);
    
    await sequelize.close();
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
};

// Get username and password from command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node create-admin.js <username> <password>');
  console.log('Example: node create-admin.js myadmin MyPassword123');
  process.exit(1);
}

const username = args[0];
const password = args[1];

createNewAdmin(username, password);
