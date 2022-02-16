import React from "react";
import "./Tile.css";

function Tile({ tileCoordinates, tileColor }) {
  return <div className={`tile ${tileColor}`}></div>;
}

export default Tile;
