/**
 * @module dashboardRoutes
 *
 * @description End point routes for user dashboard
 */
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
//import authentication
const withAuth = require("../utils/auth");

/**
 * @function GET
 * @description Get User's dashboard with all the User's posts
 *
 * @param {string} /
 * @param {function} withAuth
 * @param {object} (req,res)
 *
 * @return {render(dashboard)}
 */
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      //use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "text_body", "repo_name", "github_repo_url", "created_at"],
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

/**
 * @function GET
 * @description Get User's edit form for a post
 *
 * @param {int} /edit/:id
 * @param {function} withAuth
 * @param {object} (req,res)
 *
 * @return {render(edit-post)}
 */
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
      [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"],
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

/**
 * @function GET
 * @description Get User's friends
 *
 * @param {int} /friendsList/:id
 * @param {object} (req,res)
 *
 * @return {render(dashboard)}
 */
router.get("/friendsList/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
      // id: req.session.user_id,
    },
    include: ["friends"],
  })
    .then((dbUsersFriends) => {
      console.log(dbUsersFriends);
      if (!dbUsersFriends) {
        res.status(404).json({ message: "No friends found for this user" });
        return;
      }

      const user = dbUsersFriends.get({ plain: true });
      const friendsArray = user.friends;

      const friendsList = friendsArray.map((friend) => {
        return {
          username: friend.username,
        };
      });

      // pass data to template
      res.render("dashboard", { friendsList, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
