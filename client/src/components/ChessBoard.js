import { useState } from "react";
import Chess from "chess.js";
import Tile from "./Tile";
import "./ChessBoard.css";

const chess = new Chess();
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function ChessBoard() {
  const [piecePositions, setPiecePositions] = useState(chess.board()); // Positions of the chess pieces on the board

  let chessBoardTiles = [];

  // Add the tiles and pieces to the chess board
  for (let i = 0; i < yAxis.length; i++) {
    for (let j = 0; j < xAxis.length; j++) {
      chessBoardTiles.push(
        <Tile
          key={`${xAxis[j]}${yAxis[i]}`} // Unique key
          tileCoordinates={`${xAxis[j]}${yAxis[i]}`} // Tile coordinates
          tileColor={(i + j) % 2 === 0 ? "light-tile" : "dark-tile"} // Draw a light tile on an even number draw a dark tile on an odd number
          piece={piecePositions[i][j]} // Add the piece to the tile
        />
      );
    }
  }

  let selectedTilePosition;
  function grabPiece(e) {
    if (e.target.classList.contains("chess-piece")) {
      selectedTilePosition = e.target.getAttribute("position"); // Set the selected tile
    }
  }

  function placePiece(e) {
    // Move the piece on the selected tile
    chess.move({
      from: selectedTilePosition,
      to: e.target.getAttribute("position"),
    });

    console.log(
      `from ${selectedTilePosition} to ${e.target.getAttribute("position")}`
    );

    setPiecePositions(chess.board());
  }

  return (
    <div
      className="chess-board"
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => placePiece(e)}
    >
      {chessBoardTiles}
    </div>
  );
}

export default ChessBoard;
