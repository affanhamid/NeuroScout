"use client";
import { MutableRefObject } from "react";
import { GlowBall, createBalls } from "./Ball";
import { TNT_GLOW_DATA } from "@/drizzle/schema";
import { GameInterface } from "../Game/Game";
import TNTGame from "./TNT";
import { TNTGameState, TNTParams } from "./TNT";
import { InferInsertModel } from "drizzle-orm";

type TNT_Glow_Data = InferInsertModel<typeof TNT_GLOW_DATA> & {
  params: TNTParams;
};

class TNTGlowGame extends TNTGame<GlowBall> {
  dataRef: MutableRefObject<TNT_Glow_Data> = {
    current: {
      timeOfData: new Date(),
      params: {
        vts: 0,
      },
      scores: [],
      age: 0,
      highestLevel: "",
      timeToClicks: [],
      screenWidth: 0,
      screenHeight: 0,
      ballSize: 0,
      duration: 0,
      numPracticeRounds: 0,
      numTrialRounds: 0,
      randomnessMean: 0,
      randomnessStd: 0,
    },
  };
  shouldGlowRef: MutableRefObject<boolean> = { current: true };
  reactionsTimesRef: MutableRefObject<number[]> = { current: [] };

  state: TNTGameState = {
    ...this.state,
  };

  setParams = async () => {
    try {
      const response = await fetch(
        "/api/data/get-data?dataTable=TNT_GLOW_PARAMS",
      );
      const result = await response.json();
      this.startingVtsRef.current = result[0].startingVts;

      this.reactionsTimesRef.current = [];

      this.dataRef.current!.randomnessMean = 1000;
      this.dataRef.current!.randomnessStd = 500;

      this.dataRef.current!.duration = result[0].duration;
      this.dataRef.current!.numPracticeRounds = result[0].practiceTrials;
      this.dataRef.current!.numTrialRounds = result[0].trials;
      this.dataRef.current!.params.vts = result[0].startingVts;
      this.shouldGlowRef.current = true;
    } catch (error) {
      console.error("Error fetching tnt glow params:", error);
    }
  };

  constructor(props: GameInterface<TNT_Glow_Data, TNTParams>) {
    super(props, false);
    this.setParams();
  }

  randomGaussian(mean: number, stddev: number) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stddev + mean;
  }

  addFormData = (formData: Record<string, string>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
  };

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
      3000 +
        this.randomGaussian(
          this.dataRef.current!.randomnessMean,
          this.dataRef.current!.randomnessStd,
        ),
    );
  };

  clickEventDuringGame(
    event: MouseEvent,
    balls: GlowBall[],
    canvas: HTMLCanvasElement,
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
      this.reactionsTimesRef,
    );

    this.selectRandomBallToGlow();
    this.shouldGlowRef.current = true;
    setTimeout(
      () => {
        this.shouldGlowRef.current = false;
      },
      this.dataRef.current!.duration * 1000 - 2000,
    );
  }
}

export default TNTGlowGame;
