"use client";

import Game, { GameProps, GameState } from "../Game";
import type { GameType } from "@/types";
import { MutableRefObject } from "react";

interface ArrowGameState extends GameState {
  primeTime: number;
}

class ArrowGame extends Game<GameType["parameters"]> {
  answersRef: MutableRefObject<boolean[]> = { current: [] };
  state: ArrowGameState = {
    ...this.state,
    primeTime: 500
  };

  correctDirection: "top-right" | "top-left" | "bottom-right" | "bottom-left" =
    "top-right"; // Holds the correct direction for the current trial

  constructor(props: GameProps) {
    super(props);
  }

  drawBackground() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;

    ctx.fillStyle = "#1B1B1B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawRandomLines() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;

    for (let i = 0; i < 20; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = Math.random() * canvas.width;
      const y2 = Math.random() * canvas.height;

      ctx.strokeStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  drawArrow(
    x: number,
    y: number,
    direction: "left" | "right",
    color = "#FFFFFF"
  ) {
    const ctx = this.ctxRef.current!;
    ctx.fillStyle = color;
    ctx.font = "48px Arial";
    ctx.textAlign = "center";

    const arrow = direction === "left" ? "←" : "→";
    ctx.fillText(arrow, x, y);
  }

  drawPrime(
    x: number,
    y: number,
    direction: "top-right" | "top-left" | "bottom-right" | "bottom-left",
    radius = 40,
    color = "#FFFFFF"
  ) {
    const ctx = this.ctxRef.current!;

    ctx.lineWidth = 4;
    ctx.strokeStyle = color;

    // Draw the hollow circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Hide a single corner sector of the circle
    ctx.fillStyle = "#1B1B1B"; // Match the background color
    ctx.beginPath();

    switch (direction) {
      case "top-right":
        console.log("Hiding Top-right (-90° to 0°)");
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius + 2, -Math.PI / 2, 0, false); // Adjusted
        break;

      case "bottom-right":
        console.log("Hiding Bottom-right (0° to 90°)");
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius + 2, 0, Math.PI / 2, false); // Adjusted
        break;

      case "bottom-left":
        console.log("Hiding Bottom-left (90° to 180°)");
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius + 2, Math.PI / 2, Math.PI, false); // Adjusted
        break;

      case "top-left":
        console.log("Hiding Top-left (180° to 270°)");
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius + 2, Math.PI, (3 * Math.PI) / 2, false); // Adjusted
        break;
    }

    ctx.lineTo(x, y);
    ctx.fill();
  }

  resetGame() {
    this.setState({ isRunning: false });
  }

  renderGame() {
    const canvas = this.canvasRef.current!;
    const ctx = this.ctxRef.current!;
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;

    // Randomly set the direction to one of the corner quadrants
    const directions = ["top-right", "top-left", "bottom-right", "bottom-left"];
    this.correctDirection =
      directions[Math.floor(Math.random() * directions.length)];

    // Display fixation for 750ms
    this.drawBackground();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("+", midX, midY);

    setTimeout(() => {
      // Display random lines for 200ms
      this.drawBackground();
      this.drawRandomLines();

      setTimeout(() => {
        // Display the prime (hollow circle with hidden corner sector)
        this.drawBackground();
        this.drawPrime(midX, midY, this.correctDirection);

        setTimeout(() => {
          // Display random lines for 33ms
          this.drawBackground();
          this.drawRandomLines();

          setTimeout(() => {
            // Display final arrows for 500ms and enable interaction
            this.drawBackground();

            // Redraw the prime for consistency
            this.drawPrime(midX, midY, this.correctDirection);

            // Draw left and right arrows
            this.drawArrow(midX / 2, midY, "left");
            this.drawArrow((3 * midX) / 2, midY, "right");
          }, 33);
        }, this.state.primeTime);
      }, 200);
    }, 750);
  }
}

export default ArrowGame;
