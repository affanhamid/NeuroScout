"use client";
import { MutableRefObject, createRef } from "react";
import {
  Ball,
  createBalls,
  HIGHLIGHT_COLOR,
  BASE_COLOR,
  resolveCollisions,
  resolveCollisionsWithWalls,
} from "./Ball";
import Game, {
  GameInterface,
  GameState,
} from "../../../components/components/Game/Game";
import { data, param, result, tntParam } from "@/drizzle/schema";
import { InferInsertModel } from "drizzle-orm";

type TNT_Data = InferInsertModel<typeof data>;

type TNTParams = InferInsertModel<typeof tntParam> &
  InferInsertModel<typeof param>;

type Result = InferInsertModel<typeof result> & {
  result: {
    scores: number[];
    timeToClicks: number[];
    finalVts: number;
  };
  formData: {
    age: number;
    highestLevel: string;
  };
};

export interface TNTGameState extends GameState {
  vts: number;
  showReset: boolean;
}

class TNTGame<BallType extends Ball, Params extends TNTParams> extends Game<
  TNT_Data,
  Params,
  Result
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
  dataRef: MutableRefObject<TNT_Data> = {
    current: {
      timeOfData: new Date(),
      screenWidth: 0,
      ballSize: 0,
      screenHeight: 0,
      gameId: 1,
      paramId: 0,
    },
  };
  resultRef: MutableRefObject<Result> = {
    current: {
      result: {
        scores: [],
        timeToClicks: [],
        finalVts: 0,
      },
      formData: {
        age: 0,
        highestLevel: "",
      },
    },
  };

  state: TNTGameState = {
    ...this.state,
    vts: 0,
  };

  setParams = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(
        `${baseUrl}/api/param/get-params?gameId=${this.dataRef.current.gameId}`,
      );
      const result = await response.json();
      this.gameEndTimeRef.current = 0;
      this.paramsRef.current = { ...result[0].param, ...result[0].paramValues };
      this.state.vts = this.paramsRef.current!.startingVts;
      this.dataRef.current.paramId = this.paramsRef.current.paramId;
    } catch (error) {
      console.error("Error fetching TNT params:", error);
    }
  };

  constructor(props: GameInterface<Params>, fetchParams: boolean = false) {
    super(props);
    if (fetchParams) {
      this.setParams();
    }
  }

  resetSelection = () => {
    this.clickedBallsRef.current!.clear();
    this.ballsRef.current.forEach((ball: Ball) => (ball.color = BASE_COLOR));
  };

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.dataRef.current!.ballSize,
      this.paramsRef.current!.numberOfBalls,
      Ball,
    ) as BallType[];
  }

  setup = async () => {
    this.dataRef.current!.ballSize = Math.max(
      Math.round(window.innerWidth / 27),
      40,
    );

    this.createBalls();

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(
        Math.floor(Math.random() * this.ballsRef.current!.length),
      );
    }
    this.highlightedBallsRef.current = Array.from(uniqueIndices);
    this.actualBallsRef.current = this.highlightedBallsRef.current;
  };

  update = (balls: BallType[], currentSpeed: number, deltaTime: number) => {
    resolveCollisionsWithWalls(
      balls,
      currentSpeed,
      this.canvasRef.current!.width,
      this.canvasRef.current!.height,
      deltaTime,
    );

    resolveCollisions(balls, currentSpeed, deltaTime);

    balls.forEach((ball, index) => {
      ball.drawBall(
        ball,
        this.highlightedBallsRef.current!.includes(index),
        this.ctxRef.current!,
        this.wrongBallsRef.current &&
          this.wrongBallsRef.current!.includes(index),
        this.correctBallsRef.current &&
          this.correctBallsRef.current!.includes(index),
      );
    });
  };

  calculateScore = (
    selected: number[],
    actual: number[],
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
    canvas: HTMLCanvasElement,
  ) {}

  renderGame = () => {
    this.ctxRef.current = this.canvasRef.current!.getContext("2d")!;
    this.canvasRef.current!.width = window.innerWidth;
    this.canvasRef.current!.height = window.innerHeight;

    this.setup();
    let currentSpeed = 0.01;
    const balls = this.ballsRef.current!;

    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const deltaTime = Math.max(
        Math.min((timestamp - lastTimestamp) / 1000, 1),
        1e-6,
      );

      lastTimestamp = timestamp;

      // Clear and set background as usual
      this.ctxRef.current!.clearRect(
        0,
        0,
        this.canvasRef.current!.width,
        this.canvasRef.current!.height,
      );
      this.ctxRef.current!.fillStyle = "#1B1B1B";
      this.ctxRef.current!.fillRect(
        0,
        0,
        this.canvasRef.current!.width,
        this.canvasRef.current!.height,
      );

      // Update with deltaTime
      this.update(balls, currentSpeed, deltaTime);

      this.state.isRunning && requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    setTimeout(() => {
      currentSpeed = this.state.vts;
      this.highlightedBallsRef.current = [];
    }, 1000);

    const timerId = setTimeout(() => {
      currentSpeed = 0.1;
      this.setState({ showReset: true });
      this.canvasRef.current!.addEventListener("click", clickEventAfterGame);
      this.gameEndTimeRef.current = Date.now();
      this.ballsRef.current!.forEach((ball) => ball.reset());
      this.canvasRef.current!.removeEventListener(
        "click",
        clickEventDuringGame,
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
            Date.now() - this.gameEndTimeRef.current!,
          );

          if (this.clickedBallsRef.current!.size === 4) {
            this.canvasRef.current!.removeEventListener(
              "click",
              clickEventAfterGame,
            );

            const { score, wrongBalls, correctBalls } = this.calculateScore(
              Array.from(this.clickedBallsRef.current!),
              this.actualBallsRef.current!,
            );

            this.wrongBallsRef.current = wrongBalls;
            this.correctBallsRef.current = correctBalls;

            setTimeout(() => {
              this.update(balls, currentSpeed, 0);
            }, 10);

            if (score === 4) {
              this.setState({
                vts: this.state.vts + this.paramsRef.current!.changeInVts,
              } as TNTGameState);
            } else if (this.state.vts > 50) {
              this.setState({
                vts: this.state.vts - this.paramsRef.current!.changeInVts,
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
                    vts: this.paramsRef.current!.startingVts,
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
        this.canvasRef.current!,
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
      result: this.resultRef.current,
    };
    try {
      const response = await fetch("/api/data/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
