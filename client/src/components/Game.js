import { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import GameOverModal from "./GameOverModal";
import PlayerRow from "./PlayerRow";
import ChessBoard from "./ChessBoard";

function Game() {
  const socket = useRef();

  const { gameID } = useParams();
  const [playerColor, setPlayerColor] = useState(null);
  const [enemyMove, setEnemyMove] = useState(null);
  const [takenWhitePieces, setTakenWhitePieces] = useState([]);
  const [takenBlackPieces, setTakenBlackPieces] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.current = io("http://localhost:3001");

    socket.current.emit("joinGame", gameID); // Join the game

    socket.current.on("joinedGame", (color) => {
      setPlayerColor(color);
    });

    socket.current.on("enemyMove", (move) => {
      setEnemyMove(move);
    });
  }, []);

  return (
    <div className="Game">
      <GameOverModal winner={winner} />
      <PlayerRow
        color={playerColor === "w" ? "b" : "w"}
        takenPieces={takenWhitePieces}
      />
      <ChessBoard
        socket={socket ? socket : null}
        enemyMove={enemyMove}
        playerColor={playerColor}
        takenWhitePieces={takenWhitePieces}
        setTakenWhitePieces={setTakenWhitePieces}
        takenBlackPieces={takenBlackPieces}
        setTakenBlackPieces={setTakenBlackPieces}
        setWinner={setWinner}
      ></ChessBoard>
      <PlayerRow color={playerColor} takenPieces={takenBlackPieces} />
    </div>
  );
}

export default Game;
