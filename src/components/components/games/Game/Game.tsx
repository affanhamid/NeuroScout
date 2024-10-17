"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  InstructionDialog,
  PracticeCompleteDialog,
  ThankYouDialog,
  ResultsDialog,
} from "../modals";
import Countdown from "./Countdown";
import type {
  InstructionStepInterface,
  FormFieldInterface,
} from "../modals/Types";

interface GameInterface<TData, TParam> {
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
    setTrial: React.Dispatch<React.SetStateAction<number>>,
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
    trial: number,
    isPractice: boolean
  ) => void;
  dataRef: React.MutableRefObject<TData>;
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

const Game = <TData extends BaseTData<TParam>, TParam extends {}>({
  submitData,
  instructions,
  formFields,
  calculateScores,
  render,
  dataRef,
}: GameInterface<TData, TParam>) => {
  // Animations
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Levels
  const [trial, setTrial] = useState(1);
  const isPracticeRef = useRef<boolean>(true);

  // User Data
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Modals
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showPracticeComplete, setShowPracticeComplete] =
    useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);

  const onSubmit = async (formData: Record<string, any>) => {
    dataRef.current && submitData(formData);
    setShowResults(true);
  };

  const startGame = () => {
    setIsRunning(true);
  };

  const startPractice = () => {
    startGame();
  };

  const startActualGame = () => {
    startGame();
  };

  const onCountdownComplete = () => {
    if (isPracticeRef.current) {
      startPractice();
    } else {
      startActualGame();
    }
  };

  useEffect(() => {
    setShowInstructions(true);
  }, []);

  useEffect(() => {
    if (isRunning) {
      canvasRef.current &&
        render(
          canvasRef.current,
          animationFrameIdRef,
          setTrial,
          setIsRunning,
          trial,
          isPracticeRef.current
        );
    } else {
      if (isPracticeRef.current) {
        if (trial === dataRef.current.practiceRounds + 1) {
          isPracticeRef.current = false;
          setTrial(1);
          setTimeout(() => {
            setShowPracticeComplete(true);
          }, 500);
        } else {
          trial !== 1 && setShowCountdown(true);
        }
      } else {
        if (trial === dataRef.current.trialRounds + 1) {
          setTimeout(() => {
            setShowThankYou(true);
          }, 500);
        } else {
          setShowCountdown(true);
        }
      }
    }
  }, [isRunning]);

  return (
    <div className="bg-game-background h-screen w-screen flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="block" />
      {showCountdown && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
          <Countdown
            onComplete={() => {
              setShowCountdown(false);
              onCountdownComplete();
            }}
          />
        </div>
      )}
      {!isRunning && (
        <div className="absolute top-10 right-10 text-white text-2xl">
          {isPracticeRef.current
            ? `Practice Trial: ${trial}/${dataRef.current.practiceRounds}`
            : `Trial: ${trial}/${dataRef.current.trialRounds}`}
        </div>
      )}
      <InstructionDialog
        show={showInstructions}
        onClose={() => setShowInstructions(false)}
        steps={instructions.steps}
        onStartPractice={() => setShowCountdown(true)}
      />
      <ThankYouDialog
        show={showThankYou}
        onClose={() => setShowThankYou(false)}
        formFields={formFields}
        onSubmit={onSubmit}
      />
      <PracticeCompleteDialog
        show={showPracticeComplete}
        onClose={() => setShowPracticeComplete(false)}
        onStartGame={() => setShowCountdown(true)}
      />
      <ResultsDialog<TParam>
        show={showResults}
        onClose={() => setShowResults(false)}
        scores={dataRef.current.scores}
        practiceRounds={dataRef.current.practiceRounds}
        params={dataRef.current.params}
        calculateScore={calculateScores}
      />
    </div>
  );
};

export default Game;
