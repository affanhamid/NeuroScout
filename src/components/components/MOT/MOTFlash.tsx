"use client";
import { MutableRefObject, createRef } from "react";
import { FlashBall, HIGHLIGHT_COLOR, createBalls } from "./Ball";

import { MOT_Flash_Data } from "@/db/Types";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

class MOTFlashGame extends MOTGame<FlashBall> {
  dataRef: MutableRefObject<MOT_Flash_Data | null> = createRef();
  reactionsTimesRef: MutableRefObject<number[] | null> = createRef();

  state: MOTGameState = {
    ...this.state,
  };

  setParams = async () => {
    try {
      const response = await fetch("/api/get-mot-flash-params");
      const result = await response.json();
      this.startingVtsRef.current = result[0].starting_vts;

      this.reactionsTimesRef.current = [];

      this.dataRef.current!.randomnessMean = 1000;
      this.dataRef.current!.randomnessStd = 500;

      this.dataRef.current!.duration = result[0].duration;
      this.dataRef.current!.numPracticeRounds = result[0].practice_trials;
      this.dataRef.current!.trialRounds = result[0].practice_trials;
      this.dataRef.current!.params.vts = result[0].starting_vts;
    } catch (error) {
      console.error("Error fetching MOT params:", error);
    }
  };

  constructor(props: GameInterface<MOT_Flash_Data, MOTParams>) {
    super(props);
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
      randomBall.flash();
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
      this.ballRadiusRef.current!,
      8,
      FlashBall,
      this.reactionsTimesRef
    );

    this.selectRandomBallToFlash();
  }
}

export default MOTFlashGame;