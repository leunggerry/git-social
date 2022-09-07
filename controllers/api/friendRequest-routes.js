/**
 * @module friendRequestRoutes
 *
 * @description End point routes for adding friends
 */
const router = require("express").Router();
const { User, Friendship } = require("../../models");

/**
 * @function GET(/)
 * @description Get all friend requests
 *
 * @param {string} /
 * @param {object} (req,res)
 *
 * @return {object} return friends list requests
 */
router.get("/", (req, res) => {
  // get a list of all friend requests
  Friendship.findAll({
    attributes: ["requester_id", "addressee_id", "status_code", "requested_date_time"],
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

/**
 * @function GET(/:id)
 * @description Get all friend requests by requester id
 *
 * @param {int} /:id
 * @param {object} (req,res)
 *
 * @return {object} return friend list object
 */
router.get("/:id", (req, res) => {
  // find one friend request by the requester's id
  Friendship.findOne({
    where: {
      requesterId: req.params.id,
    },
    attributes: ["requester_id", "addressee_id", "status_code", "requested_date_time"],
    include: [
      {
        model: User, //include the requester's username requester_username
        attributes: [["username", "requester_username"]],
      },
    ],
  })
    .then((dbFriendshipData) => {
      if (!dbFriendshipData) {
        res.status(404).json({ message: "No friend request found with this id" });
        return;
      }
      res.json(dbFriendshipData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function POST(/)
 * @description Create a friend requestoin
 *
 * @param {string} /
 * @param {object} (req,res) - requesterId, addresseeId, userId of the requester
 *
 * @return {object} return friend list object
 */
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

/**
 * @function PUT(/:id)
 * @description Update friend requestion status
 *
 * @param {int} /:id
 * @param {object} (req,res) - status code for friend request
 *
 * @return {object} return friend list object
 */
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
        res.status(404).json({ message: "No friend request found with this id" });
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
