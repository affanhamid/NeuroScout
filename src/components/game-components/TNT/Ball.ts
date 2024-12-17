export const BASE_COLOR = "#FDDA0D";
export const HIGHLIGHT_COLOR = "#007FFF";
export const GLOW_COLOR = "#00FF00";
export const WRONG_COLOR = "#FF0000";
export const CORRECT_COLOR = "#00FF00";

export class Ball {
  x: number;
  y: number;
  angle: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;

  constructor(
    x: number,
    y: number,
    angle: number,
    ballRadius: number,
    currentSpeed: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = ballRadius;
    this.vx = Math.cos(this.angle) * currentSpeed;
    this.vy = Math.sin(this.angle) * currentSpeed;
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  reset() {
    this.color = BASE_COLOR;
  }

  addMarks(
    ball: Ball,
    ctx: CanvasRenderingContext2D,
    isWrongBall: boolean | null,
    isCorrectBall: boolean | null
  ): void {
    ctx.font = `${ball.radius}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (isCorrectBall) {
      ctx.fillStyle = "rgb(11, 218, 81)";
      ctx.fillText("✓", ball.x, ball.y);
    } else if (isWrongBall) {
      ctx.fillStyle = "red";
      ctx.fillText("✕", ball.x, ball.y);
    }
  }

  drawBall(
    ball: Ball,
    isHighlighted: boolean,
    ctx: CanvasRenderingContext2D,
    isWrongBall: boolean | null,
    isCorrectBall: boolean | null
  ): void {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : this.getColor();
    ctx.fill();
    ctx.closePath();

    this.addMarks(ball, ctx, isWrongBall, isCorrectBall);
  }
}

// Create balls in different regions
const createRegions = (canvasWidth: number, canvasHeight: number) => [
  { x: canvasWidth * 0.25, y: canvasHeight * 0.25 },
  { x: canvasWidth * 0.75, y: canvasHeight * 0.25 },
  { x: canvasWidth * 0.25, y: canvasHeight * 0.5 },
  { x: canvasWidth * 0.75, y: canvasHeight * 0.5 },
  { x: canvasWidth * 0.25, y: canvasHeight * 0.75 },
  { x: canvasWidth * 0.75, y: canvasHeight * 0.75 },
  { x: canvasWidth * 0.5, y: canvasHeight * 0.25 },
  { x: canvasWidth * 0.5, y: canvasHeight * 0.75 }
];

export const createBalls = <T extends Ball>(
  canvas: HTMLCanvasElement,
  ballRadius: number,
  numberOfBalls: number,
  BallClass: new (...args: any[]) => T,
  ...extraArgs: any[]
): T[] => {
  const balls: T[] = [];
  const startingSpeed = 0.01;
  const regions = createRegions(canvas.width, canvas.height);

  for (let i = 0; i < numberOfBalls; i++) {
    const randomRegion = regions[i % regions.length];
    const variation = 50 * (numberOfBalls - 7) ** 2;
    const randomX = Math.random() * variation - variation / 2;
    const randomY = Math.random() * variation - variation / 2;
    const angle = Math.random() * 2 * Math.PI;

    balls.push(
      new BallClass(
        randomRegion.x + randomX,
        randomRegion.y + randomY,
        angle,
        ballRadius,
        startingSpeed,
        BASE_COLOR,
        ...extraArgs
      )
    );
  }

  return balls;
};
