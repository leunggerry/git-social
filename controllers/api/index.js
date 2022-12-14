const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const friendRequestRoutes = require("./friendRequest-routes");
const friendsListRoutes = require("./friendsList-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/friends-requests", friendRequestRoutes);
router.use("/friendsList", friendsListRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
