const { UsersFriends } = require("../models");

const friendsData = [
  {
    user_id: 1,
    friend_id: 2,
  },
  {
    user_id: 1,
    friend_id: 4,
  },
  {
    user_id: 1,
    friend_id: 5,
  },
  {
    user_id: 1,
    friend_id: 6,
  },
  {
    user_id: 1,
    friend_id: 7,
  },
  {
    user_id: 1,
    friend_id: 8,
  },
  {
    user_id: 1,
    friend_id: 9,
  },
  {
    user_id: 2,
    friend_id: 3,
  },
];

const seedFriends = () => UsersFriends.bulkCreate(friendsData);

module.exports = seedFriends;
