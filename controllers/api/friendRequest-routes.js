const router = require("express").Router();
const { User, Friendship } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  // get a list of all friend requests
  Friendship.findAll({
    attributes: [
      "requester_id",
      "addressee_id",
      "status_code",
      "requested_date_time",
    ],
    include: [
      {
        model: User, //include the requester's username requester_username
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
  // find one friend request by the requester's id
  Friendship.findOne({
    where: {
      requesterId: req.params.id,
    },
    attributes: [
      "requester_id",
      "addressee_id",
      "status_code",
      "requested_date_time",
    ],
    include: [
      {
        model: User, //include the requester's username requester_username
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
  // expects {requesterId: 1, addresseeId: 2}
  Friendship.create({
    requesterId: req.body.requesterId,
    addresseeId: req.body.addresseeId,
    user_id: req.body.requesterId, // lock the user Id to requesterId
  })
    .then((dbFriendshipData) => res.json(dbFriendshipData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // you can update the status of a friend request
  // R= Requested, A= Accepted, D= Declined, B= Blocked
  // expects {statusCode: "R"|| statusCode: "A"|| statusCode: "D"|| statusCode: "B"}
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

module.exports = router;
