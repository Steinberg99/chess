import { useState } from "react";
import GameOverModal from "./components/GameOverModal";
import PlayerRow from "./components/PlayerRow";
import ChessBoard from "./components/ChessBoard";
import "./App.css";

function App() {
  const [takenWhitePieces, setTakenWhitePieces] = useState([]);
  const [takenBlackPieces, setTakenBlackPieces] = useState([]);
  const [winner, setWinner] = useState(null);

  return (
    <div className="App">
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

export default App;
