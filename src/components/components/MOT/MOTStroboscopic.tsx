"use client";
import React from "react";
import { StrobeBall, createBalls } from "./Ball";

import { Data } from "@/database/MOT";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

interface MOTStroboscopicGameProps {
  gameInterface: GameInterface<Data, MOTParams>;
  strobeA: number;
  strobeB: number;
  isRandom: boolean;
}

class MOTStroboscopicGame extends MOTGame {
  strobeA: number;
  strobeB: number;
  isRandom: boolean;

  state: MOTGameState = {
    ...this.state,
  };

  constructor(props: MOTStroboscopicGameProps) {
    super(props.gameInterface);
    this.strobeA = props.strobeA;
    this.strobeB = props.strobeB;
    this.isRandom = props.isRandom;

    // Modify the dataRef to include strobe properties
    this.dataRef.current!.isStrobe = true;
    this.dataRef.current!.strobeA = this.strobeA;
    this.dataRef.current!.strobeB = this.strobeB;
  }

  createBalls(canvas: HTMLCanvasElement) {
    return createBalls(
      canvas,
      this.ballRadiusRef.current!,
      8,
      StrobeBall,
      this.strobeA,
      this.strobeB,
      this.isRandom
    );
  }
}

export default MOTStroboscopicGame;
