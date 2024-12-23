"use client";

import Game, { GameProps, GameState } from "../Game";
import type { GameType } from "@/types";
import { MutableRefObject } from "react";
import {
  Point,
  PolygonType,
  Line,
  detectPolygons,
  getMaxPolygons,
  highlightAndFadePolygon
} from "../utils";

const HIGHLIGHT_COLOR = "#FFFF00";
const FADED_COLOR = "rgba(255, 255, 255, 0.2)";

interface GridGameState extends GameState {
  completedPolygons: Set<string>;
}

type PointType = {
  x: number;
  y: number;
};

export type GridData = {
  noOfPolygons: number;
};

class GridGame extends Game<GridData, GameType["parameters"]> {
  // Grid
  gridSizeRef: MutableRefObject<number> = { current: 5 };
  gridTotalSizeRef: MutableRefObject<number> = { current: 600 };

  // Points
  pointsRef: MutableRefObject<Point[][]> = { current: [] };
  yellowPointsRef: MutableRefObject<Point[]> = { current: [] };
  hoveredPointRef: MutableRefObject<Point | null> = { current: null };
  showYellowRef: MutableRefObject<boolean> = { current: false };
  interactivityRadius = 30;

  // Lines
  currentLineStartRef: MutableRefObject<Point | null> = {
    current: null
  };
  mousePosRef: MutableRefObject<{ x: number; y: number } | null> = {
    current: null
  };
  linesRef: MutableRefObject<Line[]> = { current: [] };

  // Polygons
  polygonsRef: MutableRefObject<Set<PolygonType>> = { current: new Set() };
  animationFrameId: number | null = null;

  state: GridGameState = {
    ...this.state,
    completedPolygons: new Set()
  };

  constructor(props: GameProps) {
    super(props);
    this.data = {
      noOfPolygons: 0
    };
  }

  calculateDistance(p1: PointType, p2: PointType): number {
    const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    return distance;
  }

  initializePoints() {
    const gridSize = this.gridSizeRef.current;
    const gridTotalSize = this.gridTotalSizeRef.current;

    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const cellSize = gridTotalSize / (gridSize - 1);
    const startX = (canvas.width - gridTotalSize) / 2;
    const startY = (canvas.height - gridTotalSize) / 2;

    const points: Point[][] = [];

    for (let row = 0; row < gridSize; row++) {
      const rowPoints: Point[] = [];
      for (let col = 0; col < gridSize; col++) {
        const x = startX + col * cellSize;
        const y = startY + row * cellSize;
        rowPoints.push(new Point(row, col, x, y));
      }
      points.push(rowPoints);
    }

    this.pointsRef.current = points;
  }

  drawLine() {
    const ctx = this.ctxRef.current!;
    const start = this.currentLineStartRef.current;
    const end = this.mousePosRef.current;

    if (start && end) {
      ctx.strokeStyle = HIGHLIGHT_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }

    this.linesRef.current.forEach((line) => {
      line.draw(ctx);
    });
  }

  drawGrid() {
    const ctx = this.ctxRef.current!;
    const points = this.pointsRef.current!;
    const showYellow = this.showYellowRef.current;

    points
      .flat()
      .forEach((point) =>
        point.draw(ctx, showYellow, HIGHLIGHT_COLOR, FADED_COLOR)
      );
  }

  generateYellowPoints() {
    const gridSize = this.gridSizeRef.current!;
    const rowCounts = Array(gridSize).fill(0);
    const colCounts = Array(gridSize).fill(0);
    const yellowPoints: Point[] = [];

    while (yellowPoints.length < 5) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      const point = this.pointsRef.current![row][col];

      if (rowCounts[row] < 2 && colCounts[col] < 2 && !point.isYellow) {
        point.setYellow(true);
        yellowPoints.push(point);
        rowCounts[row]++;
        colCounts[col]++;
      }
    }

