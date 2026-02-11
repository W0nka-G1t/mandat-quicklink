const express = require('express');
const path = require('path');
const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

const sequelize = require('./common/database');
const defineUser = require('./common/models/user');
const defineLink = require('./common/models/link');
const User = defineUser(sequelize);
const Link = defineLink(sequelize);

// Initialiser la base de données et demarrer le serveur
sequelize.sync().then(() => {
  const authRoutes = require('./authorization/routes');
  app.use('/', authRoutes);
  const linkRoutes = require('./link/routes');
  app.use('/link', linkRoutes);
  const userRoutes = require('./users/routes');
  app.use('/user', userRoutes);
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: 'Something went wrong'
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Database sync failed:', err);
  process.exit(1);
});
         