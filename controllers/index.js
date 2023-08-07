// const express = require("express");
const router =  require('express').Router();

// Import your controllers here
const apiRoutes = require("./api");
const homeRoutes = require("./homecontroller");
// Define your routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
