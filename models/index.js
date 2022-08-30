const User = require("./User");
const Post = require("./Post");
// const Comment = require("./Comment");
const Friendship = require("./Friendship");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Friendship, {
  foreignKey: "user_id",
});

Friendship.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Post, {
  through: "ThroughTable",
}); // through table

Post.belongsToMany(User, {
  through: "ThroughTable",
}); // through table

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
// });

// Post.hasMany(Comment, {
//   foreignKey: "post_id",
// });

module.exports = { User, Post, Friendship };
