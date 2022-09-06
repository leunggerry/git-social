const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
//import authentication
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      //use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "text_body", "github_repo_url", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // hard code loggedIn true on this route, becasue a user wont
      // be able to get to the dashboard unless they are logged in
      res.render("dashboard", { posts, loggedIn: true });
      //res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a user's friends for their friend's list
router.get("/friendsList/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: ["friends"],
  })
    .then((dbUsersFriends) => {
      if (!dbUsersFriends) {
        res.status(404).json({ message: "No friends found for this user" });
        return;
      }

      const friends = dbUsersFriends.map((friend) =>
        friend.get({ plain: true })
      );

      // serialize the data
      // const friends = dbUsersFriends.get({ plain: true });

      // pass data to template
      res.render("dashboard", { friends, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
