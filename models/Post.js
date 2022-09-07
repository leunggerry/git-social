const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/**
 *
 * @description Model representing the Post table
 * @param {int} id - Auto incrementing ID for each post in the table
 * @param {int} title - Title of the post
 * @param {string} text_body - Description of the post
 * @param {Date} repo_name - Name of the repository
 * @param {Date} github_repo_url - Repo URL
 * @param {Date} user_id - User ID of the post author
 *              @see User
 */
class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    text_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repo_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    github_repo_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
