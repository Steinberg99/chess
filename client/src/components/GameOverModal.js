import "./GameOverModal.css";

function GameOverModal({ winner }) {
  let modal;
  if (winner) {
    modal = <h1>{winner}</h1>;
  }

  return <div className="game-over-modal">{modal}</div>;
}

export default GameOverModal;
