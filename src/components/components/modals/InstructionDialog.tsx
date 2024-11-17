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
  return (
    <Dialog open={show}>
      <DialogContent className="border-none bg-game-background shadow-none">
        <DialogHeader className="relative">
          <DialogTitle></DialogTitle>
          <Carousel onClose={onClose}>
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index}>{step.tsx}</CarouselItem>
              ))}
            </CarouselContent>
            <DialogDescription></DialogDescription>
            <CarouselPrevious className="bg-green-500 text-3xl text-white border-none hover:bg-green-600" />
            <CarouselNext className="bg-green-500 text-3xl text-white border-none hover:bg-green-600" />
          </Carousel>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
