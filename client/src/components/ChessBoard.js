import { useRef, useState } from "react";
import Chess from "chess.js";
import Tile from "./Tile";
import "./ChessBoard.css";

const chess = new Chess();
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
const pieceWidth = 75;

function ChessBoard({
  takenWhitePieces,
  setTakenWhitePieces,
  takenBlackPieces,
  setTakenBlackPieces,
  setWinner
}) {
  const chessBoardRef = useRef(null);
  const [pieceCoordinates, setPieceCoordinates] = useState(chess.board()); // Coordinates of the chess pieces on the board

  let chessBoardTiles = [];
  let potentialMoveIndicators = [];
  let setPotentialMoveIndicators = [];
  const onTileMount = (dataFromTile) => {
    potentialMoveIndicators.push(dataFromTile[0]);
    setPotentialMoveIndicators.push(dataFromTile[1]);
  };

  // Add the tiles and pieces to the chess board
  for (let i = 0; i < yAxis.length; i++) {
    for (let j = 0; j < xAxis.length; j++) {
      chessBoardTiles.push(
        <Tile
          onMount={onTileMount}
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

      let potentialMoves = chess.moves({ square: startingCoordinates });
      potentialMoves.forEach((move) => {
        let index = coordinatesToIndex(move);
        setPotentialMoveIndicators[index](!potentialMoveIndicators[index]);
      });
    }
  }

  function coordinatesToIndex(coordinates) {
    let xAxisIndex = xAxis.indexOf(coordinates.charAt(0));
    let yAxisIndex = yAxis.indexOf(coordinates.charAt(1));
    return xAxisIndex + yAxisIndex * 8;
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
    let move;

    // Check if a pawn can be promoted
    if (
      (selectedPieceType === "wp" && destinationYAxis === "8") || // Promote white pawn
      (selectedPieceType === "bp" && destinationYAxis === "1") // Promote black pawn
    ) {
      move = chess.move({
        from: startingCoordinates,
        to: destinationCoordinates,
        promotion: "q" // TODO: Allow the user to choose to which piece he wants to promote
      });
    } else {
      move = chess.move({
        from: startingCoordinates,
        to: destinationCoordinates
      });
    }

    setPotentialMoveIndicators.forEach((moveIndicator) => {
      moveIndicator(false); // Reset the piece move incators
    });
    checkCapture(move); // Check if a piece has been captured
    if (chess.in_checkmate()) setWinner(move.color); // Check if a player has won the game
    selectedPiece.style.position = "static"; // Set the position of the piece to static to reset the piece to its original coordinates
    setPieceCoordinates(chess.board()); // Update the piece coordinates and rerender the board
  }

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  function checkCapture(move) {
    if (!move) return; // Return if no legal move was made
    if (!move.captured) return; // Return if no piece has been captured

    if (move.color === "w") {
      // If white made the last move add the taken piece to the taken black pieces
      setTakenBlackPieces((takenBlackPieces) => [
        ...takenBlackPieces,
        move.captured
      ]);
    } else {
      // If black made the last move add the taken piece to the taken white pieces
      setTakenWhitePieces((takenWhitePieces) => [
        ...takenWhitePieces,
        move.captured
      ]);
    }
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
