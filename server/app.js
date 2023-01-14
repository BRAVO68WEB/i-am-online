const express = require("express");
const { createServer } = require('http');
const session = require("express-session");
const mdb = require("./config/mongodb");
const mongoStore = require("connect-mongo");
const keys = require("./config/keys");
const app = express();
// const axios = require("axios");
const { WebSocketServer } = require("ws");
const { parse } = require("url");

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

const wss1 = new WebSocketServer({ noServer: true });
const wss2 = new WebSocketServer({ noServer: true });
const wss3 = new WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws, request, socket) {
  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user`);
  });
  ws.send('echo !!');
  socket.destroy();
});

wss2.on('connection', function connection(ws) {
  console.log("Client connected to wss2");
  ws.send('Connected to Server!!');
  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user ${client}`);
  });
});

// wss2.on('close', function close(ws) {
//   console.log('disconnected');
//   ws.send('Goodbye!'); 
// })

wss3.on('connection', function connection(ws, socket) {
  ws.send('No response');
  socket.destroy();
});

app.use("/", require("./routes"));  

const PORT = process.env.PORT || 5000;
const server = createServer(app);

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === '/') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request, socket);
    });
  } else if (pathname === '/status') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      // wss2.emit('connection', ws, request);
      wss2.emit('connection', ws, request);
      // wss2.emit('close', ws, request);
    });
  } else {
    wss3.handleUpgrade(request, socket, head, function done(ws) {
      wss3.emit('connection', ws, socket);
    });
  }

});

server.listen(PORT, () => {
  console.log("API listening on port "+ PORT + "!");
});
