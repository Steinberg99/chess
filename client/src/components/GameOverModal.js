import "./GameOverModal.css";

function GameOverModal({ winner }) {
  return (
    <div className="game-over-modal">
      <h1>{winner}</h1>
    </div>
  );
}

export default GameOverModal;
