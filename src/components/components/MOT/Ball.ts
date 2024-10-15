export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const BASE_COLOR = "#FDDA0D";
export const HIGHLIGHT_COLOR = "#007FFF";
export const WRONG_COLOR = "#FF0000";
export const CORRECT_COLOR = "#00FF00";

export const createBall = (
  x: number,
  y: number,
  angle: number,
  ballRadius: number,
  currentSpeed: number
): Ball => {
  return {
    x: x,
    y: y,
    radius: ballRadius,
    vx: Math.cos(angle) * currentSpeed,
    vy: Math.sin(angle) * currentSpeed,
    color: BASE_COLOR,
  };
};

export const drawBall = (
  ball: Ball,
  isHighlighted: boolean,
  isWrongBall: boolean,
  isCorrectBall: boolean,
  ctx: CanvasRenderingContext2D
): void => {
  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : ball.color;
  ctx.fill();
  ctx.closePath();

  // Set the font size based on the ball radius
  ctx.font = `${ball.radius}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw tick or cross
  if (isCorrectBall) {
    ctx.fillStyle = "rgb(11, 218, 81)"; // Green color for tick
    ctx.fillText("✓", ball.x, ball.y); // Draw a tick mark
  } else if (isWrongBall) {
    ctx.fillStyle = "red"; // Red color for cross
    ctx.fillText("✕", ball.x, ball.y); // Draw a cross mark
  }
};

// Create balls in different regions
const createRegions = (canvasWidth: number, canvasHeight: number) => [
  { x: canvasWidth * 0.25, y: canvasHeight * 0.25 },
  { x: canvasWidth * 0.75, y: canvasHeight * 0.25 },
  { x: canvasWidth * 0.25, y: canvasHeight * 0.5 },
  { x: canvasWidth * 0.75, y: canvasHeight * 0.5 },
  { x: canvasWidth * 0.25, y: canvasHeight * 0.75 },
  { x: canvasWidth * 0.75, y: canvasHeight * 0.75 },
  { x: canvasWidth * 0.5, y: canvasHeight * 0.25 },
  { x: canvasWidth * 0.5, y: canvasHeight * 0.75 },
];

export const createBalls = (
  canvas: HTMLCanvasElement,
  ballRadius: number
): Ball[] => {
  const balls: Ball[] = [];
  const startingSpeed = 0.01;

  const regions = createRegions(canvas.width, canvas.height);
  regions.forEach((region) => {
    const randomX = Math.random() * 50 - 25;
    const randomY = Math.random() * 50 - 25;
    const angle = Math.random() * 2 * Math.PI;
    balls.push(
      createBall(
        region.x + randomX,
        region.y + randomY,
        angle,
        ballRadius,
        startingSpeed
      )
    );
  });
  return balls;
};
