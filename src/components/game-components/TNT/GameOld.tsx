
"use client";

import { Component, createRef } from "react";
import Countdown from "./Countdown";
import InstructionDialog from "./modals/InstructionDialog";

export interface GameState {
  trial: number;
  isRunning: boolean;
  isPractice: boolean;
  showInstructions: boolean;
  showThankYou: boolean;
  showResults: boolean;
  showPracticeComplete: boolean;
  showCountdown: boolean;
  showTrialComplete: boolean;
  showReset: boolean;
  instructions: { step: number; image: string }[];
}

class Game<
  TParams extends { trials: number; practiceTrials: number }
> extends Component<object, GameState> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef = createRef<CanvasRenderingContext2D>();
  animationFrameIdRef = createRef<number>();
  paramsRef = createRef<TParams>();
  renderGame = () => {};
  resetSelection = () => {};
  instructions: { step: number; image: string }[] = [];
  gameId: string;

  constructor(props: { gameId: string }) {
    super(props);
    this.state = {
      trial: 1,
      isRunning: false,
      isPractice: true,
      showInstructions: true,
      showThankYou: false,
      showResults: false,
      showPracticeComplete: false,
      showCountdown: false,
      showTrialComplete: false,
      showReset: false,
      instructions: []
    };
    this.gameId = props.gameId;
  }
  async fetchParams() {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/games/${this.gameId}`);
      const result = await response.json();
      console.log("result: ", result);
      this.setState({ instructions: result.data.instructions });
    } catch (error) {
      console.error("Error fetching TNT params:", error);
    }
  }
  componentDidMount() {
    this.fetchParams();
  }

  componentDidUpdate(prevState: GameState) {
    if (
      this.canvasRef.current &&
      prevState.isRunning !== this.state.isRunning &&
      this.state.isRunning
    ) {
      this.renderGame();
    } else if (
      prevState.isRunning !== this.state.isRunning &&
      !this.state.isRunning
    ) {
      this.handleTrialCompletion();
    }
  }

  handleTrialCompletion() {
    const { trial } = this.state;

    if (this.state.isPractice) {
      if (
        this.paramsRef?.current?.practiceTrials &&
        trial === this.paramsRef?.current?.practiceTrials + 1
      ) {
        this.setState({
          trial: 1,
          showPracticeComplete: true,
          showReset: false,
          isPractice: false
        });
      } else {
        if (trial !== 1) {
          this.setState({ showTrialComplete: true, showReset: false });
        }
      }
    } else {
      if (
        this.paramsRef?.current?.trials &&
        trial === this.paramsRef?.current?.trials + 1
      ) {
        this.setState({ showThankYou: true, showReset: false });
      } else {
        this.setState({ showTrialComplete: true, showReset: false });
      }
    }
  }

  startGame = () => {
    this.setState({ isRunning: true });
  };

  render() {
    return (
      <main>
        <canvas ref={this.canvasRef} className="block" />
        {this.state.showCountdown && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
            <Countdown
              onComplete={() => {
                this.setState({ showCountdown: false });
                this.startGame();
              }}
            />
          </div>
        )}
        <div className="absolute top-10 right-10 text-white text-2xl text-left">
          {this.state.isPractice && this.paramsRef?.current?.trials
            ? `Practice Trial: ${this.state.trial}/${this.paramsRef.current.practiceTrials}`
            : this.paramsRef?.current?.trials &&
              `Trial: ${this.state.trial}/${this.paramsRef.current.trials}`}
        </div>

        {this.state.showReset && (
          <button
            className="text-black bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 absolute top-20 right-10 text-white text-2xl text-left"
            onClick={this.resetSelection}
          >
            Reset Selection
          </button>
        )}
        {this.state.showInstructions && (
          <InstructionDialog instructions={this.state.instructions} />
        )}
      </main>
    );
  }
}

export default Game;
