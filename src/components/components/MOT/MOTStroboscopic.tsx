"use client";
import { MutableRefObject, createRef } from "react";
import { StrobeBall, createBalls } from "./Ball";

import { MOT_Strobe_Data } from "@/db/Types";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

class MOTStroboscopicGame extends MOTGame {
  dataRef: MutableRefObject<MOT_Strobe_Data | null> = createRef();

  state: MOTGameState = {
    ...this.state,
  };
  setParams = async () => {
    try {
      const response = await fetch("/api/get-mot-strobe-params");
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
        strobeA: result[0].strobe_a,
        strobeB: result[0].strobe_b,
      };
    } catch (error) {
      console.error("Error fetching MOT params:", error);
    }
  };

  constructor(props: GameInterface<MOT_Strobe_Data, MOTParams>) {
    super(props);
    this.setParams();
  }

  onBeforeSubmit = (formData: Record<string, any>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
    return "MOT_STROBE_DATA";
  };

  createBalls(canvas: HTMLCanvasElement) {
    return createBalls(
      canvas,
      this.ballRadiusRef.current!,
      8,
      StrobeBall,
      this.dataRef.current!.strobeA,
      this.dataRef.current!.strobeB
    );
  }
}

export default MOTStroboscopicGame;
