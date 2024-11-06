"use client";

import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface InstructionStepInterface {
  tsx: JSX.Element;
}

interface InstructionDialogProps {
  show: boolean;
  onClose: () => void;
  steps: InstructionStepInterface[];
}

export const InstructionDialog = ({
  show,
  onClose,
  steps,
}: InstructionDialogProps) => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  const isLastStep = stepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  useEffect(() => {
    setStepIndex(0);
  }, [show]);

  return (
    <Dialog open={show}>
      <DialogContent className="border-none bg-game-background shadow-none">
        <DialogHeader className="relative">
          <DialogDescription className="text-white">
            {steps[stepIndex].tsx}
          </DialogDescription>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center">
            {stepIndex > 0 && (
              <Button
                onClick={handleBack}
                className="group absolute right-[110%] text-green-500 bg-transparent border-none shadow-none"
              >
                <ArrowLeftIcon className="w-7 h-7" />
              </Button>
            )}
            <Button
              onClick={handleNext}
              style={{ outline: "none", boxShadow: "none" }}
              className={`absolute left-[110%] text-green-500 bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-0 ${
                isLastStep ? "bg-green-500 text-black hover:bg-green-600" : ""
              }`}
            >
              <span>
                {isLastStep ? (
                  <span className="w-full h-full text-bg-green-500">Begin</span>
                ) : (
                  <ArrowRightIcon className="w-7 h-7" />
                )}
              </span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
