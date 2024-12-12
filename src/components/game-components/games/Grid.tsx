"use client";

import Game, { GameProps } from "../Game";
import type { GameType } from "@/types";
import { createRef, MutableRefObject } from "react";

const HIGHLIGHT_COLOR = "#FFFF00"; // Highlight color for yellow points
const FADED_COLOR = "rgba(255, 255, 255, 0.2)"; // Faded color for non-highlighted points
const GREEN_COLOR = "#00FF00"; // Color for lines forming polygons

class GridGame extends Game<GameType["parameters"]> {
  gridSizeRef: MutableRefObject<number> = createRef(); // Number of rows/columns
  gridTotalSizeRef: MutableRefObject<number> = createRef(); // Total grid size in pixels
  yellowPointsRef: MutableRefObject<{ row: number; col: number }[]> =
    createRef(); // Coordinates of highlighted points
  hoveredPointRef: MutableRefObject<{ row: number; col: number } | null> =
    createRef(); // Currently hovered point
  currentLineRef: MutableRefObject<{ x: number; y: number } | null> =
    createRef(); // Line starting point
  mousePosRef: MutableRefObject<{ x: number; y: number } | null> = createRef(); // Current mouse position
  linesRef: MutableRefObject<
    { start: { x: number; y: number }; end: { x: number; y: number } }[]
  > = createRef(); // List of all lines
  showYellowRef: MutableRefObject<boolean> = createRef(); // Whether to show yellow points and fading

  constructor(props: GameProps) {
    super(props);
    this.gridSizeRef.current = 5; // Default grid size: 5x5
    this.gridTotalSizeRef.current = 600; // Fixed grid size (600px x 600px)
    this.yellowPointsRef.current = []; // Initially no highlighted points
    this.hoveredPointRef.current = null; // No hovered point initially
    this.currentLineRef.current = null; // No line being drawn initially
    this.mousePosRef.current = null; // No mouse position initially
    this.linesRef.current = []; // No lines initially
    this.showYellowRef.current = false; // Initially hide yellow points and fading
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
    const showYellow = this.showYellowRef.current;

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

        ctx.fillStyle = showYellow
          ? isYellow
            ? HIGHLIGHT_COLOR
            : FADED_COLOR
          : "#FFFFFF"; // Show faded effect if yellow points are displayed
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2); // Draw point
        ctx.fill();

