const { DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../config/database');
// class Users extends Model {}

// Users.init({
const Users = sequelize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users',
  timestamps: false,
});

module.exports = Users;
