const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
