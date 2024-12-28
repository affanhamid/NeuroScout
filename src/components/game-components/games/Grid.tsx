"use client";

import Game, { BaseGameParams, GameProps, GameState } from "../Game";
import { MutableRefObject } from "react";
import { Point, Line, detectPolygons, highlightAndFadePolygon } from "../utils";

const HIGHLIGHT_COLOR = "#FFFF00";
const FADED_COLOR = "rgba(255, 255, 255, 0.2)";

interface GridGameState extends GameState {
  completedPolygons: Set<string>;
}

type PointType = {
  x: number;
  y: number;
};

export type GridGameData = {
  polygons: string[];
};

type GridGameParams = BaseGameParams & {};

class GridGame extends Game<GridGameData, GridGameParams> {
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
  animationFrameId: number | null = null;

  state: GridGameState = {
    ...this.state,
    completedPolygons: new Set()
  };

  constructor(props: GameProps) {
    super(props);
    this.data = {
      polygons: []
    };
  }

  addEventListenersDuringGame = () => {
    this.eventHandler!.add("mousedown", this.handleInteractionStart);
    this.eventHandler!.add("mousemove", this.handleIntearctionMove);
    this.eventHandler!.add("mouseup", this.handleInteractionEnd);

    this.eventHandler!.add("touchstart", this.handleInteractionStart);
    this.eventHandler!.add("touchmove", this.handleIntearctionMove);
    this.eventHandler!.add("touchend", this.handleInteractionEnd);
  };

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
    const yellowPoints: Point[] = [];

    // Helper function to check if three points are collinear
    const areCollinear = (p1: Point, p2: Point, p3: Point): boolean => {
      // Use the area of the triangle formed by the three points
      // If the area is 0, they are collinear
      return (
        p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y) === 0
      );
    };

    // Check if adding a new point violates the collinearity constraint
    const isValidPoint = (newPoint: Point) => {
      for (let i = 0; i < yellowPoints.length; i++) {
        for (let j = i + 1; j < yellowPoints.length; j++) {
          if (areCollinear(yellowPoints[i], yellowPoints[j], newPoint)) {
            return false; // Found three collinear points
          }
        }
      }
      return true; // No collinearity issues
    };

    while (yellowPoints.length < 5) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      const point = this.pointsRef.current![row][col];

      if (!point.isYellow && isValidPoint(point)) {
        point.setYellow(true);
        yellowPoints.push(point);
      }
    }

    this.yellowPointsRef.current = yellowPoints;
  }

  getHUD() {
    const shouldShowHUD = !this.state.showInstructions && 
                         !this.state.showTrialComplete && 
                         !this.state.showPracticeComplete && 
                         !this.state.showThankYou;

    if (!shouldShowHUD) return null;

    return (
      <div className="absolute top-10 right-10 text-white text-lg flex flex-col gap-2">
        {this.showTimer != -1 && (
          <span>
            {this.state.isPractice
              ? `Practice Trial: ${this.state.trial}`
              : `Trial: ${this.state.trial}`}{" "}
            | Time Left: {this.showTimer}s
            | Total Shapes: {this.state.completedPolygons.size}
          </span>
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

  getInteractionPos = (event: MouseEvent | TouchEvent) => {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    } else {
      const touch = event.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  };

  handleInteractionStart = (event: MouseEvent | TouchEvent) => {
    const { x, y } = this.getInteractionPos(event);

    this.yellowPointsRef.current.forEach((point) => {
      const distance = this.calculateDistance({ x, y }, point);
      if (distance <= this.interactivityRadius) {
        this.currentLineStartRef.current = point;
        this.mousePosRef.current = { x: point.x, y: point.y };
      }
    });
  };

  handleIntearctionMove = (event: MouseEvent) => {
    const { x, y } = this.getInteractionPos(event);

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
                void polygonKey;
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

  handleInteractionEnd = () => {
    this.currentLineStartRef.current = null; // Clear the starting point
    this.mousePosRef.current = null; // Clear the mouse position
  };

  resetGame() {
    this.currentLineStartRef.current = null;
    this.mousePosRef.current = null;
    this.linesRef.current = [];
    this.data = {
      polygons: [
        ...this.data.polygons,
        ...Array.from(this.state.completedPolygons)
      ]
    };
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
