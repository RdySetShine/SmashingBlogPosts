// const express = require("express");
const router = require('express').Router();
const homecontroller = require('../homecontroller')

// Import your controllers here

const blogRoutes = require("./blogpostscontroller.js");
const userRoutes = require("./usercontroller");
// Define your routes
const blogpostcommentRoutes = require("./blogpostcommentscontroller")
router.use("/blog", blogRoutes);
router.use("/user", userRoutes )
router.use("/comment", blogpostcommentRoutes)
router.use("/dashboard", homecontroller)
module.exports = router;


// get all Linked up an
// then Run
// work errors on  npm run start