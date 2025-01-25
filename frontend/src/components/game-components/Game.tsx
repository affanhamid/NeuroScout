"use client";

import { Component, createRef, MutableRefObject } from "react";
import InstructionDialog from "./modals/InstructionDialog";
import { Countdown } from "./utils";
import TrialCompleteDialog from "./modals/TrialCompletedDialog";
import PracticeCompleteDialog from "./modals/PracticeCompleteDialog";
import ThankYouDialog from "./modals/ThankyouDialog";
import InstructionsModal from "./modals/InstructionsModal";
import games from "./gameSequence";
import { apiClient } from "@/lib/api/apiClient";
import { GameObservationFields, GameType } from "@/types";
import EventHandler from "./utils/EventHandler";

export type InstructionSource = 'practice-complete' | 'trial-complete' | null;

interface BaseGameState {
  trial: number;
  showInstructions: boolean;
  showCountdown: boolean;
  isRunning: boolean;
  isPractice: boolean;
  showPracticeComplete: boolean;
  showTrialComplete: boolean;
  showReset: boolean;
  showThankYou: boolean;
  showInstructionsModal: boolean;
  instructionSource: InstructionSource;
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
  BaseGameState
> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = { current: null };
  animationFrameIdRef: MutableRefObject<number | null> = { current: 0 };
  paramsRef: MutableRefObject<TParams | null> = { current: null };
  renderGame() {}
  gameId: string;
  eventHandler: EventHandler | null = null;

  timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> = { current: null };
  showTimer: number = -1;
  gameEndTimeRef: MutableRefObject<number> = { current: 0 };
  gameTimeout: ReturnType<typeof setTimeout> | null = null;

