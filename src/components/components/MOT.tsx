"use client";
import React, { useRef, useEffect } from "react";

const MOT: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ballRadius = 50;
    const speed = 5;
    const balls: Ball[] = [];

    // Define Ball type
    interface Ball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    // Function to create a ball object
    function createBall(x: number, y: number, angle: number): Ball {
      return {
        x: x,
        y: y,
        radius: ballRadius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: "yellow",
      };
    }

    // Create balls in different regions
    const regions = [
      { x: canvas.width * 0.25, y: canvas.height * 0.25 },
      { x: canvas.width * 0.75, y: canvas.height * 0.25 },
      { x: canvas.width * 0.25, y: canvas.height * 0.5 },
      { x: canvas.width * 0.75, y: canvas.height * 0.5 },
      { x: canvas.width * 0.25, y: canvas.height * 0.75 },
      { x: canvas.width * 0.75, y: canvas.height * 0.75 },
      { x: canvas.width * 0.5, y: canvas.height * 0.25 },
      { x: canvas.width * 0.5, y: canvas.height * 0.75 },
    ];

    regions.forEach((region) => {
      const randomX = Math.random() * 50 - 25;
      const randomY = Math.random() * 50 - 25;
      const angle = Math.random() * 2 * Math.PI;
      balls.push(createBall(region.x + randomX, region.y + randomY, angle));
    });

    // Function to draw a ball
    function drawBall(ball: Ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    }

    // Function to detect and resolve ball collisions
    function resolveCollisions() {
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
            const newVxA = speed * Math.cos(directionA - collisionAngle);
            const newVyA = speed * Math.sin(directionA - collisionAngle);
            const newVxB = speed * Math.cos(directionB - collisionAngle);
            const newVyB = speed * Math.sin(directionB - collisionAngle);

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
    }

    // Function to update ball positions
    function updateBalls() {
      balls.forEach((ball) => {
        // Move the ball
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off the walls
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.vx *= -1;
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.vy *= -1;
        }

        // Maintain constant speed
        const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (currentSpeed !== speed) {
          const scale = speed / currentSpeed;
          ball.vx *= scale;
          ball.vy *= scale;
        }
      });
    }

    // Function to animate the canvas
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      updateBalls();
      resolveCollisions();
      balls.forEach(drawBall);

      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default MOT;
