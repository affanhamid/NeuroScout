"use client";
import { MutableRefObject, createRef } from "react";
import { FlashBall, HIGHLIGHT_COLOR, createBalls } from "./Ball";

import { TNT_Flash_Data } from "@/db/Types";
import { GameInterface } from "../Game/Game";
import TNTGame from "./TNT";
import { TNTGameState, TNTParams } from "./TNT";

class TNTFlashGame extends TNTGame<FlashBall> {
  dataRef: MutableRefObject<TNT_Flash_Data> = {
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
      trialRounds: 0,
      randomnessMean: 0,
      randomnessStd: 0,
    },
  };
  shouldFlashRef: MutableRefObject<boolean> = { current: true };
  reactionsTimesRef: MutableRefObject<number[]> = { current: [] };

  state: TNTGameState = {
    ...this.state,
  };

  setParams = async () => {
    try {
      const response = await fetch("/api/get-data?dataTable=TNT_FLASH_PARAMS");
      const result = await response.json();
      this.startingVtsRef.current = result[0].startingVts;

      this.reactionsTimesRef.current = [];

      this.dataRef.current!.randomnessMean = 1000;
      this.dataRef.current!.randomnessStd = 500;

      this.dataRef.current!.duration = result[0].duration;
      this.dataRef.current!.numPracticeRounds = result[0].practiceTrials;
      this.dataRef.current!.trialRounds = result[0].trials;
      this.dataRef.current!.params.vts = result[0].startingVts;
      this.shouldFlashRef.current = true;
    } catch (error) {
      console.error("Error fetching tnt flash params:", error);
    }
  };

  constructor(props: GameInterface<TNT_Flash_Data, TNTParams>) {
    super(props, false);
    this.setParams();
  }

  randomGaussian(mean: number, stddev: number) {
    let u = 1 - Math.random();
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stddev + mean;
  }

  addFormData = (formData: Record<string, any>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
  };

  selectRandomBallToFlash = () => {
    setTimeout(() => {
      const randomBall =
        this.ballsRef.current![
          Math.floor(Math.random() * this.ballsRef.current!.length)
        ];
      if (this.shouldFlashRef.current) {
        randomBall.flash();
      }
    }, 3000 + this.randomGaussian(this.dataRef.current!.randomnessMean, this.dataRef.current!.randomnessStd));
  };

  clickEventDuringGame(
    event: MouseEvent,
    balls: FlashBall[],
    canvas: HTMLCanvasElement
  ) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balls.forEach((ball, index) => {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ball.radius) {
        if (ball.isFlashed) {
          ball.click(this.selectRandomBallToFlash);
        }
      }
    });
  }

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.dataRef.current!.ballSize,
      8,
      FlashBall,
      this.reactionsTimesRef
    );

    this.selectRandomBallToFlash();

    setTimeout(() => {
      this.shouldFlashRef.current = false;
    }, this.dataRef.current!.duration * 1000 - 2000);
  }
}

export default TNTFlashGame;
