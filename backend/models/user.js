
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          default: 0,
      },
      avatar: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });
  return User;
};

/*
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
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
*/