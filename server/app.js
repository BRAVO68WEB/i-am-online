const express = require("express");
const session = require("express-session");
const mdb = require("./config/mongodb");
const mongoStore = require("connect-mongo");
const keys = require("./config/keys");
const app = express();
const axios = require("axios");

app.use(
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: mongoStore.create({
      clientPromise: mdb,
    }),
  })
);

// Self pinger as status updater
setInterval(() => {
  const config = {
    url: `http://localhost:${process.env.PORT}/status/ping/${keys.pingusername}`,
  }
  axios(config)
    .then(function (response) {
      console.log("Self Ping Completed");
    })
    .catch(function (error) {
      console.log(error);
    }
  );
}, 120000);

app.use("/", require("./routes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("API listening on port "+ PORT + "!");
});
