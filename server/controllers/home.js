const apiRoot = require("../extras/root.json");

module.exports.home = async (req, res, next) => {
  res.json({
    message: "Welcome to the I-AM-Online Server API!",
    apiRoot: apiRoot,
  });
};
