import { Ball } from "./Ball";

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
