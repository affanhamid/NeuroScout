"use client";
import { MutableRefObject, createRef } from "react";
import { FlashBall, createBalls } from "./Ball";

import { MOT_Flash_Data } from "@/db/Types";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

class MOTFlashGame extends MOTGame {
  dataRef: MutableRefObject<MOT_Flash_Data | null> = createRef();
  reactionsTimesRef: MutableRefObject<number[] | null> = createRef();

  state: MOTGameState = {
    ...this.state,
  };

  setParams = async () => {
    try {
      const response = await fetch("/api/get-mot-flash-params");
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
        visibleTime: result[0].visible_time,
        invisibleTime: result[0].invisible_time,
      };
    } catch (error) {
      console.error("Error fetching MOT params:", error);
    }
  };

  constructor(props: GameInterface<MOT_Flash_Data, MOTParams>) {
    super(props);
    this.setParams();
  }

  onBeforeSubmit = (formData: Record<string, any>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
    return "MOT_FLASH_DATA";
  };

  selectRandomBallToFlash = (balls: FlashBall[]) => {
    const randomBall = balls[Math.floor(Math.random() * balls.length)];
    console.log(randomBall);
    randomBall.flash();
    return randomBall;
  };

  clickEventDuringGame(event: MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.balls.forEach((ball, index) => {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ball.radius) {
      }
    });
  }

  createBalls(canvas: HTMLCanvasElement) {
    const balls = createBalls(
      canvas,
      this.ballRadiusRef.current!,
      8,
      FlashBall,
      this.reactionsTimesRef.current!
    );
    setTimeout(() => {
      this.selectRandomBallToFlash(balls);
    }, 1000);
    this.balls = balls;
  }
}

export default MOTFlashGame;
