/**
 * @module homeRoutes
 *
 * @description End point routes for home page
 */
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

/**
 * @function GET(/)
 * @description Get all posts for homepage
 *
 * @param {string} /
 * @param {object} (req,res)
 *
 * @return {render(homepage)} return homepage rendering
 */
router.get("/", (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: ["id", "title", "text_body", "repo_name", "github_repo_url", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function GET(/post/:id)
 * @description Return a single post
 *
 * @param {int} /post/:id - post ID
 * @param {object} (req,res)
 *
 * @return {render(single-post)} return homepage rendering
 */
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "text_body", "title", "created_at"],
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function GET
 * @description Get the Login route and render the login page if not logged in.
 *              Otherwise render the homepage.
 *
 * @param req
 * @param res
 *
 * @return {render(homepage)} return login rendering
 */
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

/**
 * @function GET
 * @description Get the Sign up route and render the login page if not logged in.
 *              Otherwise render the homepage.
 *
 * @param req
 * @param res
 *
 * @return {render(homepage)} return login rendering
 */
router.get("/sign-up", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("sign-up");
});

module.exports = router;
