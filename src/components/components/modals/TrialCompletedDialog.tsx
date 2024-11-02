// PracticeCompleteDialog.tsx

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

interface TrialCopmletedDialogProps {
  show: boolean;
  onClose: () => void;
  onOpenInstructions: () => void;
}

export const TrialCompletedDialog: React.FC<TrialCopmletedDialogProps> = ({
  show,
  onClose,
  onOpenInstructions,
}) => {
  return (
    <Dialog open={show}>
      <DialogContent className="bg-game-background border-none">
        <DialogHeader className="bg-game-background border-none">
          <DialogTitle className="text-white">Start Next Round</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex justify-between gap-10">
          <Button
            onClick={onOpenInstructions}
            className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
          >
            Show Instructions Again
          </Button>
          <Button
            onClick={onClose}
            className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
          >
            Start Round
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
