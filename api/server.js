const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { chownSync } = require("fs");

app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    config: "http://localhost:3000"
  }
});
const port = process.env.PORT || 3001;

let activeGames = [];
io.on("connection", (socket) => {
  console.log("A user has connected!");

  // Join a game
  socket.on("joinGame", (gameID) => {
    let game = activeGames.find((e) => e.gameID === gameID);
    // Only add a game if the game is not yet present
    if (!game) {
      activeGames.push({
        gameID: gameID,
        whitePlayer: socket.id
      });
      socket.emit("joinedGame", "w");
    } else if (game.whitePlayer !== socket.id) {
      game.blackPlayer = socket.id;
      socket.emit("joinedGame", "b");
    }

    socket.join(gameID);
  });

  socket.on("move", (move) => {
    io.emit("enemyMove", move);
  });
});

app.use("/api", (req, res) => {
  res.json({ message: "Hello world!" });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
