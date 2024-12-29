"use client";

import { Component, createRef, MutableRefObject } from "react";
import InstructionDialog from "./modals/InstructionDialog";
import { Countdown } from "./utils";
import TrialCompleteDialog from "./modals/TrialCompletedDialog";
import PracticeCompleteDialog from "./modals/PracticeCompleteDialog";
import ThankYouDialog from "./modals/ThankyouDialog";
import games from "./gameSequence";
import { apiClient } from "@/lib/api/apiClient";
import { GameObservationFields, GameType } from "@/types";
import EventHandler from "./utils/EventHandler";

export interface GameState {
  trial: number;
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
  gameInfo: GameType;
}

export type GameSubmission<T> = GameObservationFields & {
  data: T;
};

export type BaseGameParams = {
  duration: number;
  trials: number;
  practiceTrials: number;
};

class Game<TData, TParams extends BaseGameParams> extends Component<
  GameProps,
  GameState
> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = { current: null };
  animationFrameIdRef = createRef<number>();
  paramsRef: MutableRefObject<TParams | null> = { current: null };
  renderGame() {}
  gameId: string;
  handleMouseClickDuringGame = (e: MouseEvent) => {
    void e;
  };
  handleMouseClickAfterGame = (e: MouseEvent) => {
    void e;
  };
  handleMouseMove = (e: MouseEvent) => {
    void e;
  };
  handleMouseDown = (e: MouseEvent) => {
    void e;
  };
  handleMouseUp = (e: MouseEvent) => {
    void e;
  };
  eventHandler: EventHandler | null = null;

  timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> = { current: null };
  showTimer: number = -1;

  gameEndTimeRef: MutableRefObject<number> = { current: 0 };
  data: TData;
  gameTimeout: ReturnType<typeof setTimeout> | null = null;

  rapidTrials = false;

  constructor(props: GameProps) {
    super(props);
    this.gameId = props.gameId;
    this.state = {
      trial: 1,
      showInstructions: true,
      showCountdown: false,
      isRunning: false,
      isPractice: true,
      showPracticeComplete: false,
      showTrialComplete: false,
      showReset: false,
      showThankYou: false
    };
    this.data = {} as TData;

    this.paramsRef.current! = props.gameInfo.parameters[0].data;
  }

  skipPractice = () => {
    this.stopTimer();
    this.setState({
      trial: this.paramsRef.current!.practiceTrials + 1,
      isPractice: false,
      isRunning: false
    });
  };

  onSubmit = async () => {
    const playerId = sessionStorage.getItem("playerId");
    if (!playerId || !this.gameId || !this.data) {
      return;
    }
    await apiClient("/api/game-observations", {
      method: "POST",
      body: { data: this.data, gameId: this.gameId, playerId }
    });
  };

  componentDidMount() {
    this.ctxRef.current = this.canvasRef.current!.getContext("2d")!;
    this.canvasRef.current!.width = window.innerWidth;
    this.canvasRef.current!.height = window.innerHeight;
    this.eventHandler = new EventHandler(this.canvasRef.current!);
  }

  addEventListenersDuringGame = () => {};

  addEventListenersAfterGame = () => {};

  componentDidUpdate(prevProps: Readonly<GameProps>, prevState: GameState) {
    void prevProps;
    if (
      this.canvasRef.current &&
      !prevState.isRunning &&
      this.state.isRunning
    ) {
      this.renderGame();
      this.eventHandler?.removeAll();
      this.addEventListenersDuringGame();

      this.gameTimeout = setTimeout(() => {
        this.resetGame();

        this.eventHandler?.removeAll();
        this.addEventListenersAfterGame();

        this.gameEndTimeRef.current = Date.now();
      }, this.paramsRef.current!.duration * 1000);

      this.startTimer(this.paramsRef.current!.duration);
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
        this.forceUpdate();
      } else {
        clearInterval(this.timerIntervalRef.current!); // Stop timer when it reaches 0
      }
    }, 1000); // Update every second
  }

  stopTimer() {
    if (this.gameTimeout) {
      clearTimeout(this.gameTimeout);
    }
    if (this.timerIntervalRef.current) {
      clearInterval(this.timerIntervalRef.current); // Cleanup interval
    }
  }

  componentWillUnmount() {
    this.stopTimer();

    // Cancel animation frame
    if (this.animationFrameIdRef.current) {
      cancelAnimationFrame(this.animationFrameIdRef.current);
    }

    // Remove all event listeners
    this.eventHandler?.removeAll();
  }

  drawBackground() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;
    ctx.fillStyle = "#1B1B1B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  handleTrialCompletion() {
    if (this.state.isPractice) {
      if (this.state.trial === this.paramsRef.current!.practiceTrials + 1) {
        this.setState({
          trial: 1,
          showPracticeComplete: true,
          showReset: false,
          isPractice: false
        });
      } else if (this.state.trial !== 1) {
        this.setState({
          showTrialComplete: !this.rapidTrials,
          showCountdown: this.rapidTrials,
          showReset: false
        });
      }
    } else if (this.state.trial !== 1) {
      if (this.state.trial === this.paramsRef.current!.trials + 1) {
        this.onSubmit();
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
    const shouldShowHUD = !this.state.showInstructions && 
                         !this.state.showTrialComplete && 
                         !this.state.showPracticeComplete && 
                         !this.state.showThankYou &&
                         !this.state.showCountdown;

    if (!shouldShowHUD || this.showTimer === -1) return null;

    return (
      <div className="absolute top-10 right-10 text-white text-lg">
        <span>
          {this.state.isPractice
            ? `Practice Trial: ${this.state.trial}`
            : `Trial: ${this.state.trial}`}{" "}
          | Time Left: {this.showTimer}s
        </span>
      </div>
    );
  }

  getNextgameId() {
    const thisGameIndex = games.findIndex((gameId) => gameId === this.gameId);
    if (!!thisGameIndex || thisGameIndex === games.length - 1) return "/";
    return games[thisGameIndex];
  }

  render() {
    const totalTrials: number = this.state.isPractice
    ? (this.paramsRef.current!.practiceTrials as number)
    : (this.paramsRef.current!.trials as number);
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
            gameInfo={this.props.gameInfo}
            onStart={() =>
              this.setState({ showCountdown: true, showInstructions: false })
            }
            skipPractice={this.skipPractice}
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
            nextTrialNum={this.state.trial}
            isPractice={this.state.isPractice}
            totalTrials={totalTrials}
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

