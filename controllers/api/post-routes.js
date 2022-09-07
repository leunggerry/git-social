/**
 * @module postRoutes
 *
 * @description End point routes for posts
 */
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

/**
 * @function GET(/)
 * @description Get all posts
 *
 * @param {string} /
 * @param {object} (req,res)
 *
 * @return {object}
 */

router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    order: [["created_at", "DESC"]],
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function GET(/:id)
 * @description Get a post by id
 *
 * @param {int} /:id
 * @param {object} (req,res)
 *
 * @return {object}
 */
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function POST(/)
 * @description create a post
 *
 * @param {} /
 * @param {object} (req,res)
 *
 * @return {object} - post object
 */
// @TODO took out utilities of user authenitcation session
router.post("/", (req, res) => {
  // router.post("/", withAuth, (req, res) => {
  // expects {title: 'Taskmaster', text_body: "Donec", github_repo_url: 'https://taskmaster.com/press', user_id: 1}
  console.log("user_id: " + req.session.user_id);
  console.log("title: " + req.body.title);
  console.log("text_body: " + req.body.text_body);
  console.log("repo_name: " + req.body.repo_name);
  console.log("github_repo_url: " + req.body.github_repo_url);

  Post.create({
    title: req.body.title,
    text_body: req.body.text_body,
    repo_name: req.body.repo_name,
    github_repo_url: req.body.github_repo_url,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function PUT(/:id)
 * @description Update a post by id
 *
 * @param {int} /:id
 * @param {object} (req,res)
 *
 * @return {object} updated post
 */ // @Todo took out user authentication
router.put("/:id", (req, res) => {
  // router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      text_body: req.body.text_body,
      repo_name: req.body.repo_name,
      github_repo_url: req.body.github_repo_url,
      user_id: req.body.user_id, //used by last updated
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function DELTE(/:id)
 * @description Delete a post by id
 *
 * @param {int} /:id
 * @param {object} (req,res)
 *
 * @return {object}
 */
// @TODO took out user authentication
router.delete("/:id", (req, res) => {
  // router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
