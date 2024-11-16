import { MutableRefObject } from "react";

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
    color: string,
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

  addMarks(
    ball: Ball,
    ctx: CanvasRenderingContext2D,
    isWrongBall: boolean | null,
    isCorrectBall: boolean | null,
  ): void {
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

  drawBall(
    ball: Ball,
    isHighlighted: boolean,
    ctx: CanvasRenderingContext2D,
    isWrongBall: boolean | null,
    isCorrectBall: boolean | null,
  ): void {
    // Draw the ball
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
  { x: canvasWidth * 0.5, y: canvasHeight * 0.75 },
];

export const resolveCollisions = (
  balls: Ball[],
  currentSpeed: number,
  deltaTime: number,
) => {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ballA = balls[i];
      const ballB = balls[j];

      const dx = ballB.x - ballA.x;
      const dy = ballB.y - ballA.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1e-6;

      // Check if balls are colliding
      if (distance < ballA.radius + ballB.radius) {
        const overlap = ballA.radius + ballB.radius - distance;

        // Separate the balls to remove overlap (scaled by deltaTime)
        const normalX = dx / distance;
        const normalY = dy / distance;

        const separationX = (normalX * overlap) / 2;
        const separationY = (normalY * overlap) / 2;

        ballA.x -= separationX * deltaTime;
        ballA.y -= separationY * deltaTime;
        ballB.x += separationX * deltaTime;
        ballB.y += separationY * deltaTime;

        // Calculate velocities along normal and tangent
        const tangentX = -normalY;
        const tangentY = normalX;

        const velocityANormal = ballA.vx * normalX + ballA.vy * normalY;
        const velocityATangent = ballA.vx * tangentX + ballA.vy * tangentY;

        const velocityBNormal = ballB.vx * normalX + ballB.vy * normalY;
        const velocityBTangent = ballB.vx * tangentX + ballB.vy * tangentY;

        // Swap normal velocities (elastic collision)
        const newVelocityANormal = velocityBNormal;
        const newVelocityBNormal = velocityANormal;

        // Combine velocities (keep tangential component unchanged)
        ballA.vx =
          (newVelocityANormal * normalX + velocityATangent * tangentX) *
          deltaTime;
        ballA.vy =
          (newVelocityANormal * normalY + velocityATangent * tangentY) *
          deltaTime;

        ballB.vx =
          (newVelocityBNormal * normalX + velocityBTangent * tangentX) *
          deltaTime;
        ballB.vy =
          (newVelocityBNormal * normalY + velocityBTangent * tangentY) *
          deltaTime;

        // Adjust to maintain constant speed (normalize and scale)
        const magnitudeA = Math.sqrt(ballA.vx * ballA.vx + ballA.vy * ballA.vy);
        const magnitudeB = Math.sqrt(ballB.vx * ballB.vx + ballB.vy * ballB.vy);

        ballA.vx = (ballA.vx / magnitudeA) * currentSpeed;
        ballA.vy = (ballA.vy / magnitudeA) * currentSpeed;

        ballB.vx = (ballB.vx / magnitudeB) * currentSpeed;
        ballB.vy = (ballB.vy / magnitudeB) * currentSpeed;
      }
    }
  }
};

