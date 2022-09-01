const User = require("./User");
const Post = require("./Post");
const Friendship = require("./Friendship");
const UsersFriends = require("./UsersFriends");

/* User, Post relationships 
START=================================================================================*/
User.hasMany(Post, {
  foreignKey: "user_id",
}); // one-to-many relationship

Post.belongsTo(User, {
  foreignKey: "user_id",
}); // one-to-one relationship

User.belongsToMany(Post, {
  through: "ThroughTable", // through table
}); // many-to-many relationship

Post.belongsToMany(User, {
  through: "ThroughTable", // through table
}); // many-to-many relationship

/* END===============================
=================================================================================*/

/* User, UsersFriends relationships 
START=================================================================================*/
User.hasMany(Friendship, {
  // as: "friend_requests",
  foreignKey: "requester_id",
});
User.hasMany(Friendship, {
  foreignKey: "addressee_id",
});

Friendship.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(User, {
  as: "friends",
  foreignKey: "user_id",
  through: "UsersFriends", // through table
}); // many-to-many relationship

User.belongsToMany(User, {
  as: "userFriends",
  foreignKey: "friend_id",
  through: "UsersFriends", // through table
}); // many-to-many relationship

UsersFriends.belongsTo(User); // one-to-one relationship

/* END===============================
=================================================================================*/

module.exports = { User, Post, Friendship, UsersFriends };
