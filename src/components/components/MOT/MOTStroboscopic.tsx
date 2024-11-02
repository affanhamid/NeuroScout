"use client";
import { MutableRefObject, createRef } from "react";
import { StrobeBall, createBalls } from "./Ball";

import { MOT_Strobe_Data } from "@/db/Types";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

class MOTStroboscopicGame extends MOTGame<StrobeBall> {
  dataRef: MutableRefObject<MOT_Strobe_Data | null> = createRef();
  tableName: string = "MOT_STROBE_DATA";

  state: MOTGameState = {
    ...this.state,
  };
  setParams = async () => {
    try {
      const response = await fetch("/api/get-mot-strobe-params");
      const result = await response.json();
      this.startingVtsRef.current = result[0].starting_vts;
      this.dataRef.current!.strobeA = result[0].strobe_a;
      this.dataRef.current!.strobeB = result[0].strobe_b;
      this.dataRef.current!.duration = result[0].duration;
      this.dataRef.current!.numPracticeRounds = result[0].practice_trials;
      this.dataRef.current!.trialRounds = result[0].practice_trials;
      this.dataRef.current!.params.vts = result[0].starting_vts;
    } catch (error) {
      console.error("Error fetching MOT params:", error);
    }
  };

  constructor(props: GameInterface<MOT_Strobe_Data, MOTParams>) {
    super(props);
    this.setParams();
  }

  addFormData = (formData: Record<string, any>) => {
    this.dataRef.current!.age = parseInt(formData.age);
    this.dataRef.current!.highestLevel = formData.highestLevel;
    this.dataRef.current!.screenWidth = window.innerWidth;
    this.dataRef.current!.screenHeight = window.innerHeight;
    this.dataRef.current!.params.vts = this.state.vts;
  };

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.ballRadiusRef.current!,
      8,
      StrobeBall,
      this.dataRef.current!.strobeA,
      this.dataRef.current!.strobeB
    );
  }
}

export default MOTStroboscopicGame;
