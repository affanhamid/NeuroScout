"use client";

import { Component, createRef, MutableRefObject } from "react";
import InstructionDialog from "./modals/InstructionDialog";
import Countdown from "./Countdown";
import TrialCompleteDialog from "./modals/TrialCompletedDialog";

export interface GameState {
  trial: number;
  instructions: { step: number; image: string }[];
  showInstructions: boolean;
  showCountdown: boolean;
  isRunning: boolean;
  isPractice: boolean;
  showPracticeComplete: boolean;
  showTrialComplete: boolean;
  showReset: boolean;
  showThankYou: boolean;
}

export interface GameProps {
  gameId: string;
}

type BaseParams = {
  data: {
    duration: number;
    trials: number;
    practiceTrials: number;
  };
}[];

class Game<TParams extends BaseParams> extends Component<GameProps, GameState> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = { current: null };
  animationFrameIdRef = createRef<number>();
  paramsRef: MutableRefObject<TParams | null> = { current: null };
  renderGame() {}
  resetSelection() {}
  resetGame() {}
  instructions: { step: number; image: string }[] = [];
  gameId: string;
  handleMouseClickDuringGame(e: MouseEvent) {}
  handleMouseClickAfterGame(e: MouseEvent) {}
  handleMouseMove(e: MouseEvent) {}
  handleMouseDown(e: MouseEvent) {}
  handleMouseUp(e: MouseEvent) {}
  gameEndTimeRef: MutableRefObject<number> = { current: 0 };

  constructor(props: GameProps) {
    super(props);
    this.gameId = props.gameId;
    this.state = {
      trial: 1,
      instructions: [],
      showInstructions: true,
      showCountdown: false,
      isRunning: false,
      isPractice: true,
      showPracticeComplete: false,
      showTrialComplete: false,
      showReset: false,
      showThankYou: false
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

  componentDidUpdate(prevProps: Readonly<GameProps>, prevState: GameState) {
    if (
      this.canvasRef.current &&
      !prevState.isRunning &&
      this.state.isRunning
    ) {
      console.log("starting new game");
      this.renderGame();

      this.canvasRef.current!.addEventListener(
        "click",
        this.handleMouseClickDuringGame.bind(this)
      );

      this.canvasRef.current!.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );

      this.canvasRef.current!.addEventListener(
        "mousedown",
        this.handleMouseDown.bind(this)
      );
      this.canvasRef.current!.addEventListener(
        "mouseup",
        this.handleMouseUp.bind(this)
      );

      setTimeout(() => {
        this.resetGame();

        this.canvasRef.current!.addEventListener(
          "click",
          this.handleMouseClickAfterGame.bind(this)
        );

        this.canvasRef.current!.removeEventListener(
          "click",
          this.handleMouseClickAfterGame.bind(this)
        );
        this.gameEndTimeRef.current = Date.now();
      }, this.paramsRef.current![0].data.duration * 1000);
    }
    if (prevState.trial !== this.state.trial) {
      this.handleTrialCompletion();
    }
  }

  handleTrialCompletion() {
    if (this.state.isPractice) {
      if (
        this.state.trial ===
        this.paramsRef.current![0].data.practiceTrials + 1
      ) {
        console.log(
          "practice complete",
          this.paramsRef.current![0].data.practiceTrials,
          this.state.trial
        );
        this.setState({
          trial: 1,
          showPracticeComplete: true,
          showReset: false,
          isPractice: false
        });
      } else {
        if (this.state.trial !== 1) {
          console.log("showing trial complete");
          this.setState({ showTrialComplete: true, showReset: false });
        }
      }
    } else {
      if (this.state.trial === this.paramsRef.current![0].data.trials + 1) {
        this.setState({ showThankYou: true, showReset: false });
      } else {
        this.setState({ showTrialComplete: true, showReset: false });
      }
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
        {this.state.showTrialComplete && (
          <TrialCompleteDialog
            onStart={() =>
              this.setState({ showCountdown: true, showTrialComplete: false })
            }
            onShowInstructions={() =>
              this.setState({
                showInstructions: true,
                showTrialComplete: false
              })
            }
          />
        )}
        {
          <div className="absolute top-10 right-10 text-white">
            {this.state.trial}
          </div>
        }
      </main>
    );
  }
}

export default Game;
