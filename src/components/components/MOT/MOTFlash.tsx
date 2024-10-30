"use client";
import { FlashBall, createBalls } from "./Ball";

import { Data } from "@/database/MOT";
import { GameInterface } from "../Game/Game";
import MOTGame from "./MOTGame";
import { MOTGameState, MOTParams } from "./MOTGame";

interface MOTFlashGameProps {
  gameInterface: GameInterface<Data, MOTParams>;
}

class MOTFlashGame extends MOTGame {
  state: MOTGameState = {
    ...this.state,
  };

  constructor(props: MOTFlashGameProps) {
    super(props.gameInterface);
  }

  createBalls(canvas: HTMLCanvasElement) {
    return createBalls(canvas, this.ballRadiusRef.current!, 8, FlashBall);
  }
}

export default MOTFlashGame;
