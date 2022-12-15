import React from "react";
import clsx from "clsx";

export default function Gameboard({ gameBoard, isHuman = false }) {
  return (
    <div className="grid grid-cols-10 gap-[1px] shadow-lg cursor-pointer">
      {gameBoard.board.map((tile) => (
        <div
          key={tile.id}
          data-position={tile.id}
          className={clsx(
            !isHuman && "hover:bg-zinc-700",
            "w-full aspect-square bg-zinc-800 transition-colors duration-300"
          )}
        ></div>
      ))}
    </div>
  );
}
