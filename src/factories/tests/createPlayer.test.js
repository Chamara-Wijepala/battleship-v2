const createPlayer = require("../createPlayer");

const humanPlayer = createPlayer("One");
const computerPlayer = createPlayer("Two");

humanPlayer.attackEnemy(computerPlayer.gameBoard, 0);
computerPlayer.makeRandomPlay(humanPlayer.gameBoard);

test("Expect each players' names to be One and Two respectively", () => {
  expect(humanPlayer.name).toBe("One");
  expect(computerPlayer.name).toBe("Two");
});

test("Expect human player to attack computer player", () => {
  expect(computerPlayer.gameBoard.board[0].isHit).toBeTruthy();
});

test("Expect computer player to attack a random tile on human player's board", () => {
  expect(humanPlayer.gameBoard.board).toEqual(
    expect.arrayContaining([expect.objectContaining({ isHit: true })])
  );
});
