const express = require("express");
const router = express.Router();
const controllers = require("../controllers/status");

router.get("/heartbeat/:username", controllers.reportUserStatus);
router.get("/ping/:username", controllers.checkStatus);

module.exports = router;
