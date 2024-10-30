export const BASE_COLOR = "#FDDA0D";
export const HIGHLIGHT_COLOR = "#007FFF";
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
  reset() {}

  drawBall(
    ball: Ball,
    isHighlighted: boolean,
    ctx: CanvasRenderingContext2D,
    isWrongBall: boolean | null,
    isCorrectBall: boolean | null
  ): void {
    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : this.getColor();
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
  { x: canvasWidth * 0.5, y: canvasHeight * 0.75 },
];

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
export class StrobeBall extends Ball {
  strobeA: number;
  strobeB: number;
  isStrobe: boolean;
  strobeInterval: NodeJS.Timeout | null = null;
  lastStrobeTime: number;
  constructor(
    x: number,
    y: number,
    angle: number,
    ballRadius: number,
    currentSpeed: number,
    color: string,
    strobeA: number,
    strobeB: number,
    isStrobe: boolean
  ) {
    super(x, y, angle, ballRadius, currentSpeed, color);
    this.strobeA = strobeA;
    this.strobeB = strobeB;
    this.isStrobe = isStrobe;

    // Initialize lastStrobeTime to simulate a 1-second delay
    this.lastStrobeTime = Date.now() + 1000;
  }

  visibleInterval() {
    this.strobeInterval = setInterval(() => {
      this.lastStrobeTime = Date.now();
    }, this.strobeA + this.strobeB);
  }

  reset() {
    if (this.strobeInterval) clearInterval(this.strobeInterval);
  }

  getColor(): string {
    const currentTime = Date.now();

    // Check if 1 second has passed since the initial delay
    if (currentTime < this.lastStrobeTime) {
      // Return the "off" color before the strobe starts
      return this.color;
    }

    // Define peak and trough durations in milliseconds
    const peakDuration = this.strobeA;
    const troughDuration = this.strobeB;
    const cycleTime = peakDuration + troughDuration;

    const elapsedTime = (currentTime - this.lastStrobeTime) % cycleTime;

    let sineWave;
    const peakHoldFactor = 10;
    const troughHoldFactor = 10;

    if (elapsedTime < peakDuration) {
      // First part of the cycle (peak)
      const x = (elapsedTime / peakDuration) * Math.PI; // Adjust phase for the peak
      sineWave = Math.sin(x);
      sineWave = Math.pow(sineWave, 1 / peakHoldFactor); // Apply peak hold
    } else {
      // Second part of the cycle (trough)
      const x = ((elapsedTime - peakDuration) / troughDuration) * Math.PI; // Adjust phase for the trough
      sineWave = Math.sin(x);
      sineWave = -Math.pow(Math.abs(sineWave), 1 / troughHoldFactor); // Apply trough hold
    }

    // sineWave = this.smoothstep((sineWave + 1) / 2) * 2 - 1;

    const normalizedProgress = (sineWave + 1) / 2;

    // Colors to interpolate between
    const startColor = { r: 27, g: 27, b: 27 }; // Dark color for "off"
    const endColor = { r: 247, g: 212, b: 7 }; // Brighter color for "on"

    // Calculate interpolated color
    const r = Math.floor(
      startColor.r + (endColor.r - startColor.r) * normalizedProgress
    );
    const g = Math.floor(
      startColor.g + (endColor.g - startColor.g) * normalizedProgress
    );
    const b = Math.floor(
      startColor.b + (endColor.b - startColor.b) * normalizedProgress
    );

    return `rgb(${r}, ${g}, ${b})`;
  }
}

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
    const randomX = Math.random() * 50 - 25;
    const randomY = Math.random() * 50 - 25;
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
