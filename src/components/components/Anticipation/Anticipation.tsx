"use client";
import React, { useRef, useEffect } from "react";

const Anticipation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballRef = useRef({
    x: 100,
    y: 100,
    vx: 2,
    vy: 2,
    radius: 20,
  });

  // Function to animate the ball
  const animateBall = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    const ball = ballRef.current;

    // Clear the canvas before each redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update ball's position
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Check for collisions with the canvas edges and reverse velocity if needed
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.vx = -ball.vx; // Reverse x direction
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.vy = -ball.vy; // Reverse y direction
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue"; // Color of the ball
    ctx.fill();
    ctx.closePath();

    // Call the next animation frame
    requestAnimationFrame(() => animateBall(ctx, canvas));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Start the animation
      animateBall(ctx, canvas);
    }

    // Cleanup event on component unmount
    return () => {
      cancelAnimationFrame(animateBall as unknown as number); // Stop animation on unmount
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-screen h-screen" />;
};

export default Anticipation;