export const resolveCollisionsWithWalls = (
  balls: Ball[],
  currentSpeed: number,
  width: number,
  height: number,
  deltaTime: number,
) => {
  balls.forEach((ball) => {
    // Move the ball, scaling velocity by deltaTime for consistent movement
    ball.x += ball.vx * deltaTime;
    ball.y += ball.vy * deltaTime;

    // Bounce off walls, ensuring no overlap with walls
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vx *= -1;
    }
    if (ball.x + ball.radius > width) {
      ball.x = width - ball.radius;
      ball.vx *= -1;
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy *= -1;
    }
    if (ball.y + ball.radius > height) {
      ball.y = height - ball.radius;
      ball.vy *= -1;
    }

    // Maintain constant speed based on deltaTime
    const currentSpeedMagnitude = Math.sqrt(
      ball.vx * ball.vx + ball.vy * ball.vy,
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
  strobeInterval: NodeJS.Timeout | null = null;
  lastStrobeTime: number;
  shouldStrobe: boolean;
  constructor(
    x: number,
    y: number,
    angle: number,
    ballRadius: number,
    currentSpeed: number,
    color: string,
    strobeA: number,
    strobeB: number,
  ) {
    super(x, y, angle, ballRadius, currentSpeed, color);
    this.strobeA = strobeA;
    this.strobeB = strobeB;

    // Initialize lastStrobeTime to simulate a 1-second delay
    this.lastStrobeTime = Date.now() + 1000;
    this.shouldStrobe = true;
  }

  reset() {
    this.shouldStrobe = false;
  }

  getColor(): string {
    console.log(this.x);
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
      startColor.r + (endColor.r - startColor.r) * normalizedProgress,
    );
    const g = Math.floor(
      startColor.g + (endColor.g - startColor.g) * normalizedProgress,
    );
    const b = Math.floor(
      startColor.b + (endColor.b - startColor.b) * normalizedProgress,
    );

    return this.shouldStrobe ? `rgb(${r}, ${g}, ${b})` : this.color;
  }
}

export class GlowBall extends Ball {
  strobeInterval: NodeJS.Timeout | null = null;
  isGlowed: boolean;
  reactionTimesRef: MutableRefObject<number[]>;
  glowIntensity: number;
  maxGlowIntensity: number;
  shadowSize: number;

  constructor(
    x: number,
    y: number,
    angle: number,
    ballRadius: number,
    currentSpeed: number,
    color: string,
    reactionTimesRef: MutableRefObject<number[]>,
  ) {
    super(x, y, angle, ballRadius, currentSpeed, color);
    this.reactionTimesRef = reactionTimesRef;
    this.isGlowed = false;
    this.glowIntensity = 0;
    this.maxGlowIntensity = 1;
    this.shadowSize = 0; // Initialize shadow size
  }

  reset() {
    this.isGlowed = false;
    this.glowIntensity = 0;
    this.shadowSize = 0;
    if (this.strobeInterval) {
      clearInterval(this.strobeInterval);
      this.strobeInterval = null;
    }
  }

  glow() {
    this.isGlowed = true;
    this.reactionTimesRef.current.push(Date.now());
    this.increaseGlow();
  }

  increaseGlow() {
    this.glowIntensity = 0;
    this.shadowSize = 10; // Start with initial shadow size

    // Gradually increase the shadow size for a bigger glow effect
    this.strobeInterval = setInterval(() => {
      if (this.shadowSize < 50) {
        // Set max shadow size
        this.shadowSize += 1; // Increase shadow size over time
      } else {
        clearInterval(this.strobeInterval!); // Stop when max shadow size is reached
      }
    }, 100); // Adjust interval timing for smoother growth
  }

  resetGlow() {
    this.isGlowed = false;
    this.glowIntensity = 0;
    this.shadowSize = 0; // Reset shadow size
    clearInterval(this.strobeInterval!);
  }

  click(glowNextBall: () => void) {
    this.isGlowed = false;
    this.resetGlow();
    this.reactionTimesRef.current.push(Date.now());
    glowNextBall();
  }

  getColor(): string {
    return this.color;
  }

  drawBall(
    ball: Ball,
    isHighlighted: boolean,
    ctx: CanvasRenderingContext2D,
    isWrongBall: boolean | null,
    isCorrectBall: boolean | null,
  ): void {
    ctx.save(); // Save the canvas state

    // Apply an expanding shadow if the ball is in the "glowed" state
    if (this.isGlowed) {
      ctx.shadowBlur = this.shadowSize; // Use expanding shadow size
      ctx.shadowColor = this.color; // Maintain constant color for the shadow
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : this.getColor();
    ctx.fill();
    ctx.closePath();

    // Reset shadow settings to avoid affecting other canvas elements
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.restore(); // Restore canvas state

    this.addMarks(ball, ctx, isWrongBall, isCorrectBall);
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
        ...extraArgs,
      ),
    );
  }

  return balls;
};
