export class Point {
  row: number;
  col: number;
  x: number;
  y: number;
  isYellow: boolean = false; // Whether the point is highlighted
  isHovered: boolean = false; // Whether the point is currently hovered

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

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
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

export type LineType = {
  start: Point;
  end: Point;
};

export type PolygonType = Set<Point>;
