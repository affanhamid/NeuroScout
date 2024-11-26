"use client";
import { MutableRefObject } from "react";
import { StrobeBall, createBalls } from "./Ball";
import { GameInterface } from "../../../components/components/Game/Game";
import TNTGame from "./TNT";
import { TNTGameState } from "./TNT";
import { InferInsertModel } from "drizzle-orm";
import { data, tntStrobeParam, param } from "@/drizzle/schema";

type TNT_Strobe_Data = InferInsertModel<typeof data>;

type TNT_Strobe_Params = InferInsertModel<typeof param> &
  InferInsertModel<typeof tntStrobeParam>;

class TNTStroboscopicGame extends TNTGame<StrobeBall, TNT_Strobe_Params> {
  dataRef: MutableRefObject<TNT_Strobe_Data> = {
    current: {
      timeOfData: new Date(),
      screenWidth: 0,
      screenHeight: 0,
      ballSize: 0,
      gameId: 3,
      paramId: 0,
    },
  };

  state: TNTGameState = {
    ...this.state,
  };

  constructor(props: GameInterface<TNT_Strobe_Params>) {
    super(props, false);
    this.setParams();
  }

  createBalls() {
    this.ballsRef.current = createBalls(
      this.canvasRef.current!,
      this.dataRef.current!.ballSize,
      8,
      StrobeBall,
      this.paramsRef.current!.strobeA,
      this.paramsRef.current!.strobeB,
    );
  }
}

export default TNTStroboscopicGame;
