import { Point } from "./Point";

export class Line {
  start: Point;
  end: Point;
  isHighlighted: boolean = false;
  color: string = "#FFFF00";
  opacity: number = 1;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  setHighlighted(isHighlighted: boolean, color: string = "#00FF00") {
    this.isHighlighted = isHighlighted;
    this.color = color; // Green when highlighted
    this.opacity = 1; // Reset opacity to 1 when highlighted
  }

  isEquals(other: Line): boolean {
    return (
      (this.start.isEquals(other.start) && this.end.isEquals(other.end)) ||
      (this.start.isEquals(other.end) && this.end.isEquals(other.start))
    );
  }

  fadeOut(duration: number) {
    const fadeStep = 50; // Time between each fade step (ms)
    const decrement = 1 / (duration / fadeStep); // Opacity decrement per step

    const fadeInterval = setInterval(() => {
      this.opacity -= decrement;
      if (this.opacity <= 0) {
        this.opacity = 0; // Clamp opacity at 0
        clearInterval(fadeInterval); // Stop fading
      }
    }, fadeStep);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.getRGBAColor();
    ctx.lineWidth = 2;
    ctx.globalAlpha = this.opacity; // Apply the opacity
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.globalAlpha = 1; // Reset globalAlpha after drawing
  }

  private getRGBAColor(): string {
    // Convert hex color to RGBA with current opacity
    const hex = this.color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
  }
}
