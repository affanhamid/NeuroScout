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
  correctDirection: "left" | "right" = "right";
  rapidTrials = true; // This game is always rapid-fire
  arrowShaftLength = 100;
  arrowWingLength = 20;
  lineWidth = 3;
  topFlankDirection: "left" | "right" = "right";
  bottomFlankDirection: "left" | "right" = "right";
  hasAnswered: boolean = false;

  constructor(props: GameProps) {
    super(props);
    this.data = {
      reactionTimes: [],
      accuracy: []
    };
  }

  // Override handleTrialCompletion from base Game class to ensure rapid-fire behavior
  handleTrialCompletion() {
    if (this.paramsRef.current?.duration) {
      this.showTimer = this.paramsRef.current.duration;
    }
    
    if (this.state.isPractice) {
      if (this.state.trial === this.paramsRef.current!.practiceTrials + 1) {
        this.setState({
          trial: 1,
          showPracticeComplete: true,
          showReset: false,
          isPractice: false
        });
      } else if (this.state.trial !== 1) {
        // Always show countdown for rapid trials
        this.setState({
          showTrialComplete: false,
          showCountdown: true,
          showReset: false
        });
      }
    } else {
      if (this.state.trial === this.paramsRef.current!.trials + 1) {
        this.onSubmit();
        this.setState({
          showThankYou: true,
          showReset: false,
          showCountdown: false
        });
      } else {
        // Skip trial complete dialog and go straight to countdown
        this.setState({
          showTrialComplete: false,
          showCountdown: true,
          showReset: false
        });
      }
    }
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
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();

    if (direction === "left") {
      const startX = x + this.arrowShaftLength / 2;
      const endX = x - this.arrowShaftLength / 2;
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);

      const wingAngle = Math.PI / 6;
      const wingX = Math.cos(wingAngle) * this.arrowWingLength;
      const wingY = Math.sin(wingAngle) * this.arrowWingLength;
            
      ctx.moveTo(endX, y);
      ctx.lineTo(endX + wingX, y - wingY);
      ctx.moveTo(endX, y);
      ctx.lineTo(endX + wingX, y + wingY);
    } else {
      const startX = x - this.arrowShaftLength / 2;
      const endX = x + this.arrowShaftLength / 2;
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      
      const wingAngle = Math.PI / 6;
      const wingX = Math.cos(wingAngle) * this.arrowWingLength;
      const wingY = Math.sin(wingAngle) * this.arrowWingLength;
      
      ctx.moveTo(endX, y);
      ctx.lineTo(endX - wingX, y - wingY);
      ctx.moveTo(endX, y);
      ctx.lineTo(endX - wingX, y + wingY);
    }

    ctx.stroke();
    ctx.closePath();
  }

  drawPrime = this.drawArrow;

  addEventListenersAfterGame = () => {
    this.eventHandler!.add("click", this.handleMouseClickAfterGame);
  };

  handleMouseClickAfterGame = (event: MouseEvent) => {
    if (this.hasAnswered) return;
    
    this.hasAnswered = true;
    const canvas = this.canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const canvasMid = canvas.width / 2;

    const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
    const clickedDirection = clickX < canvasMid ? "left" : "right";
    const isCorrect = clickedDirection === this.correctDirection;

    this.data.reactionTimes.push(reactionTime);
    this.data.accuracy.push(isCorrect ? 1 : 0);
    
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

  renderGame() {
    const canvas = this.canvasRef.current!;
    const ctx = this.ctxRef.current!;
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;

    this.correctDirection = Math.random() < 0.5 ? "left" : "right";
    this.topFlankDirection = Math.random() < 0.5 ? "left" : "right";
    this.bottomFlankDirection = Math.random() < 0.5 ? "left" : "right";

    // Display sequence
    this.drawBackground();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("+", midX, midY);

    setTimeout(() => {
      this.drawBackground();
      this.drawRandomLines();

      setTimeout(() => {
        this.drawBackground();
        this.drawPrime(midX, midY, this.correctDirection);
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
                  this.drawPrime(midX, midY - (2 * this.arrowWingLength + 10), this.topFlankDirection);
                  this.drawPrime(midX, midY, this.correctDirection);
                  this.drawPrime(midX, midY + (2 * this.arrowWingLength + 10), this.bottomFlankDirection);
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