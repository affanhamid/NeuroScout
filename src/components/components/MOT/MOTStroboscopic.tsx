"use client";
import React from "react";
import {
  StrobeBall,
  createStrobeBalls,
  HIGHLIGHT_COLOR,
  resolveCollisions,
  resolveCollisionsWithWalls,
} from "./Ball";

import { Data, insertMOTData } from "@/database/MOT";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

interface MOTStroboscopicGameProps {
  gameInterface: GameInterface<Data, MOTParams>;
  strobeA: number;
  strobeB: number;
  isRandom: boolean;
}
export interface MOTStroboscopicGameState extends MOTGameState {
  strobeA: number;
  strobeB: number;
  isRandom: boolean;
}

class MOTStroboscopicGame extends MOTGame {
  strobeA: number;
  strobeB: number;
  isRandom: boolean;

  state: MOTStroboscopicGameState = {
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

  setup = (canvas: HTMLCanvasElement) => {
    let currentSpeed = 0.01;
    this.ballRadiusRef.current = Math.max(
      Math.round(window.innerWidth / 24),
      50
    );
    this.dataRef.current!.ballSize = this.ballRadiusRef.current!;

    // Use createStrobeBalls with strobe-specific settings
    const balls = createStrobeBalls(
      canvas,
      this.ballRadiusRef.current!,
      8,
      this.strobeA,
      this.strobeB,
      this.isRandom,
      true
    );

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(Math.floor(Math.random() * balls.length));
    }
    this.highlightedBallsRef.current = Array.from(uniqueIndices);
    this.actualBallsRef.current = this.highlightedBallsRef.current;

    return { currentSpeed, balls };
  };
}

export default MOTStroboscopicGame;
