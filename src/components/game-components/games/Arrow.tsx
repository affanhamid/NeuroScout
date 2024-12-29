"use client";

import Game, { BaseGameParams, GameProps, GameState } from "../Game";
import { MutableRefObject } from "react";

interface ArrowGameState extends GameState {
  primeTime: number;
  reactionTime: number;
}

export type ArrowGameData = {
  reactionTimes: number[];
  accuracy: number[];
};

type ArrowGameParams = BaseGameParams & {};

const CORRECT_COLOR = "#00FF00"; // Green for correct
const INCORRECT_COLOR = "#FF0000"; // Red for incorrect

class ArrowGame extends Game<ArrowGameData, ArrowGameParams> {
  answersRef: MutableRefObject<boolean[]> = { current: [] };
  arrowDisplayTimeRef: MutableRefObject<number> = { current: 0 };
  state: ArrowGameState = {
    ...this.state,
    primeTime: 33,
    reactionTime: 0
  };
  correctDirection: "left" | "right" = "right"; // Holds the correct direction for the current trial
  rapidTrials = true;
  arrowShaftLength = 100; // Total length of the shaft
  arrowWingLength = 20; // Length of each wing
  lineWidth = 3; // Thickness of the arrow lines
  topFlankDirection: "left" | "right" = "right";
  bottomFlankDirection: "left" | "right" = "right";

  constructor(props: GameProps) {
    super(props);
    this.data = {
      reactionTimes: [],
      accuracy: []
    };
  }

  drawRandomLines() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;

    for (let i = 0; i < 100; i++) {
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

    // Define variables for arrow dimens
    // Set canvas styles
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();

    if (direction === "left") {
      // Draw left-pointing arrow
      const startX = x + this.arrowShaftLength / 2;
      const endX = x - this.arrowShaftLength / 2;
      ctx.moveTo(startX, y); // Start at the arrow's tail
      ctx.lineTo(endX, y); // Draw the shaft

      // Draw the wings from the tip point
      const wingAngle = Math.PI / 6; // 30 degrees
      const wingX = Math.cos(wingAngle) * this.arrowWingLength;
      const wingY = Math.sin(wingAngle) * this.arrowWingLength;
            
      // Top wing
      ctx.moveTo(endX, y);
      ctx.lineTo(endX + wingX, y - wingY);
      
      // Bottom wing
      ctx.moveTo(endX, y);
      ctx.lineTo(endX + wingX, y + wingY);
    } else {
      // Draw right-pointing arrow
      const startX = x - this.arrowShaftLength / 2;
      const endX = x + this.arrowShaftLength / 2;
      ctx.moveTo(startX, y); // Start at the arrow's tail
      ctx.lineTo(endX, y); // Draw the shaft
      // Draw the wings from the tip point
      const wingAngle = Math.PI / 6; // 30 degrees
      const wingX = Math.cos(wingAngle) * this.arrowWingLength;
      const wingY = Math.sin(wingAngle) * this.arrowWingLength;
      
      // Top wing
      ctx.moveTo(endX, y);
      ctx.lineTo(endX - wingX, y - wingY);
      
      // Bottom wing
      ctx.moveTo(endX, y);
      ctx.lineTo(endX - wingX, y + wingY);
    }

    ctx.stroke(); // Outline the arrow
    ctx.closePath();
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

  addEventListenersAfterGame = () => {
    this.eventHandler!.add("click", this.handleMouseClickAfterGame);
  };

  handleMouseClickAfterGame = (event: MouseEvent) => {
    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const canvasMid = canvas.width / 2;

    const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;

    // Determine the direction of the click
    const clickedDirection = clickX < canvasMid ? "left" : "right";

    // Check if the clicked direction matches the correct direction
    const isCorrect = clickedDirection === this.correctDirection;

    this.data.reactionTimes.push(reactionTime);
    this.data.accuracy.push(isCorrect ? 1 : 0);
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

    // Store the result in the answers array
    this.answersRef.current.push(isCorrect);

    // Proceed to the next trial after 1 second
    setTimeout(() => {
      this.setState({ trial: this.state.trial + 1 });
    }, 1000);
  };

  getHUD() {
    const shouldShowHUD = !this.state.showInstructions && 
                         !this.state.showTrialComplete && 
                         !this.state.showPracticeComplete && 
                         !this.state.showThankYou &&
                         !this.state.showCountdown;

    if (!shouldShowHUD || this.showTimer === -1) return null;

    return (
      <div className="absolute top-10 right-10 text-white text-lg">
        <span>
          {this.state.isPractice
            ? `Practice Trial: ${this.state.trial}`
            : `Trial: ${this.state.trial}`}{" "}
        </span>
      </div>
    );
  }

  renderGame() {
    const canvas = this.canvasRef.current!;
    const ctx = this.ctxRef.current!;
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;

    // Randomly set the direction to left or right
    this.correctDirection = Math.random() < 0.5 ? "left" : "right";
    this.topFlankDirection = Math.random() < 0.5 ? "left" : "right";
    this.bottomFlankDirection = Math.random() < 0.5 ? "left" : "right";

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
            this.drawPrime(midX, midY - (2 * this.arrowWingLength + 10), this.topFlankDirection);
            this.drawPrime(midX, midY, this.correctDirection);
            this.drawPrime(midX, midY + (2 * this.arrowWingLength + 10), this.bottomFlankDirection);

            this.arrowDisplayTimeRef.current = Date.now();
          }, 33);
        }, this.state.primeTime);
      }, 200);
    }, 750);
  }
}

export default ArrowGame;
