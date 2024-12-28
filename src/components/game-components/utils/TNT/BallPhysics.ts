import { Ball } from "./Ball";

export const resolveCollisions = <BallType extends Ball>(
  balls: BallType[],
  currentSpeed: number,
  deltaTime: number
) => {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ballA = balls[i];
      const ballB = balls[j];

      const dx = ballB.x - ballA.x;
      const dy = ballB.y - ballA.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1e-6;

      // Skip if distance is too small to avoid invalid normal/tangent calculation
      if (distance < 1e-6) continue;

      // Check if balls are colliding
      if (distance < ballA.radius + ballB.radius) {
        const overlap = ballA.radius + ballB.radius - distance;

        // Separate the balls to remove overlap (scaled by deltaTime)
        const normalX = dx / distance;
        const normalY = dy / distance;

        if (isNaN(normalX) || isNaN(normalY)) continue; // Prevent invalid normals

        const separationX = (normalX * overlap) / 2;
        const separationY = (normalY * overlap) / 2;

        ballA.x -= separationX / 2;
        ballA.y -= separationY / 2;
        ballB.x += separationX / 2;
        ballB.y += separationY / 2;

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

        if (magnitudeA > 1e-6) {
          ballA.vx = (ballA.vx / magnitudeA) * currentSpeed;
          ballA.vy = (ballA.vy / magnitudeA) * currentSpeed;
        }

        if (magnitudeB > 1e-6) {
          ballB.vx = (ballB.vx / magnitudeB) * currentSpeed;
          ballB.vy = (ballB.vy / magnitudeB) * currentSpeed;
        }
      }
    }
  }
};

export const resolveCollisionsWithWalls = <BallType extends Ball>(
  balls: BallType[],
  currentSpeed: number,
  width: number,
  height: number,
  deltaTime: number
) => {
  balls.forEach((ball) => {
    // Move the ball, scaling velocity by deltaTime for consistent movement
    const nextX = ball.x + ball.vx * deltaTime;
    const nextY = ball.y + ball.vy * deltaTime;

    // Check if the ball would enter the forbidden zone

    // Normal movement if not entering forbidden zone
    ball.x = nextX;
    ball.y = nextY;

    // Regular wall collisions
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

    // Maintain constant speed
    const currentSpeedMagnitude = Math.sqrt(
      ball.vx * ball.vx + ball.vy * ball.vy
    );
    if (
      currentSpeedMagnitude > 1e-6 &&
      currentSpeedMagnitude !== currentSpeed
    ) {
      const scale = currentSpeed / currentSpeedMagnitude;
      ball.vx *= scale;
      ball.vy *= scale;
    }
  });
};

