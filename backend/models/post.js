
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      text: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      image: {
          type: DataTypes.STRING,
          allowNull: true,
      },
  });

  return Post;
};


/*
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Post.init({
    posterId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    picture: DataTypes.STRING,
    video: DataTypes.STRING,
    likers: DataTypes.INTEGER,
    comments: DataTypes.INTEGER,
    timesTamps: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
*/