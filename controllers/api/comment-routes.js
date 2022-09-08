/**
 * @module commentsRoutes
 *
 * @description End point routes for comments page
 */
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

/**
 * @function GET(/)
 * @description Get all comments for homepage
 *
 * @param {string} /
 * @param {object} (req,res)
 *
 * @return {object} return homepage rendering
 */
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function POST(/)
 * @description Get all comments for homepage
 *
 * @param {string} /
 * @param {object} (req,res) - in the req body comment text, post_id and user_id
 *
 * @return {object} return homepage rendering
 */

router.post("/", withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

/**
 * @function DELETE(/)
 * @description Get all comments for homepage
 *
 * @param {int} /:id
 * @param {object} (req,res)
 *
 * @return {object} return homepage rendering
 */

router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
