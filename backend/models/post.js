'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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