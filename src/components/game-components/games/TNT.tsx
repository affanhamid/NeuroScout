"use client";

import Game, { GameProps, GameState } from "../Game";
import type { GameType } from "@/types";
import {
  Ball,
  createBalls,
  resolveCollisions,
  resolveCollisionsWithWalls
} from "../TNT";
import { MutableRefObject } from "react";

interface TNTGameState extends GameState {
  vts: number;
}

class TNT<BallType extends Ball> extends Game<GameType["parameters"]> {
  ballsRef: MutableRefObject<BallType[]> = { current: [] };
  ballSizeRef: MutableRefObject<number> = { current: 50 };
  state: TNTGameState = {
    ...this.state,
    vts: 0
  };

  wrongBallsRef: MutableRefObject<number[]> = { current: [] };
  correctBallsRef: MutableRefObject<number[]> = { current: [] };
  highlightedBallsRef: MutableRefObject<number[]> = { current: [] };

  constructor(props: GameProps) {
    super(props);
  }

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.ballSizeRef.current!,
      this.paramsRef.current![0].data.numOfBalls,
      Ball
    ) as BallType[];
  }

  setup() {
    this.ballSizeRef.current = Math.max(Math.round(window.innerWidth / 27), 40);
    this.createBalls();

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(
        Math.floor(Math.random() * this.ballsRef.current!.length)
      );
    }
    this.highlightedBallsRef.current = Array.from(uniqueIndices);
  }

  update = (currentSpeed: number, deltaTime: number) => {
    resolveCollisionsWithWalls(
      this.ballsRef.current,
      currentSpeed,
      this.canvasRef.current!.width,
      this.canvasRef.current!.height,
      deltaTime
    );

    resolveCollisions(this.ballsRef.current, currentSpeed, deltaTime);

    this.ballsRef.current.forEach((ball, index) => {
      ball.drawBall(
        ball,
        this.highlightedBallsRef.current!.includes(index),
        this.ctxRef.current!,
        this.wrongBallsRef.current &&
          this.wrongBallsRef.current!.includes(index),
        this.correctBallsRef.current &&
          this.correctBallsRef.current!.includes(index)
      );
    });
  };

  renderGame() {
    this.setup();
    let currentSpeed = 0.01;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const deltaTime = Math.max(
        Math.min((timestamp - lastTimestamp) / 1000, 1),
        1e-6
      );

      lastTimestamp = timestamp;

      this.ctxRef.current!.fillStyle = "#1B1B1B";
      this.ctxRef.current!.fillRect(
        0,
        0,
        this.canvasRef.current!.width,
        this.canvasRef.current!.height
      );

      this.update(currentSpeed, deltaTime);

      if (this.state.isRunning) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    setTimeout(() => {
      currentSpeed = this.paramsRef.current![0].data.startingVts;
      this.highlightedBallsRef.current = [];
    }, 1000);
  }
}

export default TNT;
