// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class FriendshipStatus extends Model {}

// FriendshipStatus.init(
//   {
//     requester_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//     },
//     addressee_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//     },
//     specified_date_time: {
//       type: DataTypes.DATE,
//       primaryKey: true,
//       allowNull: false,
//     },
//     status_code: {
//       type: DataTypes.STRING(1),
//       allowNull: false,
//       references: {
//         model: "my_status",
//         key: "status_code",
//       },
//     },
//     specifier_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     requesterId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "friendship",
//         key: "requester_id",
//         requesterId: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           references: {
//             model: "user",
//             key: "id",
//           },
//         },
//         addresseeId: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           references: {
//             model: "user",
//             key: "id",
//           },
//         },
//       },
//     },
//     // addresseeId: {
//     //   type: DataTypes.INTEGER,
//     //   references: {
//     //     model: "friendship",
//     //     key: "addressee_id",
//     //   },
//     // },
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "friendshipStatus",
//   }
// );

// module.exports = FriendshipStatus;
