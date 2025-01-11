"use client";

import Game, { BaseGameParams, GameProps, GameState } from "../Game";
import { MutableRefObject } from "../../../../frontend/node_modules/@types/react";

interface ArrowGameState extends GameState {
  primeTime: number;
  reactionTime: number;
}

export type ArrowGameData = {
  scores: {
    accuracy: boolean;
    reactionTime: number;
    primerDir: string;
    topFlankerDir: string;
    bottomFlankerDir: string;
  }[];
};

type ArrowGameParams = BaseGameParams & {};

const CORRECT_COLOR = "#00FF00"; // Green for correct
const INCORRECT_COLOR = "#FF0000"; // Red for incorrect
const STROKE_COLOR = "#EEEEEE"; // Normal gray colour

class ArrowGame extends Game<ArrowGameData, ArrowGameParams> {
  answersRef: MutableRefObject<boolean[]> = { current: [] };
  arrowDisplayTimeRef: MutableRefObject<number> = { current: 0 };
  state: ArrowGameState = {
    ...this.state,
    primeTime: 33,
    reactionTime: 0
  };
  correctDirection: "left" | "right" = "right";
  rapidTrials = true; // This game is always rapid-fire
  arrowShaftLength = 100;
  arrowWingLength = 20;
  lineWidth = 3;
  plusSize = 50;
  topFlankDirection: "left" | "right" = "right";
  bottomFlankDirection: "left" | "right" = "right";
  hasAnswered: boolean = false;

  constructor(props: GameProps) {
    super(props);
    this.data = {
      scores: []
    };
  }

  drawRandomLines() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;

    ctx.strokeStyle = STROKE_COLOR;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    console.log(ctx.strokeStyle);

    for (let i = 0; i < 100; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = Math.random() * canvas.width;
      const y2 = Math.random() * canvas.height;

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
    color = STROKE_COLOR
  ) {
    const ctx = this.ctxRef.current!;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();

    const offsetDir = direction === "right" ? -1 : 1;

    const startX = x + (offsetDir * this.arrowShaftLength) / 2;
    const endX = x - (offsetDir * this.arrowShaftLength) / 2;

    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);

    const wingAngle = Math.PI / 6;
    const wingX = Math.cos(wingAngle) * this.arrowWingLength;
    const wingY = Math.sin(wingAngle) * this.arrowWingLength;

    ctx.moveTo(endX, y);
    ctx.lineTo(endX + offsetDir * wingX, y - wingY);
    ctx.moveTo(endX, y);
    ctx.lineTo(endX + offsetDir * wingX, y + wingY);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = STROKE_COLOR;
    ctx.strokeStyle = STROKE_COLOR;
  }

  drawPrime = this.drawArrow;

  addEventListenersAfterGame = () => {
    this.eventHandler!.add("click", this.handleMouseClick);
    this.eventHandler!.add("keydown", this.handleKeyPress);
    this.eventHandler!.add("touchstart", this.handleTouchStart);
  };

  handleMouseClick = (event: MouseEvent) => {
    if (this.hasAnswered) return;
    this.hasAnswered = true;
    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const canvasMid = canvas.width / 2;

    const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
    const clickedDirection = clickX < canvasMid ? "left" : "right";
    this.checkAnswer(clickedDirection, reactionTime);
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (this.hasAnswered) return;
    const validKeys = ["ArrowLeft", "ArrowRight", "p", "q"];
    if (!validKeys.includes(event.key)) return;

    this.hasAnswered = true;
    const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
    let clickedDirection: "left" | "right";

    if (event.key === "ArrowLeft" || event.key === "q") {
      clickedDirection = "left";
    } else if (event.key === "ArrowRight" || event.key === "p") {
      clickedDirection = "right";
    } else {
      return; // Ignore other keys
    }

    this.checkAnswer(clickedDirection, reactionTime);
  };

  handleTouchStart = (event: TouchEvent) => {
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const canvasMid = canvas.width / 2;

    const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
    const clickedDirection = touchX < canvasMid ? "left" : "right";
    this.checkAnswer(clickedDirection, reactionTime);
  };

  checkAnswer = (clickedDirection: string, reactionTime: number) => {
    const isCorrect = clickedDirection === this.correctDirection;

    this.data.scores.push({
      accuracy: isCorrect,
      reactionTime: reactionTime,
      primerDir: this.correctDirection,
      topFlankerDir: this.topFlankDirection,
      bottomFlankerDir: this.bottomFlankDirection
    });
    this.updateAnswer(isCorrect);
  };

  updateAnswer = (isCorrect: boolean) => {
    const canvas = this.canvasRef.current!;
    this.drawBackground();
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;
    this.drawPrime(
      midX,
      midY,
      this.correctDirection,
      isCorrect ? CORRECT_COLOR : INCORRECT_COLOR
    );

    this.answersRef.current.push(isCorrect);

    setTimeout(() => {
      this.hasAnswered = false;
      this.setState({ trial: this.state.trial + 1 });
    }, 1000);
  };

  drawPlus() {
    const canvas = this.canvasRef.current!;
    const ctx = this.ctxRef.current!;
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;

    // Set the fill color for the plus sign
    ctx.fillStyle = STROKE_COLOR;

    // Calculate the dimensions of the horizontal and vertical bars
    const barThickness = this.plusSize / 10; // Thickness of the bars
    const halfSize = this.plusSize / 2;

    // Adjust Y-coordinate for proper centering
    const verticalBarTop = midY - halfSize;
    const horizontalBarTop = midY - barThickness / 2;

    // Draw the vertical bar
    ctx.fillRect(
      midX - barThickness / 2,
      verticalBarTop,
      barThickness,
      this.plusSize
    );

    // Draw the horizontal bar
    ctx.fillRect(
      midX - halfSize,
      horizontalBarTop,
      this.plusSize,
      barThickness
    );
  }

  renderGame() {
    const canvas = this.canvasRef.current!;
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;

    this.correctDirection = Math.random() < 0.5 ? "left" : "right";
    this.topFlankDirection = Math.random() < 0.5 ? "left" : "right";
    this.bottomFlankDirection = Math.random() < 0.5 ? "left" : "right";

    // Display sequence
    this.drawBackground();

    // Draw the centered plus sign
    this.drawPlus();

    setTimeout(() => {
      this.drawBackground();
      this.drawRandomLines();

      setTimeout(() => {
        this.drawBackground();
        // Draw the prime arrow in the center
        this.drawPrime(midX, midY, this.correctDirection);

        // Add offsets for flanking arrows
        const flankOffset = this.arrowShaftLength + 20; // Space between arrows
        this.drawPrime(midX, midY - flankOffset, this.topFlankDirection);
        this.drawPrime(midX, midY + flankOffset, this.bottomFlankDirection);

        this.arrowDisplayTimeRef.current = Date.now();
        this.addEventListenersAfterGame();

        if (!this.hasAnswered) {
          setTimeout(() => {
            if (!this.hasAnswered) {
              this.drawBackground();
              this.drawRandomLines();

              setTimeout(() => {
                if (!this.hasAnswered) {
                  this.drawBackground();
                  this.drawPrime(
                    midX,
                    midY - (2 * this.arrowWingLength + 10),
                    this.topFlankDirection
                  );
                  this.drawPrime(midX, midY, this.correctDirection);
                  this.drawPrime(
                    midX,
                    midY + (2 * this.arrowWingLength + 10),
                    this.bottomFlankDirection
                  );
                }
              }, 33);
            }
          }, this.state.primeTime);
        }
      }, 200);
    }, 750);
  }
}

export default ArrowGame;
