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
  submitData: (formData: Record<string, any>) => Promise<void>;
  instructions: { steps: InstructionStepInterface[] };
  formFields: FormFieldInterface[];
  calculateScores: (
    scores: number[],
    params: TParam,
    practiceRounds: number
  ) => { currentScore: number; perfectScore: number };
  render: (
    canvas: HTMLCanvasElement,
    animationFrameIdRef: React.MutableRefObject<number | null>,
    setTrial: (trial: number) => void,
    setIsRunning: (isRunning: boolean) => void,
    trial: number,
    isPractice: boolean
  ) => void;
  dataRef: React.MutableRefObject<TData | null>;
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
  practiceRounds: number;
  trialRounds: number;
  params: TParam;
  age: number;
  screenWidth: number;
  screenHeight: number;
  email: string;
  highestLevel: string;
}

class Game<
  TData extends BaseTData<TParam>,
  TParam extends {}
> extends Component<GameInterface<TData, TParam>, GameState> {
  canvasRef = createRef<HTMLCanvasElement>();
  animationFrameIdRef = createRef<number | null>();
  isPracticeRef: MutableRefObject<boolean | null> = createRef<boolean | null>();

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
      this.canvasRef.current &&
        this.props.render(
          this.canvasRef.current,
          this.animationFrameIdRef,
          (trial) => this.setState({ trial }), // Updated to avoid functional state
          (isRunning) => this.setState({ isRunning }),
          this.state.trial,
          this.isPracticeRef.current!
        );
    } else if (
      prevState.isRunning !== this.state.isRunning &&
      !this.state.isRunning
    ) {
      this.handleTrialCompletion();
    }
  }

  handleTrialCompletion() {
    const { trial } = this.state;
    const { dataRef } = this.props;

    if (this.isPracticeRef.current) {
      if (
        dataRef?.current?.practiceRounds &&
        trial === dataRef?.current?.practiceRounds + 1
      ) {
        this.isPracticeRef.current = false;
        this.setState({ trial: 1, showPracticeComplete: true });
      } else {
        trial !== 1 && this.setState({ showTrialComplete: true });
      }
    } else {
      if (
        dataRef?.current?.trialRounds &&
        trial === dataRef?.current?.trialRounds + 1
      ) {
        this.setState({ showThankYou: true });
      } else {
        this.setState({ showTrialComplete: true });
      }
    }
  }

  onSubmit = async (formData: Record<string, any>) => {
    const { submitData, dataRef } = this.props;
    dataRef.current && (await submitData(formData));
    this.setState({ showResults: true });
  };

  startGame = () => {
    this.setState({ isRunning: true });
  };

  startPractice = () => {
    this.startGame();
  };

  startActualGame = () => {
    this.startGame();
  };

  onCountdownComplete = () => {
    if (this.isPracticeRef.current) {
      this.startPractice();
    } else {
      this.startActualGame();
    }
  };

  render() {
    const {
      showInstructions,
      showThankYou,
      showResults,
      showPracticeComplete,
      showCountdown,
      showTrialComplete,
      isRunning,
      trial,
    } = this.state;
    const { instructions, formFields, dataRef, calculateScores } = this.props;

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
          {this.isPracticeRef.current && dataRef?.current?.trialRounds
            ? `Practice Trial: ${trial}/${dataRef.current.practiceRounds}`
            : dataRef?.current?.trialRounds &&
              `Trial: ${trial}/${dataRef.current.trialRounds}`}
        </div>
        <InstructionDialog
          show={showInstructions}
          onClose={() => this.setState({ showInstructions: false })}
          steps={instructions.steps}
          onStartPractice={() => this.setState({ showCountdown: true })}
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
          scores={dataRef?.current?.scores || []}
          practiceRounds={dataRef?.current?.practiceRounds || 0}
          params={dataRef?.current?.params as TParam}
          calculateScore={calculateScores}
        />
      </div>
    );
  }
}

export default Game;
