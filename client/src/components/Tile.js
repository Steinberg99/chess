import React from "react";
import "./Tile.css";

function grabPiece(e) {}

function Tile({ tileCoordinates, tileColor, piece }) {
  // When a piece is present display it on the tile
  let pieceElement;
  if (piece) {
    let pieceName = piece.color + piece.type;
    pieceElement = (
      <div
        className="chess-piece"
        piece={pieceName}
        coordinates={tileCoordinates}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/pieces/${pieceName}.png)`,
        }}
      ></div>
    );
  }

  return (
    <div className={`tile ${tileColor}`} coordinates={tileCoordinates}>
      {pieceElement}
    </div>
  );
}

export default Tile;
