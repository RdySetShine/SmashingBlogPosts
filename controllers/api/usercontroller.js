const express = require("express");
const router = express.Router();
const { User } = require("../../models");



// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: "Sign up successful and logged in!" }  );
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route to login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email }});
    if(!userData) {
      res.status(400).json({ message: "Incorrect email" });
      return;
    };
    const validPassword = userData.checkPassword(req.body.password);
    if(!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      return;
    };
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  };
});
// Route to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;

// Route: POST /users
// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.create({ email, password });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });

// router.put("/login", async (req, res) => {
//   try {

//     const { email, password } = req.body;
//     const user = await User.findOne({
//       where: {
//         email: email
//       }
//     })

//     if (!user) { 
//       res.status(400).json({
//         message: 'no user found'
//       })

//       const validPassword = user.checkPassword(password);

//       if (!validPassword) {
//         res.status(400).json({ message: 'No user account found!' });
//         return;
//       }

//       req.session.save(() => {
//         req.session.userId = user.id;
//         req.session.username = user.username;
//         req.session.loggedIn = true;

//         res.json({ user, message: 'You are now logged in!' });
//       });

//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update user" });
//   }
// });


// module.exports = router;
