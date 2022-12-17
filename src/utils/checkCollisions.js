// creates an array of tiles a ship will be placed on and checks if it will
// collide with the edges or with other ships.
export function checkCollisions(startPosition, ship, gameBoard, axis) {
  if (!startPosition || !ship) return;

  const rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89];
  const leftEdge = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  const occupiedTiles = [];
  for (let i = 0; i < ship.length; i++) {
    axis === "x"
      ? occupiedTiles.push(startPosition + i)
      : occupiedTiles.push(startPosition + i * 10);
  }

  const collidesWithRightEdge = occupiedTiles.some((tile) =>
    rightEdge.some((position) => position === tile)
  );
  const collidesWithLeftEdge = occupiedTiles.some((tile) =>
    leftEdge.some((position) => position === tile)
  );
  const collidesWithBottom = occupiedTiles.some((tile) => tile > 99);

  const occupiedTilesWithinBoard = occupiedTiles.filter((tile) => tile < 100);
  const collidesWithShip = occupiedTilesWithinBoard.some(
    (position) => gameBoard.board[position].ship
  );

  if (
    (collidesWithRightEdge && collidesWithLeftEdge) ||
    collidesWithBottom ||
    collidesWithShip
  ) {
    return true;
  }
  return false;
}
