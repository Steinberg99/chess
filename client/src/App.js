import { useState } from "react";
import GameOverModal from "./components/GameOverModal";
import ChessBoard from "./components/ChessBoard";
import "./App.css";

function App() {
  const [takenWhitePieces, setTakenWhitePieces] = useState([]);
  const [takenBlackPieces, setTakenBlackPieces] = useState([]);
  const [winner, setWinner] = useState("No winner");

  return (
    <div className="App">
      <GameOverModal winner={winner} />
      <ChessBoard
        setTakenWhitePieces={setTakenWhitePieces}
        setTakenBlackPieces={setTakenBlackPieces}
        setWinner={setWinner}
      />
    </div>
  );
}

export default App;
