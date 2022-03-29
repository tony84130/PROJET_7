'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post)
    }
  }
  User.init({
    email: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    picture: DataTypes.STRING,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    timesTamps: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};