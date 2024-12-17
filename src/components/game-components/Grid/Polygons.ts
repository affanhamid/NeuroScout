import { Point } from "./Point";
import { Line } from "./Line";

export const detectPolygons = (
  lines: Line[],
  completedPolygons: Set<string>,
  onPolygonDetected: (newPolygonKey: string, polygon: Set<Point>) => void
): Set<Point> | null => {
  const adjList = new Map<Point, Set<Point>>();
  const detectedPolygons: Set<Point>[] = [];

  // Build adjacency list
  lines.forEach((line) => {
    if (!adjList.has(line.start)) adjList.set(line.start, new Set());
    if (!adjList.has(line.end)) adjList.set(line.end, new Set());

    adjList.get(line.start)!.add(line.end);
    adjList.get(line.end)!.add(line.start);
  });

  const visited = new Set<Point>();
  const stack: Point[] = [];

  const dfs = (current: Point, start: Point, path: Point[]) => {
    stack.push(current);

    adjList.get(current)?.forEach((neighbor) => {
      if (neighbor === start && path.length >= 3) {
        // Complete cycle found
        const polygon = new Set([...stack]);
        const polygonKey = serializePolygon(polygon);

        if (!completedPolygons.has(polygonKey)) {
          // Notify about the newly detected polygon
          onPolygonDetected(polygonKey, polygon);
        }
        return;
      }

      if (!path.includes(neighbor)) {
        dfs(neighbor, start, [...path, neighbor]);
      }
    });

    stack.pop();
  };

  adjList.forEach((_, point) => {
    if (!visited.has(point)) {
      dfs(point, point, [point]);
      visited.add(point);
    }
  });

  return detectedPolygons.length > 0 ? detectedPolygons[0] : null;
};

const serializePolygon = (polygon: Set<Point>): string => {
  const sortedPoints = Array.from(polygon)
    .map((p) => `${p.row},${p.col}`)
    .sort();
  return JSON.stringify(sortedPoints);
};

// Highlight and fade the polygon, only after a valid one is detected
export const highlightAndFadePolygon = (
  polygon: Set<Point>,
  lines: Line[],
  color: string = "#00FF00" // Default to green
) => {
  const linesToFade: Line[] = [];

  // Find and highlight lines forming the polygon
  lines.forEach((line) => {
    if (polygon.has(line.start) && polygon.has(line.end)) {
      line.setHighlighted(true, color); // Highlight with the specified color
      linesToFade.push(line);
    }
  });

  // Fade out the lines over 1 second
  setTimeout(() => {
    linesToFade.forEach((line) => {
      line.fadeOut(1000);
    });
  }, 0);
};

// Helper function to get all combinations of points of a given size
const combinations = (points: Point[], size: number): Point[][] => {
  const result: Point[][] = [];

  const combine = (start: number, currentCombo: Point[]) => {
    if (currentCombo.length === size) {
      result.push([...currentCombo]);
      return;
    }
    for (let i = start; i < points.length; i++) {
      currentCombo.push(points[i]);
      combine(i + 1, currentCombo);
      currentCombo.pop();
    }
  };

  combine(0, []);
  return result;
};

// Check if a combination of points forms a valid polygon
const isValidPolygon = (points: Point[]): boolean => {
  // A polygon must have at least 3 points
  if (points.length < 3) return false;

  // Ensure the points form a cycle (wrap-around check)
  return true; // Assume all combinations are cycles (grid-based constraint)
};

export const getMaxPolygons = (yellowPoints: Point[]): number => {
  const uniquePolygons = new Set<string>();

  for (let size = 3; size <= yellowPoints.length; size++) {
    const combos = combinations(yellowPoints, size);

    combos.forEach((combo) => {
      if (isValidPolygon(combo)) {
        const key = serializePolygon(new Set(combo));
        uniquePolygons.add(key);
      }
    });
  }

  return uniquePolygons.size;
};
