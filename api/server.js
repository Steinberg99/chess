const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log("A user has connected!");

  // Join a game
  socket.io("joinGame", (gameId) => {
    socket.join(gameId);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
