import { useRef, useState } from "react";
import Chess from "chess.js";
import Tile from "./Tile";
import "./ChessBoard.css";

const chess = new Chess();
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
const boardWidth = 600;
const pieceWidth = 75;

function ChessBoard({ setTakenWhitePieces, setTakenBlackPieces }) {
  const chessBoardRef = useRef(null);
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
      selectedPiece = e.target; // Set the selected piece
      startingCoordinates = e.target.getAttribute("coordinates"); // Set the starting coordinates
    }
  }

  function movePiece(e) {
    if (!selectedPiece) return; // Return if no piece is selected

    let x = e.clientX - pieceWidth / 2;
    let y = e.clientY - pieceWidth / 2;

    selectedPiece.style.position = "absolute";
    selectedPiece.style.left = `${x}px`;
    selectedPiece.style.top = `${y}px`;
  }

  function placePiece(e) {
    if (!selectedPiece) return; // Return if no piece is selected

    let x = e.clientX - getOffset(chessBoardRef.current).left; // X position of the mouse offset with the position of the chess board
    let y = e.clientY - getOffset(chessBoardRef.current).top; // Y position of the mouse offset with the postion of the chess board
    let destinationXAxis = xAxis[Math.floor(x / pieceWidth)];
    let destinationYAxis = yAxis[Math.floor(y / pieceWidth)];
    let destinationCoordinates = destinationXAxis + destinationYAxis;
    let selectedPieceType = selectedPiece.getAttribute("piece");

    // Check if a pawn can be promoted
    if (
      (selectedPieceType === "wp" && destinationYAxis === "8") || // Promote white pawn
      (selectedPieceType === "bp" && destinationYAxis === "1") // Promote black pawn
    ) {
      chess.move({
        from: startingCoordinates,
        to: destinationCoordinates,
        promotion: "q", // Promote the pawn to a queen
      });
    } else {
      chess.move({
        from: startingCoordinates,
        to: destinationCoordinates,
      });
    }

    selectedPiece.style.position = "static"; // Set the position of the piece to static to reset the piece to its original coordinates
    setPieceCoordinates(chess.board()); // Update the piece coordinates
  }

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }

  return (
    <div
      className="chess-board"
      ref={chessBoardRef}
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => placePiece(e)}
    >
      {chessBoardTiles}
    </div>
  );
}

export default ChessBoard;
