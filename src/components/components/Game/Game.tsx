"use client";
import React, { Component, MutableRefObject, createRef } from "react";
import {
  InstructionDialog,
  PracticeCompleteDialog,
  ThankYouDialog,
  ResultsDialog,
} from "../modals";

import Countdown from "../Countdown/Countdown";

import type {
  InstructionStepInterface,
  FormFieldInterface,
} from "../modals/Types";
import { TrialCompletedDialog } from "../modals/TrialCompletedDialog";
import { InferInsertModel } from "drizzle-orm";
import { data, param, result } from "@/drizzle/schema";

export interface GameInterface<TParam> {
  instructions: InstructionStepInterface[];
  formFields: FormFieldInterface[];
  calculateScores: (
    scores: number[],
    params: TParam,
    practiceRounds: number,
  ) => { currentScore: number; perfectScore: number };
}

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
}

type BaseTData = InferInsertModel<typeof data>;
type BaseTParams = InferInsertModel<typeof param>;
type BaseResult = InferInsertModel<typeof result> & {
  result: {
    scores: number[];
  };
};

class Game<
  TData extends BaseTData,
  TParams extends BaseTParams,
  TResult extends BaseResult,
> extends Component<GameInterface<TParams>, GameState> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = createRef();
  animationFrameIdRef: MutableRefObject<number> = { current: 0 };
  dataRef: MutableRefObject<TData | null> = createRef();
  resultRef: MutableRefObject<TResult | null> = createRef();
  paramsRef: MutableRefObject<TParams | null> = createRef();
  renderGame: () => void = () => {};
  submitData: (formData: Record<string, string>) => Promise<void> =
    async () => {};

  constructor(props: GameInterface<TParams>) {
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
    };
  }

  componentDidMount() {
    this.setState({ showInstructions: true });
  }

  componentDidUpdate(
    prevProps: GameInterface<TData, TParam>,
    prevState: GameState,
  ) {
    if (prevState.isRunning !== this.state.isRunning && this.state.isRunning) {
      this.canvasRef.current && this.renderGame();
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
          isPractice: false,
        });
      } else {
        trial !== 1 &&
          this.setState({ showTrialComplete: true, showReset: false });
      }
    } else {
      if (
        this.paramsRef?.current?.trials &&
        trial === this.paramsRef?.current?.trials + 1
      ) {
        this.setState({ showThankYou: true });
      } else {
        this.setState({ showTrialComplete: true });
      }
    }
  }

  onSubmit = async (formData: Record<string, string>) => {
    this.dataRef.current && (await this.submitData(formData));
    this.setState({ showResults: true });
  };

  startGame = () => {
    this.setState({ isRunning: true });
  };

  onCountdownComplete = () => {
    this.startGame();
  };

  render() {
    const {
      showInstructions,
      showThankYou,
      showResults,
      showPracticeComplete,
      showCountdown,
      showTrialComplete,
      trial,
    } = this.state;
    const { instructions, formFields, calculateScores } = this.props;

    return (
      <div className="bg-game-background h-screen w-screen flex flex-col items-center justify-center">
        <canvas ref={this.canvasRef} className="block" />
        {showCountdown && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
            <Countdown
              onComplete={() => {
                this.setState({ showCountdown: false });
                this.onCountdownComplete();
              }}
            />
          </div>
        )}
        <div className="absolute top-10 right-10 text-white text-2xl text-left">
          {this.state.isPractice && this.paramsRef?.current?.trials
            ? `Practice Trial: ${trial}/${this.paramsRef.current.practiceTrials}`
            : this.paramsRef?.current?.trials &&
              `Trial: ${trial}/${this.paramsRef.current.trials}`}
        </div>

        {this.state.showReset && (
          <button
            className="text-black bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 absolute top-20 right-10 text-white text-2xl text-left"
            onClick={this.resetSelection}
          >
            Reset Selection
          </button>
        )}
        <InstructionDialog
          show={showInstructions}
          onClose={() =>
            this.setState({ showInstructions: false, showCountdown: true })
          }
          steps={instructions}
        />
        <ThankYouDialog
          show={showThankYou}
          onClose={() => this.setState({ showThankYou: false })}
          formFields={formFields}
          onSubmit={this.onSubmit}
        />
        <PracticeCompleteDialog
          show={showPracticeComplete}
          onClose={() =>
            this.setState({ showPracticeComplete: false, showCountdown: true })
          }
        />
        <TrialCompletedDialog
          show={showTrialComplete}
          onOpenInstructions={() =>
            this.setState({ showInstructions: true, showTrialComplete: false })
          }
          onClose={() =>
            this.setState({ showTrialComplete: false, showCountdown: true })
          }
        />
        <ResultsDialog<TParams>
          show={showResults}
          onClose={() => this.setState({ showResults: false })}
          scores={this.resultRef?.current?.result.scores || []}
          practiceRounds={this.paramsRef?.current?.practiceTrials || 0}
          params={this.paramsRef.current as TParams}
          calculateScore={calculateScores}
        />
      </div>
    );
  }
}

export default Game;
