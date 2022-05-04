const express = require("express");
const router = express.Router();
const controllers = require("../controllers/home");

router.get("/", controllers.home);

module.exports = router;
