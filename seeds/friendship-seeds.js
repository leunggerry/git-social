const { Friendship } = require("../models");

const friendshipData = [
  {
    requester_id: 1,
    addressee_id: 2,
    user_id: 1,
  },
  {
    requester_id: 2,
    addressee_id: 1,
    user_id: 2,
  },
  {
    requester_id: 3,
    addressee_id: 2,
    user_id: 3,
  },
  {
    requester_id: 4,
    addressee_id: 1,
    user_id: 4,
  },
  {
    requester_id: 5,
    addressee_id: 2,
    user_id: 5,
  },
];

const seedFriendships = () => Friendship.bulkCreate(friendshipData);

module.exports = seedFriendships;
