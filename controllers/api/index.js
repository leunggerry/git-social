const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const friendshipRoutes = require("./friendship-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/friends", friendshipRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
