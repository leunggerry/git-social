const { Friendship } = require("../models");

const friendshipData = [
  // Friend requests to user 1
  {
    requester_id: 2,
    addressee_id: 1,
    user_id: 2, // user_id = requester_id
  },
  {
    requester_id: 4,
    addressee_id: 1,
    user_id: 4, // user_id = requester_id
  },
  {
    requester_id: 5,
    addressee_id: 1,
    user_id: 5, // user_id = requester_id
  },
  {
    requester_id: 3,
    addressee_id: 1,
    user_id: 3, // user_id = requester_id
  },
  {
    requester_id: 10,
    addressee_id: 1,
    user_id: 10, // user_id = requester_id
  },
  {
    requester_id: 9,
    addressee_id: 1,
    user_id: 9, // user_id = requester_id
  },
  {
    requester_id: 8,
    addressee_id: 1,
    user_id: 8, // user_id = requester_id
  },
  {
    requester_id: 1,
    addressee_id: 2,
    user_id: 1, // user_id = requester_id
  },
  {
    requester_id: 3,
    addressee_id: 2,
    user_id: 3, // user_id = requester_id
  },

  {
    requester_id: 5,
    addressee_id: 2,
    user_id: 5, // user_id = requester_id
  },
];

const seedFriendships = () => Friendship.bulkCreate(friendshipData);

module.exports = seedFriendships;
