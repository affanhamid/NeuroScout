"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Data } from "@/database/MOT";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { HIGHLIGHT_COLOR } from "./Ball";

interface MOTDialogProps {
  startGame: () => void;
}

export const MOTDialog: React.FC<MOTDialogProps> = ({ startGame }) => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState<boolean>(true);
  const [step, setStep] = React.useState<number>(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOpen(false);
      session?.user ? startGame() : signIn("auth0");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      if (session?.user) {
        setOpen(false);
        startGame();
      } else {
        signIn("auth0");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1 && (
              <>
                <small>Welcome to</small> <br />
                <span>The Multiple Objects Tracking Game</span>
              </>
            )}
            {step === 2 && "How to Play"}
            {step === 3 && "Ready to Start"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && (
              <>
                Welcome! Track moving objects and identify which ones were
                highlighted at the start. Play multiple rounds and score based
                on correct identifications.
              </>
            )}
            {step === 2 && (
              <ul className="list-disc list-inside text-left">
                <li>
                  1. 4 balls will be highlighted in{" "}
                  <span style={{ color: HIGHLIGHT_COLOR }}>green</span> for 1
                  second.
                </li>
                <li>2. The balls will start moving around the screen.</li>
                <li>3. Click the 4 balls that were highlighted.</li>
                <li>
                  4. Correct guesses increase speed; incorrect guesses decrease
                  it.
                </li>
              </ul>
            )}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                <span>You're ready to start! Stay focused and good luck!</span>
                {!session?.user && (
                  <b className="text-lg text-red-500">
                    Please log in with your Google account to start the game
                  </b>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button
              onClick={handleBack}
              className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
            >
              {step > 1 ? "Back" : "Skip To Practice"}
            </Button>
            <Link href="/" className={`${step > 1 ? "hidden" : ""}`}>
              <Button className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600">
                Back to Home Page
              </Button>
            </Link>
            <Button
              onClick={handleNext}
              className={`text-black ${
                session?.user ? "bg-green-500" : "bg-white"
              } px-6 py-3 rounded-md hover:bg-green-600 flex gap-3`}
            >
              {step === 3 && !session?.user && <FcGoogle className="w-6 h-6" />}
              <span>
                {step < 3
                  ? "Next"
                  : session?.user
                  ? "Start Practice"
                  : "Log In With Google"}
              </span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ThankYouDialogProps {
  showThankYou: boolean;
  setShowThankYou: React.Dispatch<React.SetStateAction<boolean>>;
  dataRef: React.MutableRefObject<Data>;
  submit: () => void;
}

interface Errors {
  age: string;
  yearsPlayingFootball: string;
}

export const ThankYouDialog: React.FC<ThankYouDialogProps> = ({
  showThankYou,
  setShowThankYou,
  dataRef,
  submit,
}) => {
  const { data: session } = useSession();
  const [yearsPlayingFootball, setYearsPlayingFootball] =
    React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [consent, setConsent] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Errors>({
    age: "",
    yearsPlayingFootball: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageValue = parseInt(age, 10);
    const yearsPlayingValue = parseInt(yearsPlayingFootball, 10);
    let valid = true;
    const newErrors: Errors = { age: "", yearsPlayingFootball: "" };

    if (ageValue < 5 || ageValue > 100) {
      newErrors.age = "Please enter a valid age between 5 and 100.";
      valid = false;
    }

    if (yearsPlayingValue < 0 || yearsPlayingValue > ageValue) {
      newErrors.yearsPlayingFootball =
        "Please enter a valid number of years playing football, which cannot exceed your age.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    dataRef.current.age = ageValue;
    dataRef.current.yearsPlayingFootball = yearsPlayingValue;
    dataRef.current.email = session?.user?.email as string;
    dataRef.current.screenWidth = window.innerWidth;
    dataRef.current.screenHeight = window.innerHeight;
    submit();
    setShowThankYou(false);
  };

  return (
    <Dialog open={showThankYou}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank You for Playing!</DialogTitle>
          <DialogDescription>
            To view your scores, you need to submit the data for analysis.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="yearsPlayingFootball"
              className="block text-sm font-medium text-white"
            >
              How many years have you been playing football?
            </label>
            <input
              type="number"
              id="yearsPlayingFootball"
              value={yearsPlayingFootball}
              onChange={(e) => setYearsPlayingFootball(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm appearance-none"
              required
            />
            {errors.yearsPlayingFootball && (
              <p className="text-red-500 text-sm mt-1">
                {errors.yearsPlayingFootball}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-white"
            >
              What is your age?
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm appearance-none"
              required
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
              required
            />
            <label htmlFor="consent" className="ml-2 block text-sm text-white">
              Do you consent to giving out your data?
            </label>
          </div>
          <DialogFooter className="flex w-full justify-between">
            <Link href="/">
              <Button className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600">
                Back to Home Page
              </Button>
            </Link>
            <Button
              type="submit"
              className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
            >
              Submit and See Results
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface PracticeCompleteDialogProps {
  showPracticeComplete: boolean;
  setShowPracticeComplete: React.Dispatch<React.SetStateAction<boolean>>;
  startActualGame: () => void;
}

export const PracticeCompleteDialog: React.FC<PracticeCompleteDialogProps> = ({
  showPracticeComplete,
  setShowPracticeComplete,
  startActualGame,
}) => {
  return (
    <Dialog open={showPracticeComplete} onOpenChange={setShowPracticeComplete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Practice Rounds Complete</DialogTitle>
          <DialogDescription>
            You have completed the practice rounds. Now, get ready to start the
            actual game. Stay focused and give it your best shot!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              setShowPracticeComplete(false);
              startActualGame();
            }}
            className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
          >
            Start Actual Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ResultsDialogProps {
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  scores: number[];
  practiceRounds: number;
  vts: number;
}

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
  showResults,
  setShowResults,
  scores,
  practiceRounds,
  vts,
}) => {
  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return (
    <Dialog open={showResults} onOpenChange={setShowResults}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Game Results</DialogTitle>
          <DialogDescription>
            Here’s how you did during the game.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-white">
          <div>
            <b>Total Score:</b> {totalScore}
          </div>
          <div>
            <b>Final Speed (Visual Threshold Speed):</b> {vts}
          </div>
          <div>
            <b>Scores per Round:</b>{" "}
            {scores.slice(practiceRounds, scores.length).join(", ")}
          </div>
        </div>
        <DialogFooter className="flex w-full justify-between">
          <Button
            className="text-black bg-red-500 px-6 py-3 rounded-md hover:bg-red-600"
            onClick={() => setShowResults(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
