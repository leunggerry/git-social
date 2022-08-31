const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friendship extends Model {}

Friendship.init(
  {
    requester_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    addressee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
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
