"use client";

import { Component, createRef, MutableRefObject } from "react";
import InstructionDialog from "./modals/InstructionDialog";
import Countdown from "./Countdown";
import GameObserver from "./GameObserver";

export interface GameState {
  trial: number;
  instructions: { step: number; image: string }[];
  showInstructions: boolean;
  showCountdown: boolean;
  isRunning: boolean;
  isPractice: boolean;
}

export interface GameProps {
  gameId: string;
}

class Game<TParams> extends Component<GameProps, GameState> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = { current: null };
  animationFrameIdRef = createRef<number>();
  paramsRef: MutableRefObject<TParams | null> = { current: null };
  renderGame() {}
  resetSelection() {}
  instructions: { step: number; image: string }[] = [];
  gameId: string;
  isClickableRef: MutableRefObject<boolean> = { current: false };
  gameEndTimeRef: MutableRefObject<number> = { current: 0 };

  constructor(props: GameProps) {
    super(props);
    this.gameId = props.gameId;
    this.state = {
      trial: 0,
      instructions: [],
      showInstructions: true,
      showCountdown: false,
      isRunning: false,
      isPractice: true
    };
  }

  async fetchParams() {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/games/${this.gameId}`);
      const result = await response.json();
      this.paramsRef.current = result.data.parameters;
      this.setState({ instructions: result.data.instructions });
    } catch (error) {
      console.error("Error fetching TNT params:", error);
    }
  }

  componentDidMount() {
    this.fetchParams();

    this.ctxRef.current = this.canvasRef.current!.getContext("2d")!;
    this.canvasRef.current!.width = window.innerWidth;
    this.canvasRef.current!.height = window.innerHeight;
  }

  componentDidUpdate() {
    if (this.canvasRef.current && this.state.isRunning) {
      this.renderGame();
    }
  }

  render() {
    return (
      <main>
        <canvas ref={this.canvasRef} className="block" />
        {this.state.showCountdown && (
          <Countdown
            onCountdownEnd={() =>
              this.setState({ showCountdown: false, isRunning: true })
            }
          />
        )}
        {this.state.showInstructions && (
          <InstructionDialog
            instructions={this.state.instructions}
            onStart={() =>
              this.setState({ showCountdown: true, showInstructions: false })
            }
          />
        )}
      </main>
    );
  }
}

export default Game;
