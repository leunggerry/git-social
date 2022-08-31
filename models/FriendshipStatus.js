const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FriendshipStatus extends Model {}

FriendshipStatus.init(
  {
    RequesterStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    AddresseeStatusId: {
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
    requesterId: {
      // TODO: this should be a FK in Friendship table
      // TODO: ON DELETE & UPDATE automatically set to RESTRICT.
      //       - Explore how to up these to CASCADE and SET NULL
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: "friendship",
        key: "requester_id",
      },
    },
    addresseeId: {
      // TODO: this should be a FK in Friendship table
      // TODO: ON DELETE & UPDATE automatically set to RESTRICT.
      //       - Explore how to up these to CASCADE and SET NULL
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: "friendship",
        key: "addressee_id",
      },
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
