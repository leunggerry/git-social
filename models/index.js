const User = require("./User");
const Post = require("./Post");
const Friendship = require("./Friendship");
const FriendshipStatus = require("./FriendshipStatus");
const MyStatus = require("./MyStatus");

/* User, Post relationships 
start=================================================================================*/
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Post, {
  through: "ThroughTable",
}); // through table

Post.belongsToMany(User, {
  through: "ThroughTable",
}); // through table
/* End===============================
=================================================================================*/

/* User, Friendship relationships 
start=================================================================================*/
User.hasMany(Friendship, {
  // as: "friend_requests",
  foreignKey: "requester_id",
});
User.hasMany(Friendship, {
  foreignKey: "addressee_id",
});

// User.belongsToMany(Friendship, {
//   through: "ThroughTable",
// }); // through table

// Friendship.belongsToMany(User, {
//   through: "ThroughTable",
// }); // through table

/* End===============================
=================================================================================*/

/* User, Friendship, FriendshipStatus relationships 
start=================================================================================*/
// Friendship.hasMany(FriendshipStatus, {
//   foreignKey: "requester_id_status",
// });
// Friendship.hasMany(FriendshipStatus, {
//   foreignKey: "addressee_id",
// });

MyStatus.hasMany(FriendshipStatus, {
  foreignKey: "status_code",
});

User.hasMany(FriendshipStatus, {
  foreignKey: "specifier_id",
});

/* End===============================
=================================================================================*/

module.exports = { User, Post, Friendship, FriendshipStatus, MyStatus };
