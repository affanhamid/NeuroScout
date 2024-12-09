"use client";
import { MutableRefObject, createRef } from "react";
import {
  Ball,
  createBalls,
  HIGHLIGHT_COLOR,
  BASE_COLOR,
  resolveCollisions,
  resolveCollisionsWithWalls
} from "../TNT/Ball";
import Game, { GameState } from "../Game";

export interface TNTGameState extends GameState {
  vts: number;
  showReset: boolean;
}

class TNTGame<BallType extends Ball, Params extends TNTParams> extends Game<
  {},
  {},
  {}
> {
  highlightedBallsRef: MutableRefObject<number[] | null> =
    createRef<number[]>();
  ballsRef: MutableRefObject<BallType[]> = { current: [] };
  actualBallsRef: MutableRefObject<number[]> = { current: [] };
  clickedBallsRef: MutableRefObject<Set<number>> = { current: new Set() };
  wrongBallsRef: MutableRefObject<number[]> = { current: [] };
  correctBallsRef: MutableRefObject<number[]> = { current: [] };
  isClickableRef: MutableRefObject<boolean> = { current: false };
  startingVtsRef: MutableRefObject<number> = { current: 0 };
  gameEndTimeRef: MutableRefObject<number> = { current: 0 };
  dataRef = {
    current: {
      timeOfData: new Date(),
      screenWidth: 0,
      ballSize: 0,
      screenHeight: 0,
      gameId: 1,
      paramId: 0
    }
  };
  resultRef = {
    current: {
      result: {
        scores: [],
        timeToClicks: [],
        finalVts: 0
      },
      formData: {
        age: 0,
        highestLevel: ""
      }
    }
  };

  state: TNTGameState = {
    ...this.state,
    vts: 0
  };

  constructor(props: { gameId: string }) {
    super(props);
  }

  resetSelection = () => {
    this.clickedBallsRef.current!.clear();
    this.ballsRef.current.forEach((ball: Ball) => (ball.color = BASE_COLOR));
  };

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

  clickEventDuringGame(
    event: MouseEvent,
    balls: BallType[],
    canvas: HTMLCanvasElement
  ) {}

  renderGame = () => {
    this.setup();
    let currentSpeed = 0.01;
    const balls = this.ballsRef.current!;
    const timerId = setTimeout(() => {
      currentSpeed = 0.1;
      this.setState({ showReset: true });
      this.canvasRef.current!.addEventListener("click", clickEventAfterGame);
      this.gameEndTimeRef.current = Date.now();
      this.ballsRef.current!.forEach((ball) => ball.reset());
      this.canvasRef.current!.removeEventListener(
        "click",
        clickEventDuringGame
      );
    }, this.paramsRef.current!.duration * 1000);

    const clickEventAfterGame = (event: MouseEvent) => {
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
          this.resultRef.current!.result!.timeToClicks.push(
            Date.now() - this.gameEndTimeRef.current!
          );

          if (this.clickedBallsRef.current!.size === 4) {
            this.canvasRef.current!.removeEventListener(
              "click",
              clickEventAfterGame
            );

            const { score, wrongBalls, correctBalls } = this.calculateScore(
              Array.from(this.clickedBallsRef.current!),
              this.actualBallsRef.current!
            );

            this.wrongBallsRef.current = wrongBalls;
            this.correctBallsRef.current = correctBalls;

            setTimeout(() => {
              this.update(balls, currentSpeed, 0);
            }, 10);

            if (score === 4) {
              this.setState({
                vts: this.state.vts + this.paramsRef.current!.changeInVts
              } as TNTGameState);
            } else if (this.state.vts > 50) {
              this.setState({
                vts: this.state.vts - this.paramsRef.current!.changeInVts
              } as TNTGameState);
            }
            this.resultRef.current!.result.scores.push(score);
            this.isClickableRef.current = false;
            this.clickedBallsRef.current!.clear();
            this.highlightedBallsRef.current = [];

            setTimeout(() => {
              this.wrongBallsRef.current = [];
              this.correctBallsRef.current = [];
              setTimeout(() => {
                this.setState({ trial: this.state.trial + 1 });

                if (
                  this.state.isPractice &&
                  this.state.trial + 1 > this.paramsRef.current!.practiceTrials
                ) {
                  this.setState({
                    vts: this.paramsRef.current!.startingVts
                  } as TNTGameState);
                }
                this.setState({ isRunning: false });
              }, 500);
            }, 1000);
          }
        }
      });
    };

    const clickEventDuringGame = (event: MouseEvent) => {
      this.clickEventDuringGame(
        event,
        this.ballsRef.current!,
        this.canvasRef.current!
      );
    };

    this.canvasRef.current!.addEventListener("click", clickEventDuringGame);

    return () => {
      if (this.animationFrameIdRef.current) {
        cancelAnimationFrame(this.animationFrameIdRef.current);
      }
      clearTimeout(timerId);
    };
  };

  addFormData = (formData: Record<string, string>) => {
    this.resultRef.current.formData.age = parseInt(formData.age);
    this.resultRef.current.formData.highestLevel = formData.highestLevel;
    this.dataRef.current.screenWidth = window.innerWidth;
    this.dataRef.current.screenHeight = window.innerHeight;
    this.resultRef.current.result.finalVts = this.state.vts;
  };

  submitData = async (formData: Record<string, string>) => {
    this.addFormData(formData);
    const payload = {
      data: this.dataRef.current,
      result: this.resultRef.current
    };
    try {
      const response = await fetch("/api/data/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        console.log("Data added successfully:", result.message);
      } else {
        console.error("Failed to add data:", result.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
}

export default TNTGame;
