"use client";

import Game, { GameProps, GameState } from "../Game";
import type { GameType } from "@/types";
import { MutableRefObject } from "react";

interface ArrowGameState extends GameState {
  primeTime: number;
}

const CORRECT_COLOR = "#00FF00"; // Green for correct
const INCORRECT_COLOR = "#FF0000"; // Red for incorrect

class ArrowGame extends Game<GameType["parameters"]> {
  answersRef: MutableRefObject<boolean[]> = { current: [] };
  state: ArrowGameState = {
    ...this.state,
    primeTime: 33
  };

  correctDirection: "left" | "right" = "right"; // Holds the correct direction for the current trial

  constructor(props: GameProps) {
    super(props);
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
    direction: "left" | "right",
    color = "#FFFFFF"
  ) {
    // Reusing drawArrow for drawing the prime
    this.drawArrow(x, y, direction, color);
  }

  handleMouseClickAfterGame(event: MouseEvent) {
    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const canvasMid = canvas.width / 2;

    // Determine the direction of the click
    const clickedDirection = clickX < canvasMid ? "left" : "right";

    // Check if the clicked direction matches the correct direction
    const isCorrect = clickedDirection === this.correctDirection;

    // Highlight the prime arrow in green or red based on correctness
    this.drawBackground();
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;
    this.drawPrime(
      midX,
      midY,
      this.correctDirection,
      isCorrect ? CORRECT_COLOR : INCORRECT_COLOR
    );

    // Redraw the arrows
    this.drawArrow(midX / 2, midY, "left");
    this.drawArrow((3 * midX) / 2, midY, "right");

    // Store the result in the answers array
    this.answersRef.current.push(isCorrect);

    // Proceed to the next trial after 1 second
    setTimeout(() => {
      this.setState({ trial: this.state.trial + 1 });
    }, 1000);
  }

  renderGame() {
    const canvas = this.canvasRef.current!;
    const ctx = this.ctxRef.current!;
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;

    // Randomly set the direction to left or right
    this.correctDirection = Math.random() < 0.5 ? "left" : "right";

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
        // Display the prime arrow
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
            this.drawPrime(midX, midY + 25, this.correctDirection);
            this.drawPrime(midX, midY, this.correctDirection);
            this.drawPrime(midX, midY - 25, this.correctDirection);

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
