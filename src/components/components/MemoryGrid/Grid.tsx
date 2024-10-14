// components/Grid.tsx
import React from "react";
import Cell from "./Cell";
import { CellType } from "./Cell";

const Grid = ({
  grid,
  onCellClick,
  clickable,
}: {
  grid: CellType[];
  onCellClick: (id: number) => void;
  clickable: boolean;
}) => {
  return (
    <div
      className={`grid gap-2`}
      style={{ gridTemplateColumns: `repeat(5, 1fr)` }}
    >
      {grid.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          onClick={onCellClick}
          clickable={clickable}
        />
      ))}
    </div>
  );
};

export default Grid;