        // Draw a ring if the point is hovered and is a highlighted point
        if (
          showYellow &&
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

  drawLine() {
    const ctx = this.ctxRef.current!;
    const start = this.currentLineRef.current;
    const end = this.mousePosRef.current;

    // Draw the current line being drawn
    if (start && end) {
      ctx.strokeStyle = HIGHLIGHT_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }

    // Draw all stored lines
    this.linesRef.current!.forEach((line) => {
      ctx.strokeStyle = HIGHLIGHT_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
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

  handleMouseDown(event: MouseEvent) {
    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridSize = this.gridSizeRef.current!;
    const gridTotalSize = this.gridTotalSizeRef.current!;
    const cellSize = gridTotalSize / (gridSize - 1);
    const startX = (canvas.width - gridTotalSize) / 2;
    const startY = (canvas.height - gridTotalSize) / 2;

    const yellowPoints = this.yellowPointsRef.current!;
    for (const point of yellowPoints) {
      const x = startX + point.col * cellSize;
      const y = startY + point.row * cellSize;

      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      if (distance <= 12) {
        this.currentLineRef.current = { x, y };
        this.mousePosRef.current = { x, y };
        this.startAnimationLoop();
        return;
      }
    }
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
        hoveredPoint = { row: point.row, col: point.col };
        break;
      }
    }

    this.hoveredPointRef.current = hoveredPoint; // Update the hovered point
    this.mousePosRef.current = { x: mouseX, y: mouseY }; // Update mouse position for line drawing
    this.drawBackground(); // Clear the canvas
    this.drawGrid(); // Redraw the grid with hover state
    this.drawLine(); // Redraw the line if it exists
  }

  handleMouseUp() {
    const start = this.currentLineRef.current;
    const mouseEnd = this.mousePosRef.current;

    if (start && mouseEnd) {
      const gridSize = this.gridSizeRef.current!;
      const gridTotalSize = this.gridTotalSizeRef.current!;
      const cellSize = gridTotalSize / (gridSize - 1);
      const startX = (this.canvasRef.current!.width - gridTotalSize) / 2;
      const startY = (this.canvasRef.current!.height - gridTotalSize) / 2;

      const yellowPoints = this.yellowPointsRef.current!;

      // Find the nearest yellow point to the mouse end position
      for (const point of yellowPoints) {
        const x = startX + point.col * cellSize;
        const y = startY + point.row * cellSize;
        const distance = Math.sqrt(
          (mouseEnd.x - x) ** 2 + (mouseEnd.y - y) ** 2
        );

        if (distance <= 12) {
          // Add a valid line only if the end point is a yellow point
          this.linesRef.current!.push({ start: { ...start }, end: { x, y } });
          this.checkForShapes();
          break;
        }
      }
    }

    this.currentLineRef.current = null;
    this.mousePosRef.current = null;
  }

  checkForShapes() {
    const points = new Map<string, { x: number; y: number }>();
    const adjList = new Map<string, Set<string>>();

    // Create adjacency list
    this.linesRef.current.forEach(({ start, end }) => {
      const startKey = `${start.x},${start.y}`;
      const endKey = `${end.x},${end.y}`;

      if (!adjList.has(startKey)) adjList.set(startKey, new Set());
      if (!adjList.has(endKey)) adjList.set(endKey, new Set());

      adjList.get(startKey)!.add(endKey);
      adjList.get(endKey)!.add(startKey);

      points.set(startKey, start);
      points.set(endKey, end);
    });

    const visited = new Set<string>();
    const stack: string[] = [];
    const foundPolygons: Set<string>[] = [];

    // Depth First Search to find cycles
    const dfs = (node: string, parent: string | null, path: string[]) => {
      visited.add(node);
      stack.push(node);

      adjList.get(node)?.forEach((neighbor) => {
        if (neighbor === parent) return; // Ignore the edge we came from

        if (visited.has(neighbor)) {
          const cycleStartIndex = stack.indexOf(neighbor);
          if (cycleStartIndex !== -1) {
            foundPolygons.push(new Set(stack.slice(cycleStartIndex)));
          }
        } else {
          dfs(neighbor, node, [...path, neighbor]);
        }
      });

      stack.pop();
    };

    adjList.forEach((_, node) => {
      if (!visited.has(node)) {
        dfs(node, null, []);
      }
    });

    // Highlight lines forming polygons
    foundPolygons.forEach((polygon) => {
      this.linesRef.current.forEach((line) => {
        const startKey = `${line.start.x},${line.start.y}`;
        const endKey = `${line.end.x},${line.end.y}`;

        if (polygon.has(startKey) && polygon.has(endKey)) {
          const ctx = this.ctxRef.current!;
          ctx.strokeStyle = GREEN_COLOR;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(line.start.x, line.start.y);
          ctx.lineTo(line.end.x, line.end.y);
          ctx.stroke();
        }
      });
    });
  }

  startAnimationLoop() {
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      lastTimestamp = timestamp;

      // Clear canvas and redraw
      this.drawBackground();
      this.drawGrid();
      this.drawLine();

      if (this.currentLineRef.current) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  renderGame() {
    this.drawBackground();
    this.drawGrid(); // Draw the initial grid

    // After 1 second, generate and display highlighted points with fading effect
    setTimeout(() => {
      this.generateYellowPoints();
      this.showYellowRef.current = true; // Enable yellow points and fading
      this.drawBackground();
      this.drawGrid(); // Redraw the grid with updated yellow points and fading
    }, 1000);
  }
}

export default GridGame;
