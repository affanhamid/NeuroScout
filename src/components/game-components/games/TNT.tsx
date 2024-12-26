"use client";

import Game, { GameProps, GameState } from "../Game";
import type { GameType } from "@/types";
import {
  Ball,
  createBalls,
  resolveCollisions,
  resolveCollisionsWithWalls
} from "../utils";
import { MutableRefObject } from "react";

interface TNTGameState extends GameState {
  vts: number;
}

export type BaseTNTData = {
  vts: number;
  scores: number[];
};

class TNT<TNTData extends BaseTNTData, BallType extends Ball> extends Game<
  TNTData,
  GameType["parameters"]
> {
  ballsRef: MutableRefObject<BallType[]> = { current: [] };
  ballSizeRef: MutableRefObject<number> = { current: 50 };
  state: TNTGameState = {
    ...this.state,
    vts: 0
  };

  wrongBallsRef: MutableRefObject<number[]> = { current: [] };
  correctBallsRef: MutableRefObject<number[]> = { current: [] };
  highlightedBallsRef: MutableRefObject<number[]> = { current: [] };
  actualBallsRef: MutableRefObject<number[]> = { current: [] };
  clickedBallsRef: MutableRefObject<Set<number>> = {
    current: new Set<number>()
  };
  currentSpeedRef: MutableRefObject<number> = { current: 0.01 };

  constructor(props: GameProps) {
    super(props);
    this.data = {
      vts: 0,
      scores: []
    };
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
    this.actualBallsRef.current = this.highlightedBallsRef.current;
  }

  update = (deltaTime: number) => {
    resolveCollisionsWithWalls(
      this.ballsRef.current,
      this.currentSpeedRef.current,
      this.canvasRef.current!.width,
      this.canvasRef.current!.height,
      deltaTime
    );

    resolveCollisions(
      this.ballsRef.current,
      this.currentSpeedRef.current,
      deltaTime
    );

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

  resetGame() {
    super.resetGame();
    this.currentSpeedRef.current = 0.01;
    this.ballsRef.current.forEach((ball) => ball.reset());
  }

  resetSelection = () => {
    this.clickedBallsRef.current.clear();
    this.highlightedBallsRef.current = [];
    this.update(0);
  };

  getHUD() {
      return (
        <div className="absolute top-10 right-10 text-white text-lg flex flex-col gap-2">
          <span>
          {this.state.isPractice ? `Practice Trial: ${this.state.trial}` : `Trial: ${this.state.trial}`} | Time Left: {this.showTimer}s
          </span>
          {this.state.isPractice && !this.state.showInstructions && (
          <button
            onClick={this.skipPractice}
            className="text-xl rounded-full"
          >
            Skip Practice
          </button>
          )}
          {this.state.isRunning && this.showTimer === 0 && (
                <button
                  className="text-xl rounded-full"
                  onClick={this.resetSelection}
                >
                  Reset Selection
                </button>
            )}
        </div>
      );
  }

  renderGame() {
    this.setup();
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const deltaTime = Math.max(
        Math.min((timestamp - lastTimestamp) / 1000, 1),
        1e-6
      );

      lastTimestamp = timestamp;

      this.drawBackground();

      this.update(deltaTime);
      if (this.state.isRunning) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    setTimeout(() => {
      this.currentSpeedRef.current =
        this.paramsRef.current![0].data.startingVts;
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

  handleMouseClickDuringGame = (event: MouseEvent) => {};

  handleMouseClickAfterGame = (event: MouseEvent) => {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.ballsRef.current!.forEach((ball, index) => {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius) {
        this.clickedBallsRef.current!.add(index);
        this.highlightedBallsRef.current!.push(index);

        if (this.clickedBallsRef.current!.size === 4) {
          // Remove the event listener immediately to avoid extra clicks
          window.removeEventListener("click", this.handleMouseClickAfterGame);

          // Calculate the score
          const { score, wrongBalls, correctBalls } = this.calculateScore(
            Array.from(this.clickedBallsRef.current!),
            this.actualBallsRef.current!
          );

          this.wrongBallsRef.current = wrongBalls;
          this.correctBallsRef.current = correctBalls;

          this.data = {
            vts: this.state.vts,
            scores: [...this.data.scores, score]
          } as TNTData;

          if (score === 4) {
            this.setState({
              vts: this.state.vts + this.paramsRef.current![0].data.changeInVts
            } as TNTGameState);
          } else if (this.state.vts > 50) {
            this.setState({
              vts: this.state.vts - this.paramsRef.current![0].data.changeInVts
            } as TNTGameState);
          }

          // Add a delay before clearing and resetting
          setTimeout(() => {
            this.clickedBallsRef.current!.clear();
            this.wrongBallsRef.current = [];
            this.correctBallsRef.current = [];

            if (
              this.state.isPractice &&
              this.state.trial + 1 >
                this.paramsRef.current![0].data.practiceTrials
            ) {
              this.setState({
                vts: this.paramsRef.current![0].data.startingVts
              } as TNTGameState);
            }
            this.setState({ trial: this.state.trial + 1 });

            // Force a canvas update to reflect the cleared state
            this.update(0);
          }, 1000); // Delay of 1 second
        }
      }
    });

    setTimeout(() => {
      this.update(0);
    }, 10);
  };
}

export default TNT;
