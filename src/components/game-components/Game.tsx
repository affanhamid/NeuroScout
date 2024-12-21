"use client";

import { Component, createRef, MutableRefObject } from "react";
import InstructionDialog from "./modals/InstructionDialog";
import { Countdown, GameObserver } from "./utils";
import TrialCompleteDialog from "./modals/TrialCompletedDialog";
import PracticeCompleteDialog from "./modals/PracticeCompleteDialog";
import ThankYouDialog from "./modals/ThankyouDialog";
import games from "./gameSequence";

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
  gameObserver: GameObserver | null = null;

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
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
    this.gameObserver = new GameObserver(this.canvasRef.current!);
  }

  componentDidUpdate(prevProps: Readonly<GameProps>, prevState: GameState) {
    if (
      this.canvasRef.current &&
      !prevState.isRunning &&
      this.state.isRunning
    ) {
      this.renderGame();

      this.gameObserver?.removeAllListeners();

      // Add listeners for the game using GameObserver
      this.gameObserver?.addListener("click", this.handleMouseClickDuringGame);
      this.gameObserver?.addListener("mousemove", this.handleMouseMove);
      this.gameObserver?.addListener("mousedown", this.handleMouseDown);
      this.gameObserver?.addListener("mouseup", this.handleMouseUp);

      setTimeout(() => {
        this.resetGame();

        this.gameObserver?.removeListener(
          "click",
          this.handleMouseClickDuringGame
        );
        this.gameObserver?.addListener("click", this.handleMouseClickAfterGame);

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
    this.setState({ isRunning: false });
    this.stopTimer();
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

  getNextgameId() {
    const thisGameIndex = games.findIndex((gameId) => gameId === this.gameId);
    if (!!thisGameIndex || thisGameIndex === games.length - 1) return "/";
    return games[thisGameIndex + 1];
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
        {this.state.showThankYou && (
          <ThankYouDialog redirectLink={this.getNextgameId()} />
        )}
        {this.getHUD()}
      </main>
    );
  }
}

export default Game;
