export class Point {
  row: number;
  col: number;
  x: number;
  y: number;
  isYellow: boolean = false;
  isHovered: boolean = false;

  constructor(row: number, col: number, x: number, y: number) {
    this.row = row;
    this.col = col;
    this.x = x;
    this.y = y;
  }

  setYellow(isYellow: boolean) {
    this.isYellow = isYellow;
  }

  setHovered(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  isEquals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  greaterThan(other: Point): boolean {
    if (this.x !== other.x) {
      return this.x > other.x;
    }
    return this.y > other.y;
  }

  toString(): string {
    return `${this.col},${this.row}`;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    showYellow: boolean,
    highlightColor: string,
    fadedColor: string
  ) {
    ctx.fillStyle = showYellow
      ? this.isYellow
        ? highlightColor
        : fadedColor
      : "#FFFFFF";

    ctx.beginPath();
    ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
    ctx.fill();

    if (this.isHovered) {
      ctx.strokeStyle = highlightColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

export class Polygon {
  points: Point[];
  constructor() {
    this.points = [];
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  isEqual(polygon: Polygon): boolean {
    if (this.points.length !== polygon.points.length) {
      return false;
    }

    const sortedPoints1 = this.points
      .slice()
      .sort((a, b) => (a.greaterThan(b) ? 1 : -1));
    const sortedPoints2 = polygon.points
      .slice()
      .sort((a, b) => (a.greaterThan(b) ? 1 : -1));

    for (let i = 0; i < sortedPoints1.length; i++) {
      if (!sortedPoints1[i].isEquals(sortedPoints2[i])) {
        return false;
      }
    }

    return true;
  }
}
