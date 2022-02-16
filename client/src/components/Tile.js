import React from "react";
import "./Tile.css";

function Tile({ tileCoordinates, tileColor, piece }) {
  // When a piece is present display it on the tile
  let pieceImageElement;
  if (piece) {
    let pieceName = piece.color + piece.type;
    pieceImageElement = (
      <img
        src={`${process.env.PUBLIC_URL}/images/pieces/${pieceName}.png`}
        alt={`${pieceName} on tile ${tileCoordinates}`}
      ></img>
    );
  }

  return <div className={`tile ${tileColor}`}>{pieceImageElement}</div>;
}

export default Tile;
