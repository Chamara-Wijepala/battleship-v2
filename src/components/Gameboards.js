import { useEffect, useState } from "react";
import clsx from "clsx";

import { checkCollisions } from "../utils/checkCollisions";

export function HumanPlayerBoard({ player, changeGameState }) {
  const [axis, setAxis] = useState("x");
  const [startPosition, setStartPosition] = useState(null);
  const [hoverPositions, setHoverPositions] = useState([]);
  const [playerShips, setPlayerShips] = useState(Object.values(player.ships));

  const collides = checkCollisions(
    startPosition,
    playerShips[0],
    player.gameBoard,
    axis
  );

  function getHoverPositions(length, position, axis) {
    const positions = [];
    for (let i = 0; i < length; i++) {
      axis === "x"
        ? positions.push(position + i)
        : positions.push(position + i * 10);
    }
    return positions;
  }

  function handleMouseMove(e) {
    const currentPosition = Number(e.target.getAttribute("data-position"));
    setStartPosition(currentPosition);

    if (playerShips.length < 1) return;

    setHoverPositions(
      getHoverPositions([playerShips[0].length], currentPosition, axis)
    );
  }

  function handleClick() {
    if (
      playerShips.length < 1 ||
      collides ||
      player.gameBoard.board[startPosition].ship
    )
      return;

    player.gameBoard.placeShip(startPosition, playerShips[0], axis);

    setPlayerShips((prev) => {
      prev.shift();
      return prev;
    });
  }

  // sets game state to middle once player places all their ships
  // this useEffect depends on the startPosition state as it won't be run otherwise
  useEffect(() => {
    if (playerShips.length < 1) changeGameState("middle");
  }, [startPosition]);

  return (
    <div className="relative">
      <button
        onClick={() => setAxis((prev) => (prev === "x" ? "y" : "x"))}
        className="absolute left-1/2 -translate-x-1/2 -top-16 hover:bg-purple-600 focus-visible:bg-purple-600 border-purple-700 border-2
        transition-colors duration-300 hover:border-purple-600 focus-visible:border-purple-600 hover:text-white focus-visible:text-white
        rounded py-2 px-4 text-purple-600"
      >
        Rotate ship
      </button>

      <div
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className="grid grid-cols-10 gap-[1px] shadow-lg cursor-pointer"
      >
        {player.gameBoard.board.map((tile) => (
          <div
            key={tile.id}
            data-position={tile.id}
            className={clsx(
              "w-full aspect-square bg-zinc-800 flex justify-center items-center transition-colors duration-300",
              hoverPositions.includes(tile.id) && !collides && "bg-zinc-700",
              tile.ship && "bg-zinc-600"
            )}
          >
            {tile.isHit && (
              <div
                className={clsx(
                  "bg-teal-700 w-3/4 aspect-square rounded-full flex justify-center items-center",
                  tile.ship && "bg-red-700"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-gray-300 text-center my-4 text-lg lg:text-2xl">
        {player.name}
      </p>
    </div>
  );
}

export function ComputerPlayerBoard({
  player,
  currentPlayer,
  changePlayer,
  gameState,
  changeGameState,
}) {
  // lets human player attack computer's board
  function handleClick(e) {
    if (currentPlayer === "computer" || gameState === "start") return;

    const position = Number(e.target.getAttribute("data-position"));
    player.gameBoard.receiveAttack(position);

    if (player.gameBoard.allShipsSunk()) changeGameState("humanWins");

    changePlayer("computer");
  }

  return (
    <div>
      <div
        onClick={handleClick}
        className="grid grid-cols-10 gap-[1px] shadow-lg cursor-pointer"
      >
        {player.gameBoard.board.map((tile) => (
          <div
            key={tile.id}
            data-position={tile.id}
            className="w-full aspect-square flex justify-center items-center bg-zinc-800 transition-colors duration-300 hover:bg-zinc-700"
          >
            {tile.isHit && (
              <div
                className={clsx(
                  "bg-teal-700 w-3/4 aspect-square rounded-full flex justify-center items-center",
                  tile.ship && "bg-red-700"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-gray-300 text-center my-4 text-lg lg:text-2xl">
        {player.name}
      </p>
    </div>
  );
}
