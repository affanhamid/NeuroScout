"use client";

import { Component, createRef, MutableRefObject } from "react";
import InstructionDialog from "./modals/InstructionDialog";
import Countdown from "./Countdown";
import TrialCompleteDialog from "./modals/TrialCompletedDialog";
import PracticeCompleteDialog from "./modals/PracticeCompleteDialog";
import ThankYouDialog from "./modals/ThankyouDialog";

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
  instructions: { step: number; image: string }[] = [];
  gameId: string;
  handleMouseClickDuringGame(e: MouseEvent) {}
  handleMouseClickAfterGame(e: MouseEvent) {}
  handleMouseMove(e: MouseEvent) {}
  handleMouseDown(e: MouseEvent) {}
  handleMouseUp(e: MouseEvent) {}

  // Timer tracking
  timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> = { current: null };
  showTimer: number = 0; // Class variable for the timer

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
      this.startTimer(this.paramsRef.current![0].data.duration);
    }
    if (prevState.trial !== this.state.trial) {
      this.handleTrialCompletion();
    }
  }

  startTimer(duration: number) {
    this.showTimer = duration; // Initialize timer
    this.timerIntervalRef.current = setInterval(() => {
      if (this.showTimer > 0) {
        this.showTimer -= 1; // Decrement timer
        this.forceUpdate(); // Trigger a re-render to update the UI
      } else {
        clearInterval(this.timerIntervalRef.current!); // Stop timer when it reaches 0
      }
    }, 1000); // Update every second
  }

  stopTimer() {
    if (this.timerIntervalRef.current) {
      clearInterval(this.timerIntervalRef.current); // Cleanup interval
    }
  }

  drawBackground() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;
    ctx.fillStyle = "#1B1B1B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  handleTrialCompletion() {
    if (this.state.isPractice) {
      if (
        this.state.trial ===
        this.paramsRef.current![0].data.practiceTrials + 1
      ) {
        this.setState({
          trial: 1,
          showPracticeComplete: true,
          showReset: false,
          isPractice: false
        });
      } else if (this.state.trial !== 1) {
        this.setState({ showTrialComplete: true, showReset: false });
      }
    } else if (this.state.trial !== 1) {
      if (this.state.trial === this.paramsRef.current![0].data.trials + 1) {
        this.setState({
          showThankYou: true,
          showReset: false,
          showCountdown: false
        });
      } else {
        this.setState({ showTrialComplete: true, showReset: false });
      }
    }
  }

  resetGame() {
    this.stopTimer(); // Stop the timer when the game resets
    this.showTimer = 0;
  }

  getHUD() {
    if (this.state.isRunning) {
      return (
        <div className="absolute top-10 right-10 text-white text-lg">
          <span>
            Trial: {this.state.trial} | Time Left: {this.showTimer}s
          </span>
        </div>
      );
    } else {
      return <div></div>;
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

        {this.state.showPracticeComplete && (
          <PracticeCompleteDialog
            onStart={() => {
              this.setState({
                showCountdown: true,
                showPracticeComplete: false
              });
            }}
            onShowInstructions={() =>
              this.setState({
                showInstructions: true,
                showPracticeComplete: false
              })
            }
          />
        )}
        {this.state.showThankYou && <ThankYouDialog redirectLink="/" />}
        {this.getHUD()}
      </main>
    );
  }
}

export default Game;
