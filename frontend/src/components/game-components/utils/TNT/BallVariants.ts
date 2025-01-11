import { Ball, HIGHLIGHT_COLOR } from "./Ball";
import { MutableRefObject } from "react";

export class GlowBall extends Ball {
  strobeInterval: NodeJS.Timeout | null = null;
  isGlowed: boolean;
  reactionTimesRef: MutableRefObject<number[]>;
  glowIntensity: number;
  maxGlowIntensity: number;
  shadowSize: number;
  lastGlowedTime: number = 0;

  constructor(
    x: number,
    y: number,
    angle: number,
    ballRadius: number,
    currentSpeed: number,
    color: string,
    reactionTimesRef: MutableRefObject<number[]>
  ) {
    super(x, y, angle, ballRadius, currentSpeed, color);
    this.reactionTimesRef = reactionTimesRef;
    this.isGlowed = false;
    this.glowIntensity = 0;
    this.maxGlowIntensity = 1;
    this.shadowSize = 0;
  }

  reset = () => {
    this.isGlowed = false;
    this.glowIntensity = 0;
    this.shadowSize = 0;
    if (this.strobeInterval) {
      clearInterval(this.strobeInterval);
      this.strobeInterval = null;
    }
  };

  glow() {
    this.isGlowed = true;
    this.lastGlowedTime = Date.now();
    this.increaseGlow();
  }

  increaseGlow() {
    this.glowIntensity = 0;
    this.shadowSize = 10;

    this.strobeInterval = setInterval(() => {
      if (this.shadowSize < 50) {
        this.shadowSize += 1;
      } else {
        clearInterval(this.strobeInterval!);
      }
    }, 100);
  }

  click(glowNextBall: () => void) {
    this.isGlowed = false;
    this.reset();
    this.reactionTimesRef.current.push(Date.now() - this.lastGlowedTime);
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
    isCorrectBall: boolean | null
  ): void {
    ctx.save();

    if (this.isGlowed) {
      ctx.shadowBlur = this.shadowSize;
      ctx.shadowColor = this.color;
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : this.getColor();
    ctx.fill();
    ctx.closePath();

    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.restore();

    this.addMarks(ball, ctx, isWrongBall, isCorrectBall);
  }
}
