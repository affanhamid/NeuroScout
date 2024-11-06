"use client";
import { MutableRefObject, createRef } from "react";
import { StrobeBall, createBalls } from "./Ball";

import { TNT_Strobe_Data } from "@/db/Types";
import { GameInterface } from "../Game/Game";
import TNTGame from "./TNT";
import { TNTGameState, TNTParams } from "./TNT";

class TNTStroboscopicGame extends TNTGame<StrobeBall> {
  dataRef: MutableRefObject<TNT_Strobe_Data | null> = createRef();
  tableName: string = "TNT_STROBE_DATA";

  state: TNTGameState = {
    ...this.state,
  };
  setParams = async () => {
    try {
      const response = await fetch("/api/get-data?dataTable=TNT_STROBE_PARAMS");
      const result = await response.json();
      this.startingVtsRef.current = result[0].starting_vts;
      this.dataRef.current!.strobeA = result[0].strobe_a;
      this.dataRef.current!.strobeB = result[0].strobe_b;
      this.dataRef.current!.duration = result[0].duration;
      this.dataRef.current!.numPracticeRounds = result[0].practice_trials;
      this.dataRef.current!.trialRounds = result[0].practice_trials;
      this.dataRef.current!.params.vts = result[0].starting_vts;
    } catch (error) {
      console.error("Error fetching TNT params:", error);
    }
  };

  constructor(props: GameInterface<TNT_Strobe_Data, TNTParams>) {
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

export default TNTStroboscopicGame;
