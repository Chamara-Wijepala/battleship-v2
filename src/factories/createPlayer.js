const createGameboard = require("./createGameboard");
const createShip = require("./createShip");

module.exports = function createPlayer(givenName) {
  const name = givenName;
  const gameBoard = createGameboard();
  const ships = {
    carrier: createShip(5),
    battleship: createShip(4),
    cruiser: createShip(3),
    submarine: createShip(3),
    destroyer: createShip(2),
  };

  function attackEnemy(enemyBoard, position) {
    enemyBoard.receiveAttack(position);
  }

  // only the computer will use this method
  function makeRandomPlay(enemyBoard) {
    const legalMoves = enemyBoard.board.filter((tile) => !tile.isHit);
    const randomTile =
      legalMoves[Math.floor(Math.random() * legalMoves.length)];

    attackEnemy(enemyBoard, randomTile.id);
  }

  return {
    name,
    gameBoard,
    ships,
    attackEnemy,
    makeRandomPlay,
  };
};
