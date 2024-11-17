"use client";
import { MutableRefObject } from "react";
import { StrobeBall, createBalls } from "./Ball";
import { GameInterface } from "../Game/Game";
import TNTGame from "./TNT";
import { TNTGameState, TNTParams } from "./TNT";
import { InferInsertModel } from "drizzle-orm";
import { TNT_STROBE_DATA } from "@/drizzle/schema";

type TNT_Strobe_Data = InferInsertModel<typeof TNT_STROBE_DATA> & {
  params: TNTParams;
};
class TNTStroboscopicGame extends TNTGame<StrobeBall> {
  dataRef: MutableRefObject<TNT_Strobe_Data> = {
    current: {
      timeOfData: new Date(),
      params: { vts: 0 },
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
      strobeA: 0,
      strobeB: 0,
    },
  };
  tableName: string = "TNT_STROBE_DATA";

  state: TNTGameState = {
    ...this.state,
  };
  setParams = async () => {
    try {
      const response = await fetch("/api/param/get-params?gameId=3");
      const result = await response.json();
      this.startingVtsRef.current = result[0].startingVts;
      this.state.vts = this.startingVtsRef.current;
      this.dataRef.current!.strobeA = result[0].strobeA;
      this.dataRef.current!.strobeB = result[0].strobeB;
      this.dataRef.current!.duration = result[0].duration;
      this.dataRef.current!.numPracticeRounds = result[0].practiceTrials;
      this.dataRef.current!.numTrialRounds = result[0].trials;
      this.dataRef.current!.params.vts = result[0].startingVts;
    } catch (error) {
      console.error("Error fetching TNT params:", error);
    }
  };

  constructor(props: GameInterface<TNT_Strobe_Data, TNTParams>) {
    super(props, false);
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
      this.dataRef.current!.ballSize,
      8,
      StrobeBall,
      this.dataRef.current!.strobeA,
      this.dataRef.current!.strobeB,
    );
  }
}

export default TNTStroboscopicGame;
