"use client";
import { useSession, signIn } from "next-auth/react";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import HomeButton from "./HomeButton";

export interface InstructionStepInterface {
  title: React.ReactNode;
  description: React.ReactNode;
}

interface InstructionDialogProps {
  show: boolean;
  onClose: () => void;
  steps: InstructionStepInterface[];
  onStartPractice: () => void;
}

export const InstructionDialog: React.FC<InstructionDialogProps> = ({
  show,
  onClose,
  steps,
  onStartPractice,
}) => {
  const { data: session } = useSession();
  const [stepIndex, setStepIndex] = React.useState<number>(0);

  const isLastStep = stepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      session?.user ? onStartPractice() : signIn("auth0");
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      onClose();
      session?.user ? onStartPractice() : signIn("auth0");
    }
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl">
            {steps[stepIndex].title}
          </DialogTitle>
          <DialogDescription className="text-white mt-5">
            {steps[stepIndex].description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-between gap-5">
            <Button
              onClick={handleBack}
              className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
            >
              {stepIndex > 0 ? "Back" : "Skip Instructions"}
            </Button>
            <Button
              onClick={handleNext}
              className={`text-black ${
                session?.user ? "bg-green-500" : "bg-white"
              } px-6 py-3 rounded-md hover:bg-green-600 flex gap-3`}
            >
              {isLastStep && !session?.user && <FcGoogle className="w-6 h-6" />}
              <span>
                {isLastStep
                  ? session?.user
                    ? "Start Practice"
                    : "Login"
                  : "Next"}
              </span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
