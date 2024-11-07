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

export interface GameInterface<TData, TParam> {
  instructions: { steps: InstructionStepInterface[] };
  formFields: FormFieldInterface[];
  calculateScores: (
    scores: number[],
    params: TParam,
    practiceRounds: number
  ) => { currentScore: number; perfectScore: number };
}

export interface GameState {
  trial: number;
  isRunning: boolean;
  showInstructions: boolean;
  showThankYou: boolean;
  showResults: boolean;
  showPracticeComplete: boolean;
  showCountdown: boolean;
  showTrialComplete: boolean;
}

interface BaseTData<TParam> {
  scores: number[];
  numPracticeRounds: number;
  trialRounds: number;
  params: TParam;
  age: number;
  screenWidth: number;
  screenHeight: number;
  highestLevel: string;
}

class Game<
  TData extends BaseTData<TParam>,
  TParam extends {}
> extends Component<GameInterface<TData, TParam>, GameState> {
  canvasRef = createRef<HTMLCanvasElement>();
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = createRef();
  animationFrameIdRef: MutableRefObject<number> = { current: 0 };
  isPracticeRef: MutableRefObject<boolean> = { current: true };
  dataRef: MutableRefObject<TData | null> = createRef();
  renderGame: () => void = () => {};
  submitData: (formData: Record<string, any>) => Promise<void> = async () => {};

  constructor(props: GameInterface<TData, TParam>) {
    super(props);
    this.state = {
      trial: 1,
      isRunning: false,
      showInstructions: true,
      showThankYou: false,
      showResults: false,
      showPracticeComplete: false,
      showCountdown: false,
      showTrialComplete: false,
    };

    if (this.isPracticeRef.current === null) {
      this.isPracticeRef.current = true;
    }
  }

  componentDidMount() {
    this.setState({ showInstructions: true });
  }

  componentDidUpdate(
    prevProps: GameInterface<TData, TParam>,
    prevState: GameState
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

    if (this.isPracticeRef.current) {
      if (
        this.dataRef?.current?.numPracticeRounds &&
        trial === this.dataRef?.current?.numPracticeRounds + 1
      ) {
        this.isPracticeRef.current = false;
        this.setState({ trial: 1, showPracticeComplete: true });
      } else {
        trial !== 1 && this.setState({ showTrialComplete: true });
      }
    } else {
      if (
        this.dataRef?.current?.trialRounds &&
        trial === this.dataRef?.current?.trialRounds + 1
      ) {
        this.setState({ showThankYou: true });
      } else {
        this.setState({ showTrialComplete: true });
      }
    }
  }

  onSubmit = async (formData: Record<string, any>) => {
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
          {this.isPracticeRef.current && this.dataRef?.current?.trialRounds
            ? `Practice Trial: ${trial}/${this.dataRef.current.numPracticeRounds}`
            : this.dataRef?.current?.trialRounds &&
              `Trial: ${trial}/${this.dataRef.current.trialRounds}`}
        </div>
        <InstructionDialog
          show={showInstructions}
          onClose={() =>
            this.setState({ showInstructions: false, showCountdown: true })
          }
          steps={instructions.steps}
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
        <ResultsDialog<TParam>
          show={showResults}
          onClose={() => this.setState({ showResults: false })}
          scores={this.dataRef?.current?.scores || []}
          practiceRounds={this.dataRef?.current?.numPracticeRounds || 0}
          params={this.dataRef?.current?.params as TParam}
          calculateScore={calculateScores}
        />
      </div>
    );
  }
}

export default Game;
