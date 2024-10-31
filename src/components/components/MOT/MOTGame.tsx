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
import { MOTCalculateScore } from "./scoring";
import { instructions, formFields } from "./metaData";
import Game, { GameInterface, GameState } from "../Game/Game";

export interface MOTParams {
  vts: number;
}

export interface MOTGameState extends GameState {
  vts: number;
}

class MOTGame extends Game<MOT_Data, MOTParams> {
  highlightedBallsRef: MutableRefObject<number[] | null> =
    createRef<number[]>();
  actualBallsRef: MutableRefObject<number[] | null> = createRef();
  clickedBallsRef: MutableRefObject<Set<number> | null> = createRef();
  wrongBallsRef: MutableRefObject<number[] | null> = createRef();
  correctBallsRef: MutableRefObject<number[] | null> = createRef();
  isClickableRef: MutableRefObject<boolean | null> = createRef();
  durationRef: MutableRefObject<number | null> = createRef();
  ballRadiusRef: MutableRefObject<number | null> = createRef();
  startingVtsRef: MutableRefObject<number | null> = createRef();
  gameEndTimeRef: MutableRefObject<number | null> = createRef();
  totalPracticeTrialsRef: MutableRefObject<number | null> = createRef();
  totalTrialsRef: MutableRefObject<number | null> = createRef();
  dataRef: MutableRefObject<MOT_Data | null> = createRef();

  state: MOTGameState = {
    ...this.state, // Initialize inherited state
    vts: 3, // Add vts specifically for MOTGame
  };

  setParams = async () => {
    try {
      const response = await fetch("/api/get-mot-params");
      const result = await response.json();
      this.durationRef.current = result[0].duration;
      this.startingVtsRef.current = result[0].starting_vts;
      this.totalPracticeTrialsRef.current = result[0].practice_trials;
      this.totalTrialsRef.current = result[0].trials;

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

  createBalls(canvas: HTMLCanvasElement) {
    return createBalls(canvas, this.ballRadiusRef.current!, 8, Ball);
  }

  setup = (canvas: HTMLCanvasElement) => {
    let currentSpeed = 0.01;
    this.ballRadiusRef.current = Math.max(
      Math.round(window.innerWidth / 27),
      40
    );

    this.dataRef.current!.ballSize = this.ballRadiusRef.current!;
    const balls = this.createBalls(canvas);

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(Math.floor(Math.random() * balls.length));
    }
    this.highlightedBallsRef.current = Array.from(uniqueIndices);
    this.actualBallsRef.current = this.highlightedBallsRef.current;

    return { currentSpeed, balls };
  };

  update = (
    balls: Ball[],
    currentSpeed: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    resolveCollisionsWithWalls(balls, currentSpeed, canvas);
    resolveCollisions(balls, currentSpeed);

    balls.forEach((ball, index) =>
      ball.drawBall(
        ball,
        this.highlightedBallsRef.current!.includes(index),
        ctx,
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

  renderGame = (
    canvas: HTMLCanvasElement,
    animationFrameIdRef: React.MutableRefObject<number | null>,
    setTrial: (trial: number) => void,
    setIsRunning: (isRunning: boolean) => void,
    trial: number,
    isPractice: boolean
  ) => {
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let { currentSpeed, balls } = this.setup(canvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1B1B1B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.update(balls, currentSpeed, canvas, ctx);

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    setTimeout(() => {
      currentSpeed = this.state.vts;
      this.highlightedBallsRef.current = [];
    }, 1000);

    const timerId = setTimeout(() => {
      if (animationFrameIdRef.current) {
        currentSpeed = 0;
      }
      this.isClickableRef.current = true;
      this.gameEndTimeRef.current = Date.now();
      balls.forEach((ball) => ball.reset());
    }, this.durationRef.current! * 1000);

    const handleClick = (event: MouseEvent) => {
      if (!this.isClickableRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      balls.forEach((ball, index) => {
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
            canvas.removeEventListener("click", handleClick);

            const { score, wrongBalls, correctBalls } = this.calculateScore(
              Array.from(this.clickedBallsRef.current!),
              this.actualBallsRef.current!
            );

            this.wrongBallsRef.current = wrongBalls;
            this.correctBallsRef.current = correctBalls;

            setTimeout(() => {
              this.update(balls, currentSpeed, canvas, ctx);
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
                setTrial(trial + 1);

                if (
                  isPractice &&
                  trial + 1 > this.dataRef.current!.numPracticeRounds
                ) {
                  this.setState({
                    vts: this.startingVtsRef.current!,
                  } as MOTGameState);
                }
                setIsRunning(false);
              }, 500);
            }, 1000);
          }
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      clearTimeout(timerId);
    };
  };

  onBeforeSubmit = (formData: Record<string, any>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
    return "MOT_DATA";
  };

  submitData = async (formData: Record<string, any>) => {
    const tableName = this.onBeforeSubmit(this.dataRef.current!);
    console.log("submitting data to table", tableName);
    try {
      const response = await fetch("/api/add-mot-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...this.dataRef.current!, table: tableName }),
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

  render() {
    return (
      <div>
        <div className="absolute top-20 right-10 text-white text-2xl text-left">
          {`Current Speed: ${this.state.vts}`}
        </div>
        <Game<MOT_Data, MOTParams>
          submitData={this.submitData}
          instructions={instructions}
          formFields={formFields}
          calculateScores={MOTCalculateScore}
          render={this.renderGame}
          dataRef={this.dataRef}
        />
      </div>
    );
  }
}

export default MOTGame;
