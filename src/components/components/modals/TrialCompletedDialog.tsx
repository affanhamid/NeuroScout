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
}

export const TrialCompletedDialog: React.FC<TrialCopmletedDialogProps> = ({
  show,
  onClose,
}) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start next trial</DialogTitle>
          <DialogDescription>
            Click on "Show Instructions Again" to read the instructions again
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-5 justify-between">
          <Button
            onClick={() => {
              onClose();
            }}
            className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
          >
            Show Instructions Again
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
          >
            Start Trial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
