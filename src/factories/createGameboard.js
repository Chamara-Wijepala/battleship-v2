module.exports = function createGameboard() {
  const board = createBoard();
  const shipsOnBoard = [];

  function createBoard() {
    const newBoard = [];
    for (let i = 0; i < 100; i++) {
      newBoard.push({ id: i, hoveredOver: false });
    }
    return newBoard;
  }

  return {
    board,

    placeShip(startPosition, givenShip, axis) {
      // Will assign a reference to the given ship object on every tile that
      // ship is supposed to be placed on
      for (let i = 0; i < givenShip.length; i++) {
        axis === "x"
          ? (board[startPosition + i].ship = givenShip)
          : (board[startPosition + i * 10].ship = givenShip);
      }
      shipsOnBoard.push(givenShip);
    },

    hoverShip(startPosition, length, axis, collides) {
      board.forEach((tile) => (tile.hoveredOver = false));
      if (!collides) {
        for (let i = 0; i < length; i++) {
          axis === "x"
            ? (board[startPosition + i].hoveredOver = true)
            : (board[startPosition + i * 10].hoveredOver = true);
        }
      }
    },

    receiveAttack(position) {
      board[position].isHit = true;
      if (board[position].ship) board[position].ship.hit();
    },

    allShipsSunk() {
      return shipsOnBoard.every((ship) => ship.isSunk());
    },
  };
};
