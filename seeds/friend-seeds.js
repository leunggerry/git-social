const { UsersFriends } = require("../models");

const friendsData = [
  {
    user_id: 1,
    friend_id: 2,
  },
  {
    user_id: 1,
    friend_id: 3,
  },
  {
    user_id: 2,
    friend_id: 3,
  },
];

const seedFriends = () => UsersFriends.bulkCreate(friendsData);

module.exports = seedFriends;
