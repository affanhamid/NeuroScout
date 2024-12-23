"use client";

import { MutableRefObject } from "react";
import { GameProps } from "../Game";
import { createBalls, GlowBall } from "../utils";
import TNT, { BaseTNTData } from "./TNT";

type TNTGlowData = BaseTNTData & {
  reactionTimes: number[];
};

class TNTGlowGame extends TNT<TNTGlowData, GlowBall> {
  reactionTimesRef: MutableRefObject<number[]> = { current: [] };
  shouldGlowRef: MutableRefObject<boolean> = { current: true };

  constructor(props: GameProps) {
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
        this.paramsRef.current![0].data.randomnessMean,
        this.paramsRef.current![0].data.randomnessStd
      )
    );
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
      this.paramsRef.current![0].data.numOfBalls,
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
        this.paramsRef.current![0].data.duration * 1000 - 3000
      );
    }, 3000);
  }
}

export default TNTGlowGame;
