"use client";

import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <Carousel onClose={onClose}>
              <CarouselContent>
                {steps.map((step, index) => (
                  <CarouselItem key={index}>{step.tsx}</CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-green-500 text-3xl text-white border-none hover:bg-green-600" />
              <CarouselNext className="bg-green-500 text-3xl text-white border-none hover:bg-green-600" />
            </Carousel>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
