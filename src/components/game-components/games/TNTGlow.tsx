"use client";
import { MutableRefObject } from "react";
import { GlowBall, createBalls } from "../TNT/Ball";
import { GameState } from "../Game";
import TNTGame from "./TNT";
import { TNTGameState } from "./TNT";

class TNTGlowGame extends TNTGame<GlowBall, {}> {
  dataRef = {
    current: {
      timeOfData: new Date(),
      screenWidth: 0,
      screenHeight: 0,
      ballSize: 0,
      gameId: 2,
      paramId: 0
    }
  };
  shouldGlowRef: MutableRefObject<boolean> = { current: true };
  reactionTimesRef: MutableRefObject<number[]> = { current: [] };
  resultRef = {
    current: {
      result: {
        scores: [],
        timeToClicks: [],
        finalVts: 0,
        reactionTimes: this.reactionTimesRef.current
      },
      formData: {
        age: 0,
        highestLevel: ""
      }
    }
  };
  state: TNTGameState = {
    ...this.state
  };
  constructor(props: { gameId: string }) {
    super(props);
  }

  randomGaussian(mean: number, stddev: number) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stddev + mean;
  }

  selectRandomBallToGlow = () => {
    setTimeout(
      () => {
        const randomBall =
          this.ballsRef.current![
            Math.floor(Math.random() * this.ballsRef.current!.length)
          ];
        if (this.shouldGlowRef.current) {
          randomBall.glow();
        }
      },
      this.randomGaussian(
        this.paramsRef.current!.randomnessMean,
        this.paramsRef.current!.randomnessStd
      )
    );
  };

  clickEventDuringGame(
    event: MouseEvent,
    balls: GlowBall[],
    canvas: HTMLCanvasElement
  ) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const glowDistance = 20;

    balls.forEach((ball) => {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ball.radius + glowDistance) {
        if (ball.isGlowed) {
          ball.click(this.selectRandomBallToGlow);
        }
      }
    });
  }

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.dataRef.current!.ballSize,
      8,
      GlowBall,
      this.reactionTimesRef
    );

    setTimeout(() => {
      this.selectRandomBallToGlow();
      this.shouldGlowRef.current = true;
      setTimeout(
        () => {
          this.shouldGlowRef.current = false;
        },
        this.paramsRef.current!.duration * 1000 - 3000
      );
    }, 3000);
  }
}

export default TNTGlowGame;
