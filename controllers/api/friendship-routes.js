const router = require("express").Router();
const {
  User,
  Friendship,
  FriendshipStatus,
  MyStatus,
} = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Friendship.findAll({
    attributes: ["requester_id", "addressee_id", "user_id"],
    include: [
      {
        model: User,
        attributes: [["username", "requester_username"]],
      },
      {
        model: FriendshipStatus,
      },
    ],
  })
    .then((dbFriendshipData) => res.json(dbFriendshipData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // expects {requester_id: 1, addressee_id: 2, user_id: 1}
  Friendship.create({
    requester_id: req.body.requester_id,
    addressee_id: req.body.addressee_id,
    user_id: req.body.user_id,
  })
    .then((dbFriendshipData) => res.json(dbFriendshipData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