  data: TData;
  rapidTrials = false;
  getHUD = (): JSX.Element => <div></div>;
  animate = (timestamp: number) => {
    void timestamp;
  };

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
      showThankYou: false,
      showInstructionsModal: false,
      instructionSource: null
    };
    this.data = {} as TData;
    this.paramsRef.current! = props.gameInfo.parameters[0].data;
  }

  skipPractice = () => {
    this.stopTimer();
    this.setState({
      trial: 1,
      showInstructions: false,
      isPractice: false,
      showCountdown: true,
      showTrialComplete: false,
      showPracticeComplete: false
    });
  };

  onSubmit = async () => {
    const playerId =
      sessionStorage.getItem("playerId") || "6773dbc4add5c628e515c538";
    if (!playerId || !this.gameId || !this.data) {
      return;
    }
    await apiClient("/api/game-observations", {
      method: "POST",
      body: { data: this.data, gameId: this.gameId, playerId }
    });
  };

  handleInstructionsClose = () => {
    if (this.state.instructionSource === 'practice-complete') {
      this.setState({
        showInstructionsModal: false,
        showPracticeComplete: true,
        instructionSource: null
      });
    } else if (this.state.instructionSource === 'trial-complete') {
      this.setState({
        showInstructionsModal: false,
        showTrialComplete: true,
        instructionSource: null
      });
    } else {
      this.setState({
        showInstructionsModal: false,
        instructionSource: null
      });
    }
  };

  componentDidMount() {
    this.ctxRef.current = this.canvasRef.current!.getContext("2d")!;
    this.canvasRef.current!.width = window.innerWidth;
    this.canvasRef.current!.height = window.innerHeight;
    this.canvasRef.current!.setAttribute("tabindex", "0");
    this.canvasRef.current!.focus();
    this.eventHandler = new EventHandler(this.canvasRef.current!);
  }

  addEventListenersDuringGame = () => {};
  addEventListenersAfterGame = () => {};

  componentDidUpdate(prevProps: Readonly<GameProps>, prevState: BaseGameState) {
    void prevProps;
    if (
      this.canvasRef.current &&
      !prevState.isRunning &&
      this.state.isRunning
    ) {
      this.canvasRef.current?.focus();
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
    this.showTimer = duration;
    if (this.timerIntervalRef.current) {
      clearInterval(this.timerIntervalRef.current);
    }
    this.timerIntervalRef.current = setInterval(() => {
      if (this.showTimer > 0) {
        this.showTimer -= 1;
        this.forceUpdate();
      } else {
        if (this.timerIntervalRef.current) {
          clearInterval(this.timerIntervalRef.current);
        }
      }
    }, 1000);
  }

  stopTimer() {
    if (this.gameTimeout) {
      clearTimeout(this.gameTimeout);
      this.gameTimeout = null;
    }
    if (this.timerIntervalRef.current) {
      clearInterval(this.timerIntervalRef.current);
      this.timerIntervalRef.current = null;
    }
  }

  componentWillUnmount() {
    this.stopTimer();
    this.stopAnimationLoop();

    if (this.animationFrameIdRef.current) {
      cancelAnimationFrame(this.animationFrameIdRef.current);
    }

    this.eventHandler?.removeAll();
  }

  drawBackground() {
    const ctx = this.ctxRef.current!;
    const canvas = this.canvasRef.current!;
    ctx.fillStyle = "#1B1B1B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  handleTrialCompletion() {
    if (this.paramsRef.current?.duration) {
      this.showTimer = this.paramsRef.current.duration;
    }
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
          isRunning: this.rapidTrials,
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
        this.setState({
          showTrialComplete: !this.rapidTrials,
          isRunning: this.rapidTrials,
          showReset: false
        });
      }
    }
  }

  resetGame() {
    this.stopAnimationLoop();
    this.setState({ isRunning: false });
    this.stopTimer();
    this.showTimer = 0;
  }

  getBaseHUD() {
    return (
      <div className="absolute top-10 right-10 text-white text-lg">
        {this.showTimer === 0 ? (
          <div className="mb-4">
            <span>
              {this.state.isPractice
                ? `Practice Trial ${this.state.trial} of ${this.paramsRef.current!.practiceTrials}`
                : `Trial ${this.state.trial} of ${this.paramsRef.current!.trials}`}{" "}
            </span>
          </div>
        ) : (
          ""
        )}
        <span className="mt-3">{this.getHUD()}</span>
      </div>
    );
  }

  getNextgameId() {
    const thisGameIndex = games.findIndex((gameId) => gameId === this.gameId);
    if (thisGameIndex === -1 || thisGameIndex === games.length - 1) return "/";
    return games[thisGameIndex + 1];
  }

  startAnimationLoop() {
    if (!this.animationFrameIdRef.current) {
      this.animationFrameIdRef.current = requestAnimationFrame(this.animate);
    }
  }

  stopAnimationLoop() {
    if (this.animationFrameIdRef.current) {
      cancelAnimationFrame(this.animationFrameIdRef.current);
      this.animationFrameIdRef.current = null;
    }
  }

  render() {
    const totalTrials: number = this.state.isPractice
      ? (this.paramsRef.current!.practiceTrials as number)
      : (this.paramsRef.current!.trials as number);
      
    return (
      <main className="w-screen h-screen overflow-hidden">
        <canvas
          ref={this.canvasRef}
          className="block outline-none"
          tabIndex={0}
        />
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
                showInstructionsModal: true,
                showTrialComplete: false,
                instructionSource: 'trial-complete'
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
                showInstructionsModal: true,
                showPracticeComplete: false,
                instructionSource: 'practice-complete'
              })
            }
          />
        )}
        {this.state.showThankYou && (
          <ThankYouDialog redirectLink={this.getNextgameId()} />
        )}
        {this.state.showInstructionsModal && (
          <InstructionsModal
            instructions={this.props.gameInfo.instructions || []}
            onClose={this.handleInstructionsClose}
          />
        )}
        {this.getBaseHUD()}
      </main>
    );
  }
}

export default Game;