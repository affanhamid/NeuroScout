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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export const MOTDialog = ({ startGame }: { startGame: () => void }) => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(true); // Dialog open state
  const [step, setStep] = React.useState(1); // Step state to track which modal to show

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1); // Move to the next step
    } else {
      if (session && session.user) {
        setOpen(false);
        startGame();
      } else {
        setOpen(false);
        signIn("auth0");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // Move to the previous step
    } else {
      setOpen(false); // Close the dialog after the first step
      startGame();
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
                Welcome! In this game, you will be challenged to track several
                moving objects and identify which ones were highlighted at the
                start. You will play multiple rounds, and your score will be
                based on how many correct objects you can identify.
              </>
            )}
            {step === 2 && (
              <>
                <ul className="list-disc list-inside text-left">
                  <li>
                    1. At the beginning of each round, 4 balls will be
                    highlighted in green for 1 second.
                  </li>
                  <li>
                    2. After the highlight, the balls will start moving around
                    the screen.
                  </li>
                  <li>
                    3. Once the movement stops, you have to click on the 4 balls
                    that were highlighted.
                  </li>
                  <li>
                    4. If you get all 4 balls correct, the speed will increase
                    for the next trial, else it will decrease.
                  </li>
                </ul>
              </>
            )}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                <span>
                  You are now ready to start the game! Stay focused and see how
                  many highlighted balls you can remember. Good luck!{" "}
                </span>
                <b className="text-lg text-red-500">
                  {session && session.user && session.user.email
                    ? ""
                    : "Please log in with your Google account to start the game"}
                </b>
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
              {step > 1 ? "Back" : "Skip"}
            </Button>
            <Link href="/" className={`${step > 1 ? "hidden" : ""}`}>
              <Button className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600">
                Back to Home Page
              </Button>
            </Link>

            <Button
              onClick={handleNext}
              className={`text-black ${
                session && session?.user ? "bg-green-500" : "bg-white"
              } px-6 py-3 rounded-md hover:bg-green-600 flex gap-3`}
            >
              {step === 3 && !(session && session?.user) && (
                <FcGoogle className="w-6 h-6" />
              )}
              <span>
                {step < 3
                  ? "Next"
                  : session && session.user
                  ? "Start Playing"
                  : "Log In With Google"}
              </span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ThankYouDialog = ({
  startGame,
  showThankYou,
  setShowThankYou,
}: {
  startGame: () => void;
  showThankYou: boolean;
  setShowThankYou: React.Dispatch<boolean>;
}) => {
  return (
    <Dialog open={showThankYou}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank You for Playing !</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Link href="/">
              <Button className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600">
                Back to Home Page
              </Button>
            </Link>

            <Button
              className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
              onClick={() => {
                setShowThankYou(false);
                startGame();
              }}
            >
              {"Try Again"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
