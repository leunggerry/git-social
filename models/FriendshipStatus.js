const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FriendshipStatus extends Model {}

FriendshipStatus.init(
  {
    RequesterIdStatus: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    AddresseeIdStatus: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    SpecifiedDateTime: {
      type: DataTypes.DATE,
      primaryKey: true,
      allowNull: false,
    },
    status_code: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    SpecifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // requesterId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "friendship",
    //     key: "requester_id",
    //   },
    // },
    // addresseeId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "friendship",
    //     key: "addressee_id",
    //   },
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "friendshipStatus",
  }
);

module.exports = FriendshipStatus;
