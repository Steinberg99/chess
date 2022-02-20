import { useState, useEffect } from "react";
import "./Tile.css";

function Tile({ onMount, tileCoordinates, tileColor, piece }) {
  const [potentialMove, setPotentialMove] = useState(false);

  useEffect(() => {
    onMount([potentialMove, setPotentialMove]);
  }, [onMount, potentialMove]);

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
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/pieces/${pieceName}.png)`
        }}
      ></div>
    );
  }

  let potentialMoveElement;
  if (potentialMove && !piece) {
    potentialMoveElement = <div className="potential-move-indicator"></div>;
  }

  return (
    <div className={`tile ${tileColor}`} coordinates={tileCoordinates}>
      {potentialMoveElement}
      {pieceElement}
    </div>
  );
}

export default Tile;
