"use client";
import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Countdown from "../Countdown/Countdown";

type CellType = {
  id: number;
  hasObject: boolean;
  revealed: boolean;
  selected: boolean;
};

const MemoryGrid = () => {
  const initialGridSize = 5;
  const [grid, setGrid] = useState<CellType[]>([]);
  const [gridSize, setGridSize] = useState<number>(initialGridSize);
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(true);
  const [clickable, setClickable] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [triesLeft, setTriesLeft] = useState<number>(2);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const setObjects = () => {
    const numberOfObjects = 5 + level - 1;
    const tempObjectIds: number[] = [];
    while (tempObjectIds.length < numberOfObjects) {
      const randomId = Math.floor(Math.random() * gridSize * gridSize);
      if (!tempObjectIds.includes(randomId)) {
        tempObjectIds.push(randomId);
      }
    }
    setObjectIds(tempObjectIds);
    const updatedGrid = grid.map((cell) => ({
      ...cell,
      hasObject: tempObjectIds.includes(cell.id),
      revealed: true,
      selected: false,
    }));
    setGrid(updatedGrid);
    setIsDisplaying(true);
    setClickable(false);
    setObjectIds(tempObjectIds);

    const timer = setTimeout(() => {
      const hiddenGrid = updatedGrid.map((cell) => ({
        ...cell,
        revealed: false,
      }));
      setGrid(hiddenGrid);
      setIsDisplaying(false);
      setClickable(true);
    }, 1000);
  };

  useEffect(() => {
    const tempGrid: CellType[] = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      tempGrid.push({
        id: i,
        hasObject: false,
        revealed: false,
        selected: false,
      });
    }
    setGrid(tempGrid);
  }, [level, gridSize]);

  const handleCellClick = (id: number) => {
    if (selectedIds.includes(id) || gameOver) return;
    const updatedGrid = grid.map((cell) =>
      cell.id === id ? { ...cell, selected: true } : cell
    );
    setGrid(updatedGrid);

    setSelectedIds([...selectedIds, id]);

    if (objectIds.includes(id)) {
      setScore(score + 1);
      if (score + 1 === objectIds.length) {
        setTimeout(() => {
          setScore(0);
          setSelectedIds([]);
          setTriesLeft(3);
          setGameStarted(false);
          setObjects();
        }, 500);
      }
    } else {
      setTriesLeft((prevTries) => prevTries - 1);
      if (triesLeft === 1) {
        setTimeout(() => {
          // Game Over logic without level increment
          setScore(0); // Reset score
          setSelectedIds([]); // Reset selected IDs
          setTriesLeft(3); // Reset tries
          setGameStarted(false); // Show countdown again
          setGameOver(false); // Restart the game
          setObjects(); // Reset objects without increasing level
        }, 500);
      }
    }
  };

  // Function to handle completion of the countdown
  const handleCountdownComplete = () => {
    setGameStarted(true);
    setObjects(); // Set the objects when countdown completes
  };

  return (
    <main className="w-screen h-screen bg-game-background flex flex-col items-center justify-center">
      {!gameStarted && <Countdown onComplete={handleCountdownComplete} />}
      <Grid grid={grid} onCellClick={handleCellClick} clickable={clickable} />
      <div className="text-white mt-4 text-xl">Tries Left: {triesLeft}</div>
      <div className="text-white mt-4 text-xl">Level: {level}</div>
    </main>
  );
};

export default MemoryGrid;
