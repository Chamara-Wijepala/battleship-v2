const createGameboard = require("../createGameboard");

describe("Board with all ships sunk", () => {
  const testBoard = createGameboard();
  const mockShip = {
    length: 2,
    hits: 0,
    hit() {
      this.hits++;
    },
    isSunk() {
      return this.hits === this.length;
    },
  };

  // place a ship along the Y axis at position 2
  testBoard.placeShip(2, mockShip, "y");
  testBoard.receiveAttack(2);
  testBoard.receiveAttack(12);

  test("Expect a small ship to be placed vertically starting at the 3rd column of the board", () => {
    expect(testBoard.board[2].ship).toMatchObject(mockShip);
    expect(testBoard.board[12].ship).toMatchObject(mockShip);
  });

  test("Expect all ships to be sunk", () => {
    expect(testBoard.allShipsSunk()).toBeTruthy();
  });
});

describe("Board with ships remaining", () => {
  const testBoard = createGameboard();
  const mockShip = {
    length: 3,
    hits: 0,
    hit() {
      this.hits++;
    },
    isSunk() {
      return this.hits === this.length;
    },
  };

  // place a ship along the X axis at position 0
  testBoard.placeShip(0, mockShip, "x");
  testBoard.receiveAttack(0);

  test("Expect board to have 100 tiles", () => {
    expect(testBoard.board.length).toEqual(100);
  });

  test("Expect a ship to be placed horizontally at the very start of the board", () => {
    expect(testBoard.board[0].ship).toMatchObject(mockShip);
    expect(testBoard.board[1].ship).toMatchObject(mockShip);
  });

  test("Expect a shot to hit a tile", () => {
    expect(testBoard.board[0].isHit).toBeTruthy();
  });

  test("Expect a shot to hit a ship", () => {
    expect(mockShip.hits).toEqual(1);
  });

  test("Expect there to be ships remaining", () => {
    expect(testBoard.allShipsSunk()).toBeFalsy();
  });
});
