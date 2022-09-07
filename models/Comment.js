const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/**
 * @description Model representing the Comment table
 * @param {int} id - auto-incrementing id for the comment table
 * @param {string} comment_text - user input comment for the comment for a post
 * @param {int} user_id - user id of the comment author
 * @param {int} post_id - post id referencing the comment of the post is meant for
 */
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
