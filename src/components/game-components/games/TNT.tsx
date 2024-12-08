"use client";

import Game, { GameProps, GameState } from "../Game";
import type { GameType } from "@/types";
import {
  Ball,
  createBalls,
  HIGHLIGHT_COLOR,
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
  clickedBallsRef: MutableRefObject<Set<number>> = {
    current: new Set<number>()
  };

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

  calculateScore = (
    selected: number[],
    actual: number[]
  ): { score: number; wrongBalls: number[]; correctBalls: number[] } => {
    let score = 0;
    const wrongBalls: number[] = [];
    const correctBalls: number[] = [];
    selected.forEach((selectedBall) => {
      if (actual.includes(selectedBall)) {
        score++;
        correctBalls.push(selectedBall);
      } else {
        wrongBalls.push(selectedBall);
      }
    });
    return { score: score, wrongBalls: wrongBalls, correctBalls: correctBalls };
  };

  clickEventDuringGame(event: MouseEvent) {}

  clickEventAfterGame(event: MouseEvent) {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    this.ballsRef.current!.forEach((ball, index) => {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ball.radius) {
        ball.color = HIGHLIGHT_COLOR;
        this.clickedBallsRef.current!.add(index);

        if (this.clickedBallsRef.current!.size === 4) {
          window.removeEventListener("click", this.clickEventAfterGame);

          const { score, wrongBalls, correctBalls } = this.calculateScore(
            Array.from(this.clickedBallsRef.current!),
            this.highlightedBallsRef.current!
          );

          this.wrongBallsRef.current = wrongBalls;
          this.correctBallsRef.current = correctBalls;

          setTimeout(() => {
            this.update(0.01, 0);
          }, 10);

          if (score === 4) {
            this.setState({
              vts: this.state.vts + this.paramsRef.current![0].data.changeInVts
            } as TNTGameState);
          } else if (this.state.vts > 50) {
            this.setState({
              vts: this.state.vts - this.paramsRef.current![0].data.changeInVts
            } as TNTGameState);
          }
          this.clickedBallsRef.current!.clear();
          this.highlightedBallsRef.current = [];

          this.wrongBallsRef.current = [];
          this.correctBallsRef.current = [];
          this.setState({ trial: this.state.trial + 1 });

          if (
            this.state.isPractice &&
            this.state.trial + 1 >
              this.paramsRef.current![0].data.practiceTrials
          ) {
            this.setState({
              vts: this.paramsRef.current![0].data.startingVts
            } as TNTGameState);
          }
          this.setState({ isRunning: false });
        }
      }
    });
  }
}

export default TNT;
