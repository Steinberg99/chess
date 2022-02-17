import { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import "./App.css";

function App() {
  const [takenWhitePieces, setTakenWhitePieces] = useState([]);
  const [takenBlackPieces, setTakenBlackPieces] = useState([]);

  return (
    <div className="App">
      <ChessBoard />
    </div>
  );
}

export default App;
