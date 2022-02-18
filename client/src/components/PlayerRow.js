import "./PlayerRow.css";

function PlayerRow({ color, takenPieces }) {
  let takenPiecesColor;
  color === "w" ? (takenPiecesColor = "b") : (takenPiecesColor = "w"); // Set the taken piece color to the opposite of the player color

  return (
    <div className="player-row">
      <div className="player-info">
        <div className={color === "w" ? "player-white" : "player-black"}></div>
      </div>
      <div className="taken-chess-pieces">
        {takenPieces.map((piece) => (
          <img
            className="taken-chess-piece"
            src={`${process.env.PUBLIC_URL}/images/pieces/${takenPiecesColor}${piece}.png`}
            alt={`Taken piece`} // TODO: Improve alternative text
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerRow;
