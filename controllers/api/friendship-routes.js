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
    attributes: [
      "requester_id",
      "addressee_id",
      "status_code",
      "requested_date_time",
      "user_id",
    ],
    include: [
      {
        model: User,
        attributes: [["username", "requester_username"]],
      },
    ],
  })
    .then((dbFriendshipData) => res.json(dbFriendshipData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Friendship.findOne({
    where: {
      requesterId: req.params.id,
    },
    attributes: [
      "requester_id",
      "addressee_id",
      "status_code",
      "requested_date_time",
      "user_id",
    ],
    include: [
      {
        model: User,
        attributes: [["username", "requester_username"]],
      },
    ],
  })
    .then((dbFriendshipData) => {
      if (!dbFriendshipData) {
        res
          .status(404)
          .json({ message: "No friend request found with this id" });
        return;
      }
      res.json(dbFriendshipData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // expects {requesterId: 1, addresseeId: 2, user_id: 1}
  Friendship.create({
    requesterId: req.body.requesterId,
    addresseeId: req.body.addresseeId,
    user_id: req.body.user_id,
  })
    .then((dbFriendshipData) => res.json(dbFriendshipData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // expects {statusCode: R|| statusCode: A|| statusCode: D|| statusCode: B}
  Friendship.update(
    {
      statusCode: req.body.statusCode,
    },
    {
      where: {
        requesterId: req.params.id,
      },
    }
  )
    .then((dbFriendshipData) => {
      if (!dbFriendshipData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbFriendshipData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
