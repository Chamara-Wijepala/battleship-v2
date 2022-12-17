import { useState } from "react";
import clsx from "clsx";

import { checkCollisions } from "../utils/checkCollisions";

export default function Gameboard({ gameBoard, ships, axis, isHuman = false }) {
  const [startPosition, setStartPosition] = useState(null);
  const [hoverPositions, setHoverPositions] = useState([]);
  const [playerShips, setPlayerShips] = useState(Object.values(ships));

  const collides = checkCollisions(
    startPosition,
    playerShips[0],
    gameBoard,
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
    if (playerShips.length < 1 || collides) return;

    gameBoard.placeShip(startPosition, playerShips[0], axis);

    setPlayerShips((prev) => {
      prev.shift();
      return prev;
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="grid grid-cols-10 gap-[1px] shadow-lg cursor-pointer"
    >
      {gameBoard.board.map((tile) => (
        <div
          key={tile.id}
          data-position={tile.id}
          className={clsx(
            "w-full aspect-square bg-zinc-800 transition-colors duration-300",
            !isHuman && "hover:bg-zinc-700",
            isHuman &&
              hoverPositions.includes(tile.id) &&
              !collides &&
              "bg-zinc-700",
            isHuman && tile.ship && "bg-zinc-600"
          )}
        />
      ))}
    </div>
  );
}
