const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Link', {
    originalUrl: { type: DataTypes.STRING, allowNull: false },
    shortCode: { type: DataTypes.STRING, allowNull: false, unique: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    clicks: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
