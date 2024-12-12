"use client";

import Game, { GameProps } from "../Game";
import type { GameType } from "@/types";
import { createRef, MutableRefObject } from "react";

const HIGHLIGHT_COLOR = "#FFFF00"; // Highlight color for selected points

class GridGame extends Game<GameType["parameters"]> {
  gridSizeRef: MutableRefObject<number> = createRef(); // Number of rows/columns
  gridTotalSizeRef: MutableRefObject<number> = createRef(); // Total grid size in pixels
  yellowPointsRef: MutableRefObject<{ row: number; col: number }[]> =
    createRef(); // Coordinates of highlighted points
  hoveredPointRef: MutableRefObject<{ row: number; col: number } | null> =
    createRef(); // Stores the currently hovered point

  constructor(props: GameProps) {
    super(props);
    this.gridSizeRef.current = 5; // Default grid size: 5x5
    this.gridTotalSizeRef.current = 600; // Fixed grid size (600px x 600px)
    this.yellowPointsRef.current = []; // Initially no highlighted points
    this.hoveredPointRef.current = null; // No hovered point initially
  }

  drawBackground() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;

    ctx.fillStyle = "#1B1B1B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawGrid() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;
    const gridSize = this.gridSizeRef.current!;
    const gridTotalSize = this.gridTotalSizeRef.current!;
    const yellowPoints = this.yellowPointsRef.current!;
    const hoveredPoint = this.hoveredPointRef.current;

    const cellSize = gridTotalSize / (gridSize - 1); // Distance between points
    const startX = (canvas.width - gridTotalSize) / 2; // Starting X position to center
    const startY = (canvas.height - gridTotalSize) / 2; // Starting Y position to center

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = startX + col * cellSize;
        const y = startY + row * cellSize;

        // Check if the current point is in yellowPoints
        const isYellow = yellowPoints.some(
          (point) => point.row === row && point.col === col
        );

        ctx.fillStyle = isYellow ? HIGHLIGHT_COLOR : "#FFFFFF"; // Highlighted or default color
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2); // Draw point
        ctx.fill();

        // Draw a ring if the point is hovered and is a highlighted point
        if (
          isYellow &&
          hoveredPoint &&
          hoveredPoint.row === row &&
          hoveredPoint.col === col
        ) {
          ctx.strokeStyle = HIGHLIGHT_COLOR;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2); // Draw ring slightly larger than the point
          ctx.stroke();
        }
      }
    }
  }

  generateYellowPoints() {
    const gridSize = this.gridSizeRef.current!;
    const rowCounts = Array(gridSize).fill(0);
    const colCounts = Array(gridSize).fill(0);
    const yellowPoints: { row: number; col: number }[] = [];

    while (yellowPoints.length < 5) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      // Ensure no row or column has more than 2 yellow points
      if (rowCounts[row] < 2 && colCounts[col] < 2) {
        // Ensure the point is not already selected
        if (
          !yellowPoints.some((point) => point.row === row && point.col === col)
        ) {
          yellowPoints.push({ row, col });
          rowCounts[row]++;
          colCounts[col]++;
        }
      }
    }

    this.yellowPointsRef.current = yellowPoints; // Update highlighted points
  }

  handleMouseMove(event: MouseEvent) {
    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridSize = this.gridSizeRef.current!;
    const gridTotalSize = this.gridTotalSizeRef.current!;
    const cellSize = gridTotalSize / (gridSize - 1);
    const startX = (canvas.width - gridTotalSize) / 2;
    const startY = (canvas.height - gridTotalSize) / 2;

    let hoveredPoint = null;

    const yellowPoints = this.yellowPointsRef.current!;
    for (const point of yellowPoints) {
      const x = startX + point.col * cellSize;
      const y = startY + point.row * cellSize;
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      if (distance <= 12) {
        // Threshold for "vicinity" of the point
        hoveredPoint = { row: point.row, col: point.col };
        break;
      }
    }

    this.hoveredPointRef.current = hoveredPoint; // Update the hovered point
    this.drawBackground(); // Clear the canvas
    this.drawGrid(); // Redraw the grid with the updated hover state
  }

  renderGame() {
    this.drawBackground();
    this.drawGrid(); // Draw the initial grid

    // After 1 second, generate and display highlighted points
    setTimeout(() => {
      this.generateYellowPoints();
      this.drawBackground(); // Clear the canvas
      this.drawGrid(); // Redraw the grid with highlighted points
    }, 1000);

    // Add mouse move listener to detect hover
    this.canvasRef.current!.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
  }
}

export default GridGame;
