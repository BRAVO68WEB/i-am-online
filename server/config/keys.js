require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  discordId: process.env.DISCORD_ID,
  pingAuthKey: process.env.PING_REG_AUTH_KEY,
  pingusername: process.env.USERNAME_TO_PING,
};
