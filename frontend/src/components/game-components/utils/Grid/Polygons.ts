import { Point, Polygon } from "./Point";
import { Line } from "./Line";

const doLinesIntersect = (
  p1: Point,
  q1: Point,
  p2: Point,
  q2: Point
): boolean => {
  // Helper to find the orientation of the triplet (p, q, r)
  // 0 -> Collinear, 1 -> Clockwise, 2 -> Counterclockwise
  const orientation = (p: Point, q: Point, r: Point): number => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // Collinear
    return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
  };

  // Check if point r lies on segment pq
  const onSegment = (p: Point, q: Point, r: Point): boolean => {
    return (
      Math.min(p.x, q.x) <= r.x &&
      r.x <= Math.max(p.x, q.x) &&
      Math.min(p.y, q.y) <= r.y &&
      r.y <= Math.max(p.y, q.y)
    );
  };

  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  // General case: segments intersect
  if (o1 !== o2 && o3 !== o4) return true;

  // Special cases: collinear points
  if (o1 === 0 && onSegment(p1, q1, p2)) return true;
  if (o2 === 0 && onSegment(p1, q1, q2)) return true;
  if (o3 === 0 && onSegment(p2, q2, p1)) return true;
  if (o4 === 0 && onSegment(p2, q2, q1)) return true;

  return false; // No intersection
};

const isSimplePolygon = (polygon: Point[]): boolean => {
  const n = polygon.length;

  // A polygon must have at least 3 points
  if (n < 3) return false;

  // Check all pairs of edges for intersection
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Edges (p1, q1) and (p2, q2)
      const p1 = polygon[i];
      const q1 = polygon[(i + 1) % n];
      const p2 = polygon[j];
      const q2 = polygon[(j + 1) % n];

      // Skip adjacent edges (including wrap-around edge)
      if (
        j === i + 1 ||
        (i === 0 && j === n - 1) // First and last edges are adjacent in closed polygons
      ) {
        continue;
      }

      // Check if these two edges intersect
      if (doLinesIntersect(p1, q1, p2, q2)) {
        return false; // Invalid polygon: edges intersect
      }
    }
  }

  return true; // All edges are valid
};

export const detectPolygons = (
  lines: Line[],
  completedPolygons: Polygon[],
  onPolygonDetected: (polygon: Polygon) => void,
  onDuplicatePolygon: (polygon: Polygon) => void,
  onCyclicPolygonDetected: (polygon: Polygon) => void
): Set<Point> | null => {
  const adjList = new Map<Point, Set<Point>>();
  const detectedPolygons: Set<string> = new Set(); // Track unique polygons using a stringified key

  // Helper to generate a unique key for a polygon
  const generatePolygonKey = (polygon: Polygon): string => {
    const sortedPoints = Array.from(polygon.points)
      .map((p) => `${p.x},${p.y}`)
      .sort(); // Sort to ensure consistent key
    return sortedPoints.join("-");
  };

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
        const polygon = new Polygon();
        stack.forEach((point) => polygon.addPoint(point));
        const polygonKey = generatePolygonKey(polygon);

        if (!detectedPolygons.has(polygonKey)) {
          detectedPolygons.add(polygonKey);

          const polygonArray = Array.from(polygon.points);
          if (!isSimplePolygon(polygonArray)) {
            onCyclicPolygonDetected(polygon);
            return;
          }

          if (
            !completedPolygons.some((p) => generatePolygonKey(p) === polygonKey)
          ) {
            onPolygonDetected(polygon);
          } else {
            onDuplicatePolygon(polygon);
          }
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

  return detectedPolygons.size > 0 ? null : null;
};

// Highlight and fade the polygon, only after a valid one is detected
export const highlightAndFadePolygon = (
  polygon: Polygon,
  lines: Line[],
  color: string = "#00FF00" // Default to green
) => {
  const linesToFade: Line[] = [];

  // Find and highlight lines forming the polygon
  lines.forEach((line) => {
    if (
      polygon.points.includes(line.start) &&
      polygon.points.includes(line.end)
    ) {
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