    this.yellowPointsRef.current = yellowPoints;
  }

  getHUD() {
    return (
      <div className="absolute top-10 right-10 text-white text-lg flex flex-col gap-2">
        <span>
          Trial: {this.state.trial} | Time Left: {this.showTimer}s
        </span>
        {this.state.isRunning && (
          <>
            <span>Total Shapes: {this.state.completedPolygons.size}</span>
            <span>
              Maximum shapes possible:{" "}
              {getMaxPolygons(this.yellowPointsRef.current)}
            </span>
          </>
        )}
      </div>
    );
  }

  // Start the single animation loop
  startAnimationLoop() {
    const animate = () => {
      this.drawBackground();
      this.drawGrid();
      this.drawLine(); // Draw all lines, including faded ones

      // Continue the animation loop
      this.animationFrameId = requestAnimationFrame(animate);
    };

    // Start the loop
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(animate);
    }
  }

  stopAnimationLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  getMousePosition = (event: MouseEvent) => {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  handleMouseDown = (event: MouseEvent) => {
    const { x, y } = this.getMousePosition(event);

    this.yellowPointsRef.current.forEach((point) => {
      const distance = this.calculateDistance({ x, y }, point);
      if (distance <= this.interactivityRadius) {
        this.currentLineStartRef.current = point; // Set the starting point
        this.mousePosRef.current = { x: point.x, y: point.y };
      }
    });
  };

  handleMouseInteraction = (event: MouseEvent) => {
    const { x, y } = this.getMousePosition(event);

    // Hover detection
    this.pointsRef.current.flat().forEach((point) => {
      const distance = this.calculateDistance({ x, y }, point);
      point.setHovered(distance <= this.interactivityRadius && point.isYellow);
    });

    const start = this.currentLineStartRef.current;

    if (start) {
      // Draw a temporary line
      this.mousePosRef.current = { x, y };
      this.drawBackground();
      this.drawGrid();
      this.drawLine();

      // Check for proximity to yellow points
      this.yellowPointsRef.current.forEach((point) => {
        const distance = this.calculateDistance({ x, y }, point);
        if (distance <= this.interactivityRadius) {
          const newLine = new Line(start, point);

          // Avoid duplicate lines
          if (!this.linesRef.current.some((line) => line.equals(newLine))) {
            this.linesRef.current.push(newLine); // Add the new line
            this.currentLineStartRef.current = point; // Update the starting point

            // Polygon detection after a valid line
            detectPolygons(
              this.linesRef.current,
              this.state.completedPolygons,
              (newPolygonKey, newPolygon) => {
                const updatedPolygons = new Set<string>(
                  this.state.completedPolygons
                );
                updatedPolygons.add(newPolygonKey);
                this.setState({
                  completedPolygons: updatedPolygons
                } as GridGameState);

                // Highlight and fade the polygon
                highlightAndFadePolygon(newPolygon, this.linesRef.current);
                setTimeout(() => {
                  this.linesRef.current = [];
                }, 500);
              },
              (polygonKey, polygon) => {
                // Highlight duplicate polygons in red
                highlightAndFadePolygon(
                  polygon,
                  this.linesRef.current,
                  "#FF0000"
                );

                setTimeout(() => {
                  this.linesRef.current = [];
                }, 500);
              }
            );
          }
        }
      });
    }

    // Final redraw
    this.drawBackground();
    this.drawGrid();
    this.drawLine();
  };

  handleMouseMove = this.handleMouseInteraction;

  handleMouseUp = () => {
    this.currentLineStartRef.current = null; // Clear the starting point
    this.mousePosRef.current = null; // Clear the mouse position
  };

  resetGame() {
    this.currentLineStartRef.current = null;
    this.mousePosRef.current = null;
    this.linesRef.current = [];
    this.data = {
      noOfPolygons: this.state.completedPolygons.size
    };
    this.polygonsRef.current.clear();
    super.resetGame();
    this.setState({
      completedPolygons: new Set(),
      trial: this.state.trial + 1
    } as GridGameState);
  }

  renderGame() {
    this.drawBackground();
    this.initializePoints();
    this.drawGrid();

    setTimeout(() => {
      this.generateYellowPoints();
      this.showYellowRef.current = true;
      this.drawBackground();
      this.drawGrid();
    }, 1000);

    // Start the animation loop
    this.startAnimationLoop();
  }
}

export default GridGame;
