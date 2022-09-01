const router = require("express").Router();
const { User, UsersFriends } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  //get a list of all users who have friends :D
  UsersFriends.findAll({
    attributes: ["user_id", "friend_id"],
  })
    .then((UsersFriends) => res.json(UsersFriends))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  //get a single user and a list of their friends
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: ["friends"],
  })
    .then((UsersFriends) => res.json(UsersFriends))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
