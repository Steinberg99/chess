import React from "react";
import "./Tile.css";

function grabPiece(e) {}

function Tile({ tileCoordinates, tileColor, piece }) {
  // When a piece is present display it on the tile
  let pieceImageElement;
  if (piece) {
    let pieceName = piece.color + piece.type;
    pieceImageElement = (
      <div
        className="chess-piece"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/pieces/${pieceName}.png)`,
        }}
      ></div>
    );
  }

  return <div className={`tile ${tileColor}`}>{pieceImageElement} </div>;
}

export default Tile;
