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
  ctx: CanvasRenderingContext2D,
  isWrongBall?: boolean,
  isCorrectBall?: boolean
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
    ctx.fillStyle = "rgb(11, 218, 81)";
    ctx.fillText("✓", ball.x, ball.y);
  } else if (isWrongBall) {
    ctx.fillStyle = "red";
    ctx.fillText("✕", ball.x, ball.y);
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
  ballRadius: number,
  numberOfBalls: number = 8
): Ball[] => {
  const balls: Ball[] = [];
  const startingSpeed = 0.01;

  const regions = createRegions(canvas.width, canvas.height);

  for (let i = 0; i < numberOfBalls; i++) {
    const randomRegion = regions[i % regions.length];
    const randomX = Math.random() * 50 - 25;
    const randomY = Math.random() * 50 - 25;
    const angle = Math.random() * 2 * Math.PI;

    balls.push(
      createBall(
        randomRegion.x + randomX,
        randomRegion.y + randomY,
        angle,
        ballRadius,
        startingSpeed
      )
    );
  }

  return balls;
};
export const resolveCollisions = (
  balls: Ball[],
  currentSpeed: number
): void => {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ballA = balls[i];
      const ballB = balls[j];

      const dx = ballB.x - ballA.x;
      const dy = ballB.y - ballA.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if balls are colliding
      if (distance < ballA.radius + ballB.radius) {
        // Calculate the overlap
        const overlap = ballA.radius + ballB.radius - distance;

        // Separate the balls so they no longer overlap
        const separationX = ((dx / distance) * overlap) / 2;
        const separationY = ((dy / distance) * overlap) / 2;
        ballA.x -= separationX;
        ballA.y -= separationY;
        ballB.x += separationX;
        ballB.y += separationY;

        // Calculate the angle of collision
        const collisionAngle = Math.atan2(dy, dx);

        const directionA = Math.atan2(ballA.vy, ballA.vx);
        const directionB = Math.atan2(ballB.vy, ballB.vx);

        // New velocities along the collision axis
        const newVxA = currentSpeed * Math.cos(directionA - collisionAngle);
        const newVyA = currentSpeed * Math.sin(directionA - collisionAngle);
        const newVxB = currentSpeed * Math.cos(directionB - collisionAngle);
        const newVyB = currentSpeed * Math.sin(directionB - collisionAngle);

        // Swap the velocities along the collision axis
        const finalVxA =
          newVxB * Math.cos(collisionAngle) +
          newVyA * Math.cos(collisionAngle + Math.PI / 2);
        const finalVyA =
          newVxB * Math.sin(collisionAngle) +
          newVyA * Math.sin(collisionAngle + Math.PI / 2);
        const finalVxB =
          newVxA * Math.cos(collisionAngle) +
          newVyB * Math.cos(collisionAngle + Math.PI / 2);
        const finalVyB =
          newVxA * Math.sin(collisionAngle) +
          newVyB * Math.sin(collisionAngle + Math.PI / 2);

        ballA.vx = finalVxA;
        ballA.vy = finalVyA;
        ballB.vx = finalVxB;
        ballB.vy = finalVyB;
      }
    }
  }
};

export const resolveCollisionsWithWalls = (
  balls: Ball[],
  currentSpeed: number,
  canvas: HTMLCanvasElement
) => {
  balls.forEach((ball) => {
    // Move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Bounce off the walls, ensuring the ball doesn't get stuck in the wall
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius; // Reset position
      ball.vx *= -1; // Reverse velocity
    }
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.vx *= -1;
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy *= -1;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.vy *= -1;
    }

    // Maintain constant speed
    const currentSpeedMagnitude = Math.sqrt(
      ball.vx * ball.vx + ball.vy * ball.vy
    );
    if (currentSpeedMagnitude !== currentSpeed) {
      const scale = currentSpeed / currentSpeedMagnitude;
      ball.vx *= scale;
      ball.vy *= scale;
    }
  });
};
