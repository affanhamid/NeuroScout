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
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

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
  const [stepIndex, setStepIndex] = React.useState<number>(0);

  const isLastStep = stepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      onStartPractice();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      onClose();
      onStartPractice();
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
              className={`text-black ${"bg-green-500"} px-6 py-3 rounded-md hover:bg-green-600 flex gap-3`}
            >
              <span>{isLastStep ? "Start Practice" : "Next"}</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
