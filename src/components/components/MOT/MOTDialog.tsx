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
    if (step < 7) {
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
          <DialogTitle className="text-4xl">
            {step === 1 && (
              <>
                <small>Welcome to</small> <br />
                <span>The Visual Tracking Game</span>
              </>
            )}
            {step === 2 && "Focus on the Highlighted Targets"}
            {step === 3 && "Track the Target Objects"}
            {step === 4 && "Avoid Distractions"}
            {step === 5 && "Select the Targets"}
            {step === 6 && "Scoring"}
            {step === 7 && "Difficulty Levels"}
          </DialogTitle>
          <DialogDescription className="text-white mt-5">
            {step === 1 && (
              <span className="">Follow these simple steps to get started</span>
            )}
            {step === 2 && (
              <span>
                When the game begins, a set of yellow objects will appear on the
                screen. Some of these objects will turn blue briefly to indicate
                your targets. Pay close attention to these targets as they will
                blend in with other objects once the tracking begins.
              </span>
            )}
            {step === 3 && (
              <span>
                After the blue targets revert to their normal appearance, all
                objects will begin to move around the screen. Your task is to
                keep track of the original target objects as they move.
              </span>
            )}
            {step === 4 && (
              <span>
                Other objects will be moving in random directions to distract
                you. Stay focused on your target objects and try not to lose
                track of them.
              </span>
            )}
            {step === 5 && (
              <span>
                Once the objects stop moving, click on the objects you believe
                were the original targets. Make sure you select all four of the
                targets to submit your answer.
              </span>
            )}
            {step === 6 && (
              <span>
                You’ll receive points based on how accurately you identify the
                targets. The faster and more accurate you are, the higher your
                score!
              </span>
            )}
            {step === 7 && (
              <span>
                As you progress, the objects will start to move faster or slower
                depending on your accuracy.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-between gap-5">
            <Button
              onClick={handleBack}
              className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
            >
              {step > 1 ? "Back" : "Skip Instructions"}
            </Button>
            {/* <Link href="/" className={`${step > 1 ? "hidden" : ""}`}>
              <Button className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600">
                Home Page
              </Button>
            </Link> */}
            <Button
              onClick={handleNext}
              className={`text-black ${
                session?.user ? "bg-green-500" : "bg-white"
              } px-6 py-3 rounded-md hover:bg-green-600 flex gap-3`}
            >
              {step === 7 && !session?.user && <FcGoogle className="w-6 h-6" />}
              <span>
                {step < 7
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
  highestLevel: string;
}

export const ThankYouDialog: React.FC<ThankYouDialogProps> = ({
  showThankYou,
  setShowThankYou,
  dataRef,
  submit,
}) => {
  const { data: session } = useSession();
  const [highestLevel, setHighestLevel] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [consent, setConsent] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Errors>({
    age: "",
    highestLevel: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageValue = parseInt(age, 10);
    let valid = true;
    const newErrors: Errors = { age: "", highestLevel: "" };

    if (ageValue < 5 || ageValue > 100) {
      newErrors.age = "Please enter a valid age between 5 and 100.";
      valid = false;
    }

    if (!highestLevel) {
      newErrors.highestLevel =
        "Please select the highest level of football you've achieved.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    dataRef.current.age = ageValue;
    dataRef.current.highestLevel = highestLevel;
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
              htmlFor="highestLevel"
              className="block text-sm font-medium text-white"
            >
              What's the highest level of football you've achieved?
            </label>
            <select
              id="highestLevel"
              value={highestLevel}
              onChange={(e) => setHighestLevel(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm appearance-none"
              required
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="Never Played">Never Played</option>
              <option value="Recreational">Recreational</option>
              <option value="School Team">School Team</option>
              <option value="Sunday League">Sunday League</option>
              <option value="Grassroot Academy">Grassroot Academy</option>
              <option value="University Team">University Team</option>
              <option value="Regional or District Team">Regional Team</option>
              <option value="Professional Academy">Professional Academy</option>
              <option value="Semi-Professional">Semi-Professional</option>
              <option value="Professional">Professional</option>
              <option value="International">International</option>
            </select>
            {errors.highestLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.highestLevel}</p>
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

function calculatePerfectScore(length: number): number {
  // Create an array of all 4's of length x
  const scores = Array(length - 1).fill(4);

  // Create an array for vts, starting from vts and increasing by 1 for each element
  const vtsArray = Array.from({ length: length - 1 }, (_, index) => 3 + index);

  // Calculate the dot product of the two arrays
  const result = scores.reduce(
    (acc, score, index) => acc + score * vtsArray[index],
    0
  );

  return result;
}

function calculateScore(scores: number[]) {
  let vts = 3;

  const result = scores.reduce((acc, score) => {
    const to_return = acc + score * vts;

    console.log(vts);

    if (score === 4) {
      vts += 1;
    } else {
      if (vts > 2) {
        vts -= 1;
      }
    }
    return to_return;
  }, 0);

  return result;
}

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
  showResults,
  setShowResults,
  scores,
  practiceRounds,
  vts,
}) => {
  const totalScore = scores
    .slice(practiceRounds)
    .reduce((acc, score) => acc + score, 0);
  const perfectScore =
    scores.length > practiceRounds
      ? calculatePerfectScore(scores.length - practiceRounds)
      : 1;
  const result =
    (calculateScore(scores.slice(practiceRounds, scores.length - 1)) /
      perfectScore) *
    100;

  return (
    <Dialog open={showResults} onOpenChange={setShowResults}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Results</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-white text-center text-xl mx-32">
          <div className="flex flex-col gap-5">
            <b>Final Score:</b>

            <span className="text-green-600 text-3xl font-bold">
              {Math.round(result)} / 100
            </span>
          </div>
        </div>
        <DialogFooter className="flex w-full justify-between">
          <Link
            href="/"
            className="text-black bg-red-500 px-6 py-3 rounded-md hover:bg-red-600 mx-auto text-lg font-bold"
            onClick={() => {
              setShowResults(false);
            }}
          >
            Close
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
