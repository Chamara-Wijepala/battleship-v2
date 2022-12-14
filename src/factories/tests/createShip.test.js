const createShip = require("../createShip");

describe("Ship with a length of 2", () => {
  const ship = createShip(2);

  test("Expect length of ship to be 2", () => {
    expect(ship.length).toEqual(2);
  });

  ship.hit();
  ship.hit();

  test("Expect ship to be sunk", () => {
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe("Ship with a length of 4", () => {
  const ship = createShip(4);

  test("Expect length of ship to be 4", () => {
    expect(ship.length).toEqual(4);
  });

  ship.hit();
  ship.hit();

  test("Expect ship to not be sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
});
