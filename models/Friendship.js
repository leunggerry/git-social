const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
