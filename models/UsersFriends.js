const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/**
 * @instance
 * @description Model representing the User's friends
 * @param {int} user_id - user id of the user
 * @param {int} friend_id - id of the user that is a friend
 */

class UsersFriends extends Model {}

UsersFriends.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    friend_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "usersFriends",
  }
);

module.exports = UsersFriends;
