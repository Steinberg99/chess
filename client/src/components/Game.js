import { useState, useEffect } from "react";
import io from "socket.io-client";
import GameOverModal from "./GameOverModal";
import PlayerRow from "./PlayerRow";
import ChessBoard from "./ChessBoard";

function Game() {
  const [takenWhitePieces, setTakenWhitePieces] = useState([]);
  const [takenBlackPieces, setTakenBlackPieces] = useState([]);
  const [winner, setWinner] = useState(null);

  return (
    <div className="Game">
      <GameOverModal winner={winner} />
      <PlayerRow color="b" takenPieces={takenWhitePieces} />
      <ChessBoard
        takenWhitePieces={takenWhitePieces}
        setTakenWhitePieces={setTakenWhitePieces}
        takenBlackPieces={takenBlackPieces}
        setTakenBlackPieces={setTakenBlackPieces}
        setWinner={setWinner}
      ></ChessBoard>
      <PlayerRow color="w" takenPieces={takenBlackPieces} />
    </div>
  );
}

export default Game;
