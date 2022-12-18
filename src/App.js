import { useEffect, useState } from "react";
import { ComputerPlayerBoard, HumanPlayerBoard } from "./components/Gameboards";
import createPlayer from "./factories/createPlayer";

const humanPlayer = createPlayer("Human");
const computerPlayer = createPlayer("Computer");

export default function App() {
  // the gameState is used to restrict certain actions from the players
  // start will only allow human player to place all their ships
  // middle will allow players to attack each other
  // end will trigger the ending popup
  const [gameState, setGameState] = useState("start");
  const [currentPlayer, setCurrentPlayer] = useState("human");

  // main game loop
  useEffect(() => {
    if (currentPlayer === "human" || gameState === "start") return;

    // makes the computer attack the human player
    setTimeout(() => {
      computerPlayer.makeRandomPlay(humanPlayer.gameBoard);
      setCurrentPlayer("human");
    }, 500);
  }, [currentPlayer, gameState]);

  return (
    <div className="bg-zinc-900 min-w-full min-h-screen">
      <main className="flex items-center justify-center min-h-screen pt-16">
        <div className="container mx-auto grid p-4 lg:p-8 gap-4 lg:grid-cols-2 lg:gap-16">
          <HumanPlayerBoard
            player={humanPlayer}
            gameState={gameState}
            changeGameState={(s) => setGameState(s)}
          />

          <ComputerPlayerBoard
            player={computerPlayer}
            currentPlayer={currentPlayer}
            changePlayer={(p) => setCurrentPlayer(p)}
            gameState={gameState}
          />
        </div>
      </main>
    </div>
  );
}
