module.exports = function createShip(givenLength) {
  const length = givenLength;
  let hits = 0;

  return {
    length,

    hit() {
      hits++;
    },

    isSunk() {
      return hits === length;
    },
  };
};
