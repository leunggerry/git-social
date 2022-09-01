const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const friendRequestRoutes = require("./friendRequest-routes");
const friendsListRoutes = require("./friendsList-routes");
const postRoutes = require("./post-routes");

router.use("/users", userRoutes);
router.use("/friends-requests", friendRequestRoutes);
router.use("/friends-list", friendsListRoutes);
router.use("/posts", postRoutes);

module.exports = router;
