/**
 * @module userRoutes
 *
 * @description End point routes for users
 */
const router = require("express").Router();
const { User, Post, UsersFriends, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

/**
 * @function GET(/)
 * @description Get all the users
 *
 * @param {string} /
 * @param {object} (req,res)
 *
 * @return {object} return object with all the users
 */
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function GET(/:id)
 * @description Get a user by id
 *
 * @param {string} /:id
 * @param {object} (req,res)
 *
 * @return {object} return object with user info
 */
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "text_body", "github_repo_url", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function POST(/)
 * @description Create a user
 *
 * @param {string} /
 * @param {object} (req,res) - User provides (username, email, password, github_username)
 *
 * @return {object} return a express session and a json object with db user data
 */
router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', github_username: "leunggerry"}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    github_username: req.body.github_username,
  }).then((dbUserData) => {
    // @TODO For express session
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

/**
 * @deprecated
 * @function POST(/login)
 * @description user logging in
 *
 * @param {string} /
 * @param {object} (req,res) - User provides (username, email, password, github_username)
 *
 * @return {object} return a express session and a json object with db user data
 */
router.post("/login", (req, res) => {
  // expects {username: 'Lernantino',password: 'password1234',}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      // TODO: alert user of incorrect password
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

/**
 * @function POST(/logout)
 * @description A route for when a user is logged out, the express session is destoryed
 *
 * @param {string} /logout
 * @param {object} (req,res)
 *
 * @return {boolean} return true or false whether session is ended
 */
// logout action
router.post("/logout", (req, res) => {
  // router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

/**
 * @function PUT(/:id)
 * @description Update user info
 *
 * @param {int} /:id
 * @param {object} (req,res) - User provides (username, email, password, github_username)
 *
 * @return {object} updated obbject
 */
// Update a user
router.put("/:id", (req, res) => {
  // router.put("/:id", withAuth, (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', github_username: "leunggerry"}
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * @function DELETE(/:id)
 * @description delete a user by the user id
 *
 * @param {int} /:id
 * @param {object} (req,res)
 *
 * @return {object}
 */
// Delete a User from the User Table
// For express authentication
//router.delete("/:id", withAuth, (req, res) => {
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
