const express = require("express");
const router = express.Router();

router.use("/", require("./home"));
router.use("/status", require("./status"));

module.exports = router;
