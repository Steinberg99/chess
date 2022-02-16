import { useState, useEffect } from "react";
import Chess from "chess.js";
import Tile from "./Tile";
import "./ChessBoard.css";

const chess = new Chess();
const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function grabPiece(e) {}

function movePiece(e) {}

function dropPiece(e) {}

function ChessBoard() {
  const [chessBoardTiles, setChessBoardTiles] = useState([]);

  // Add the tiles to the chess board, do this only once
  useEffect(() => {
    let tiles = []; // Empty array to temporarily store the tiles
    let startingPositions = chess.board();
    for (let i = 0; i < yAxis.length; i++) {
      for (let j = 0; j < xAxis.length; j++) {
        if ((i + j) % 2 === 0) {
          // Draw a light tile on an even number
          tiles.push(
            <Tile
              key={`${xAxis[j]}${yAxis[i]}`} // Unique key
              tileCoordinates={`${xAxis[j]}${yAxis[i]}`} // Tile coordinates
              tileColor="light-tile" // Draw a light tile
              piece={startingPositions[i][j]} // Add the piece to the tile
            />
          );
        } else {
          // Draw a dark tile on an odd number
          tiles.push(
            <Tile
              key={`${xAxis[j]}${yAxis[i]}`} // Unique key
              tileCoordinates={`${xAxis[j]}${yAxis[i]}`} // Tile coordinates
              tileColor="dark-tile" // Draw a dark tile
              piece={startingPositions[i][j]} // Add the piece to the tile
            />
          );
        }
      }
    }
    setChessBoardTiles(tiles); // Set the chess board tiles
  }, []);

  return (
    <div
      className="chess-board"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
    >
      {chessBoardTiles}
    </div>
  );
}

export default ChessBoard;
