require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  pingAuthKey: process.env.PING_REG_AUTH_KEY,
  pingusername: process.env.USERNAME_TO_PING,
};
