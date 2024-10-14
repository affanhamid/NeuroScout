// components/Cell.tsx
import React from "react";

export type CellType = {
  id: number;
  hasObject: boolean;
  revealed: boolean;
  selected: boolean;
};

const Cell = ({
  cell,
  onClick,
  clickable,
}: {
  cell: CellType;
  onClick: (id: number) => void;
  clickable: boolean;
}) => {
  const handleClick = () => {
    if (clickable) {
      onClick(cell.id);
    }
  };

  return (
    <div
      className={`border w-24 h-24 rounded-md flex items-center justify-center cursor-pointer text-5xl
        ${cell.revealed ? "bg-blue-300" : "bg-gray-200"} 
        ${
          cell.selected
            ? cell.hasObject
              ? "bg-blue-300"
              : "bg-red-300"
            : "bg-gray-300"
        }`}
      onClick={handleClick}
    >
      {(cell.revealed || cell.selected) && cell.hasObject ? "🧠" : ""}
    </div>
  );
};

export default Cell;
