import { useEffect, useState } from "react";
import _ from "underscore";
import EndGame from "./components/EndGame";
import { ComputerPlayerBoard, HumanPlayerBoard } from "./components/Gameboards";
import createPlayer from "./factories/createPlayer";

import { checkCollisions } from "./utils/checkCollisions";

const humanPlayer = createPlayer("You");
const computerPlayer = createPlayer("Computer");

export default function App() {
  // the gameState is used to restrict certain actions from the players
  // start will only allow human player to place all their ships
  // middle will allow players to attack each other
  // playerWins or computerWins will trigger the ending popup
  const [gameState, setGameState] = useState("start");
  const [currentPlayer, setCurrentPlayer] = useState("human");

  function findLegalShipPosition(ship, axis) {
    let randomNum = _.random(0, 99);

    // iterates until the chosen position won't cause any collisions
    while (true) {
      const collides = checkCollisions(
        randomNum,
        ship,
        computerPlayer.gameBoard,
        axis
      );

      if (!collides) break;

      randomNum = _.random(0, 99);
    }

    return randomNum;
  }

  // places computer's ship on the board at start
  useEffect(() => {
    const computerShips = Object.values(computerPlayer.ships);

    computerShips.forEach((ship) => {
      // chooses either x or y as the axis
      const axis = ["x", "y"][Math.round(Math.random())];

      const startPosition = findLegalShipPosition(ship, axis);
      computerPlayer.gameBoard.placeShip(startPosition, ship, axis);
    });
  }, []);

  // main game loop
  useEffect(() => {
    if (currentPlayer === "human" || gameState !== "middle") return;

    // makes the computer attack the human player
    setTimeout(() => {
      computerPlayer.makeRandomPlay(humanPlayer.gameBoard);

      if (humanPlayer.gameBoard.allShipsSunk()) setGameState("computerWins");

      setCurrentPlayer("human");
    }, 500);
  }, [currentPlayer, gameState]);

  return (
    <div className="bg-zinc-900 min-w-full min-h-screen">
      <main className="flex items-center justify-center min-h-screen pt-16">
        <div className="container mx-auto grid p-4 lg:p-8 gap-4 lg:grid-cols-2 lg:gap-16">
          <HumanPlayerBoard
            player={humanPlayer}
            changeGameState={(s) => setGameState(s)}
          />

          <ComputerPlayerBoard
            player={computerPlayer}
            currentPlayer={currentPlayer}
            changePlayer={(p) => setCurrentPlayer(p)}
            gameState={gameState}
            changeGameState={(s) => setGameState(s)}
          />
        </div>
      </main>

      <EndMessage gameState={gameState} />
    </div>
  );
}

function EndMessage({ gameState }) {
  if (gameState === "humanWins") {
    return <EndGame gameWon />;
  } else if (gameState === "computerWins") {
    return <EndGame />;
  }

  return null;
}
