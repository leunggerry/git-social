const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/**
 * @description Model representing the Friendship table
 * @param {int} requesterId - user id of the user sending the friend request
 * @param {int} addresseeId - user id of the user receiving the friend request
 * @param {string} statusCode - the status of the friend request
 * @default ["R"]
 * @param {Date} requestedDateTime - the date of the request is sent
 */
class Friendship extends Model {}

Friendship.init(
  {
    requesterId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    addresseeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "R",
    },
    requestedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
    // requesterId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "User",
    //     key: "id",
    //   },
    // },
    // addresseeId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "User",
    //     key: "id",
    //   },
    // },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "friendship",
  }
);

module.exports = Friendship;
