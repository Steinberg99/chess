import { useState } from "react";
import Chess from "chess.js";
import Tile from "./Tile";
import "./ChessBoard.css";

const chess = new Chess();
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function ChessBoard() {
  const [pieceCoordinates, setPieceCoordinates] = useState(chess.board()); // Coordinates of the chess pieces on the board

  let chessBoardTiles = [];

  // Add the tiles and pieces to the chess board
  for (let i = 0; i < yAxis.length; i++) {
    for (let j = 0; j < xAxis.length; j++) {
      chessBoardTiles.push(
        <Tile
          key={`${xAxis[j]}${yAxis[i]}`} // Unique key
          tileCoordinates={`${xAxis[j]}${yAxis[i]}`} // Tile coordinates
          tileColor={(i + j) % 2 === 0 ? "light-tile" : "dark-tile"} // Draw a light tile on an even number draw a dark tile on an odd number
          piece={pieceCoordinates[i][j]} // Add the piece to the tile
        />
      );
    }
  }

  let selectedPiece;
  let startingCoordinates;
  function grabPiece(e) {
    if (e.target.classList.contains("chess-piece")) {
      selectedPiece = e.target.getAttribute("piece"); // Set the selected piece
      startingCoordinates = e.target.getAttribute("coordinates"); // Set the starting coordinates
    }
  }

  function placePiece(e) {
    let destinationCoordinates = e.target.getAttribute("coordinates");
    let desitnationY = destinationCoordinates.charAt(1);

    // Check if a pawn can be promoted
    if (
      (selectedPiece === "wp" && desitnationY === "8") || // Promote white pawn
      (selectedPiece === "bp" && desitnationY === "1") // Promote black pawn
    ) {
      chess.move({
        from: startingCoordinates,
        to: destinationCoordinates,
        promotion: "q",
      });
    } else {
      chess.move({
        from: startingCoordinates,
        to: destinationCoordinates,
      });
    }

    setPieceCoordinates(chess.board()); // Update the piece coordinates
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
