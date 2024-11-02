"use client";
import React, { MutableRefObject, createRef } from "react";
import {
  Ball,
  createBalls,
  HIGHLIGHT_COLOR,
  resolveCollisions,
  resolveCollisionsWithWalls,
} from "./Ball";

import { MOT_Data } from "@/db/Types";
import Game, { GameInterface, GameState } from "../Game/Game";

export interface MOTParams {
  vts: number;
}

export interface MOTGameState extends GameState {
  vts: number;
}

class MOTGame<BallType extends Ball> extends Game<MOT_Data, MOTParams> {
  highlightedBallsRef: MutableRefObject<number[] | null> =
    createRef<number[]>();
  ballsRef: MutableRefObject<BallType[] | null> = createRef();
  actualBallsRef: MutableRefObject<number[] | null> = createRef();
  clickedBallsRef: MutableRefObject<Set<number> | null> = createRef();
  wrongBallsRef: MutableRefObject<number[] | null> = createRef();
  correctBallsRef: MutableRefObject<number[] | null> = createRef();
  isClickableRef: MutableRefObject<boolean | null> = createRef();
  ballRadiusRef: MutableRefObject<number | null> = createRef();
  startingVtsRef: MutableRefObject<number | null> = createRef();
  gameEndTimeRef: MutableRefObject<number | null> = createRef();
  dataRef: MutableRefObject<MOT_Data | null> = createRef();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = createRef();
  tableName: string = "MOT_DATA";

  state: MOTGameState = {
    ...this.state,
    vts: 3,
  };

  setParams = async () => {
    try {
      const response = await fetch("/api/get-mot-params");
      const result = await response.json();
      this.startingVtsRef.current = result[0].starting_vts;

      this.highlightedBallsRef.current = [];
      this.actualBallsRef.current = [];
      this.clickedBallsRef.current = new Set();
      this.wrongBallsRef.current = [];
      this.correctBallsRef.current = [];
      this.isClickableRef.current = false;
      this.ballRadiusRef.current = 70;
      this.gameEndTimeRef.current = 0;
      this.dataRef.current = {
        timeOfData: new Date(),
        params: { vts: result[0].starting_vts },
        scores: [],
        age: 0,
        highestLevel: "",
        timeToClicks: [],
        screenWidth: 0,
        screenHeight: 0,
        ballSize: 0,
        duration: result[0].duration,
        numPracticeRounds: result[0].practice_trials,
        trialRounds: result[0].trials,
      };
    } catch (error) {
      console.error("Error fetching MOT params:", error);
    }
  };

  constructor(props: GameInterface<MOT_Data, MOTParams>) {
    super(props);

    this.setParams();
  }

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.ballRadiusRef.current!,
      8,
      Ball
    ) as BallType[];
  }

  setup = () => {
    let currentSpeed = 0.01;
    this.ballRadiusRef.current = Math.max(
      Math.round(window.innerWidth / 27),
      40
    );

    this.dataRef.current!.ballSize = this.ballRadiusRef.current!;
    this.createBalls();

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(
        Math.floor(Math.random() * this.ballsRef.current!.length)
      );
    }
    this.highlightedBallsRef.current = Array.from(uniqueIndices);
    this.actualBallsRef.current = this.highlightedBallsRef.current;

    return { currentSpeed };
  };

  update = (balls: BallType[], currentSpeed: number) => {
    resolveCollisionsWithWalls(balls, currentSpeed, this.canvasRef.current!);
    resolveCollisions(balls, currentSpeed);

    balls.forEach((ball, index) =>
      ball.drawBall(
        ball,
        this.highlightedBallsRef.current!.includes(index),
        this.ctxRef.current!,
        this.wrongBallsRef.current &&
          this.wrongBallsRef.current!.includes(index),
        this.correctBallsRef.current &&
          this.correctBallsRef.current!.includes(index)
      )
    );
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
    this.ctxRef.current = this.canvasRef.current!.getContext("2d")!;
    this.canvasRef.current!.width = window.innerWidth;
    this.canvasRef.current!.height = window.innerHeight;

    let { currentSpeed } = this.setup();
    const balls = this.ballsRef.current!;

    const animate = () => {
      this.animationFrameIdRef.current = requestAnimationFrame(animate);

      this.ctxRef.current!.clearRect(
        0,
        0,
        this.canvasRef.current!.width,
        this.canvasRef.current!.height
      );
      this.ctxRef.current!.fillStyle = "#1B1B1B";
      this.ctxRef.current!.fillRect(
        0,
        0,
        this.canvasRef.current!.width,
        this.canvasRef.current!.height
      );
      this.update(balls, currentSpeed);
    };
    animate();

    setTimeout(() => {
      currentSpeed = this.state.vts;
      this.highlightedBallsRef.current = [];
    }, 1000);

    const timerId = setTimeout(() => {
      if (this.animationFrameIdRef.current) {
        currentSpeed = 0;
      }
      this.canvasRef.current!.addEventListener("click", clickEventAfterGame);
      this.gameEndTimeRef.current = Date.now();
      this.ballsRef.current!.forEach((ball) => ball.reset());
      this.canvasRef.current!.removeEventListener(
        "click",
        clickEventDuringGame
      );
    }, this.dataRef.current!.duration * 1000);

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
          this.dataRef.current!.timeToClicks.push(
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
              this.update(balls, currentSpeed);
            }, 10);

            if (score === 4) {
              this.setState({ vts: this.state.vts + 1 } as MOTGameState);
            } else if (this.state.vts > 2) {
              this.setState({ vts: this.state.vts - 1 } as MOTGameState);
            }
            this.dataRef.current!.scores.push(score);
            this.isClickableRef.current = false;
            this.clickedBallsRef.current!.clear();
            this.highlightedBallsRef.current = [];

            setTimeout(() => {
              this.wrongBallsRef.current = [];
              this.correctBallsRef.current = [];
              setTimeout(() => {
                this.setState({ trial: this.state.trial + 1 });

                if (
                  this.isPracticeRef.current &&
                  this.state.trial + 1 > this.dataRef.current!.numPracticeRounds
                ) {
                  this.setState({
                    vts: this.startingVtsRef.current!,
                  } as MOTGameState);
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

  addFormData = (formData: Record<string, any>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
  };

  submitData = async (formData: Record<string, any>) => {
    this.addFormData(formData);
    console.log("submitting data to table", this.tableName);
    try {
      const response = await fetch("/api/add-mot-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...this.dataRef.current!,
          table: this.tableName,
        }),
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

export default MOTGame;
