"use client";

import { MutableRefObject } from "react";
import { GameProps } from "../Game";
import { createBalls, GlowBall } from "../utils";
import TNT, { BaseTNTGameData, BaseTNTParams } from "./TNT";

type TNTGlowGameData = BaseTNTGameData & {
  reactionTimes: number[][];
};

type TNTGlowParams = BaseTNTParams & {
  randomnessMean: number;
  randomnessStd: number;
};

class TNTGlowGame extends TNT<TNTGlowParams, TNTGlowGameData, GlowBall> {
  reactionTimesRef: MutableRefObject<number[]> = { current: [] };
  shouldGlowRef: MutableRefObject<boolean> = { current: true };

  constructor(props: GameProps) {
    super(props);
    this.data.reactionTimes = [];
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
        const availableBalls = this.ballsRef.current!.filter(
          (_, index) => !this.actualBallsRef.current.includes(index)
        );
        if (availableBalls.length > 0 && this.shouldGlowRef.current) {
          const randomBall =
            availableBalls[Math.floor(Math.random() * availableBalls.length)];
          randomBall.glow();
        }
      },
      this.randomGaussian(
        this.paramsRef.current!.randomnessMean,
        this.paramsRef.current!.randomnessStd
      )
    );
  };

  addEventListenersDuringGame = () => {
    this.eventHandler!.add("click", this.handleMouseClickDuringGame);
  };

  handleMouseClickDuringGame = (event: MouseEvent) => {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const glowDistance = 20;
    this.ballsRef.current.forEach((ball) => {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ball.radius + glowDistance) {
        if (ball.isGlowed) {
          ball.click(this.selectRandomBallToGlow);
        }
      }
    });
  };

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.ballSizeRef.current!,
      this.paramsRef.current!.numOfBalls,
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
  
  resetGame() {
    super.resetGame();
    this.data.reactionTimes.push(this.reactionTimesRef.current);
  }
}

export default TNTGlowGame;
