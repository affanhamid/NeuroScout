"use client";

import Game, { BaseGameParams, GameProps, GameState } from "../Game";
import { MutableRefObject } from "react";
import {
  Point,
  Line,
  detectPolygons,
  highlightAndFadePolygon,
  Polygon
} from "../utils";

const HIGHLIGHT_COLOR = "#FFFF00";
const FADED_COLOR = "rgba(255, 255, 255, 0.2)";

interface GridGameState extends GameState {
  completedPolygons: Record<number, Polygon>;
  duplicatePolygons: Record<number, Polygon>;
}

type PointType = {
  x: number;
  y: number;
};

type TrialData = {
  polygons: Record<number, Polygon>;
  duplicatePolygons: Record<number, Polygon>;
  yellowPoints: Point[];
};

export type GridGameData = TrialData[];

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
  currentLineRef: MutableRefObject<Line | null> = {
    current: null
  };
  linesRef: MutableRefObject<Line[]> = { current: [] };

  state: GridGameState = {
    ...this.state,
    completedPolygons: {},
    duplicatePolygons: {}
  };

  constructor(props: GameProps) {
    super(props);
    this.data = [];
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

  drawLine(start: Point, end: Point) {
    const ctx = this.ctxRef.current!;

    if (start && end) {
      ctx.strokeStyle = HIGHLIGHT_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }

  drawLines() {
    this.linesRef.current.forEach((line) => line.draw(this.ctxRef.current!));

    if (this.currentLineRef.current) {
      this.currentLineRef.current.draw(this.ctxRef.current!);
    }
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
    this.gameEndTimeRef.current = Date.now();
  }

  getHUD = () => {
    return this.state.isRunning ? (
      <div className="flex flex-col">
        <span>
          Completed Polygons:{" "}
          {Object.values(this.state.completedPolygons).length}
        </span>
        <span>
          <button onClick={this.resetLines} className="text-xl w-full mt-3">
            Reset Lines
          </button>
        </span>
      </div>
    ) : (
      <div></div>
    );
  };

  resetLines = () => {
    this.linesRef.current = [];
    this.currentLineRef.current = null;
  };

  animate = () => {
    if (!this.canvasRef.current) return;
    this.drawBackground();
    this.drawGrid();
    this.drawLines();

    this.animationFrameIdRef.current = requestAnimationFrame(this.animate);
  };

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
        this.currentLineRef.current = new Line(point, point);
      }
    });
  };

  handleIntearctionMove = (event: MouseEvent) => {
    const { x, y } = this.getInteractionPos(event);
    if (this.currentLineRef.current) {
      this.currentLineRef.current!.end = { x, y } as Point;
    }

    // Hover detection
    this.pointsRef.current.flat().forEach((point) => {
      const distance = this.calculateDistance({ x, y }, point);
      point.setHovered(distance <= this.interactivityRadius && point.isYellow);
    });

    const start = this.currentLineRef.current?.start;

    if (start) {
      // Draw a temporary line
      this.drawBackground();
      this.drawGrid();

      // Check for proximity to yellow points
      this.yellowPointsRef.current.forEach((point) => {
        const distance = this.calculateDistance({ x, y }, point);
        if (distance <= this.interactivityRadius) {
          if (this.currentLineRef.current!.start == point) {
            return;
          }
          const newLine = new Line(start, point);

          // Avoid duplicate lines
          if (!this.linesRef.current.some((line) => line.isEquals(newLine))) {
            this.linesRef.current.push(newLine); // Add the new line
            this.currentLineRef.current!.start = point; // Update the starting point

            // Polygon detection after a valid line
            detectPolygons(
              this.linesRef.current,
              Object.values(this.state.completedPolygons),
              this.newPolygonDetected,
              this.duplicatePolygonDetected,
              this.nonCyclicPolygonDetected
            );
          }
        }
      });
    }

    // Final redraw
    this.drawBackground();
    this.drawGrid();
    this.drawLines();
  };

  newPolygonDetected = (newPolygon: Polygon) => {
    const updatedPolygons = this.state.completedPolygons;
    updatedPolygons[Date.now() - this.gameEndTimeRef.current] = newPolygon;
    this.setState({
      completedPolygons: updatedPolygons
    } as GridGameState);

    // Highlight and fade the polygon
    highlightAndFadePolygon(newPolygon, this.linesRef.current);
    setTimeout(() => {
      this.linesRef.current = [];
    }, 100);
  };

  duplicatePolygonDetected = (polygon: Polygon) => {
    const duplicatePolygons = this.state.duplicatePolygons;
    duplicatePolygons[Date.now() - this.gameEndTimeRef.current] = polygon;
    this.setState({
      duplicatePolygons: duplicatePolygons
    } as GridGameState);

    // Highlight duplicate polygons in red
    highlightAndFadePolygon(polygon, this.linesRef.current, "#FF0000");

    setTimeout(() => {
      this.linesRef.current = [];
    }, 100);
  };

  nonCyclicPolygonDetected = (polygon: Polygon) => {
    this.duplicatePolygonDetected(polygon);
  };

  handleInteractionEnd = () => {
    this.currentLineRef.current = null; // Clear the starting point
  };

  resetGame() {
    this.currentLineRef.current = null;
    this.linesRef.current = [];
    this.data = [
      ...this.data,
      {
        polygons: this.state.completedPolygons,
        duplicatePolygons: this.state.duplicatePolygons,
        yellowPoints: this.yellowPointsRef.current.map(
          (yellowPoint) =>
            ({
              row: yellowPoint.row,
              col: yellowPoint.col
            }) as Point
        )
      }
    ];
    super.resetGame();
    this.setState({
      completedPolygons: {},
      duplicatePolygons: {},
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
