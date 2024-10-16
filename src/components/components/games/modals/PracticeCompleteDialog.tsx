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

interface PracticeCompleteDialogProps {
  show: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export const PracticeCompleteDialog: React.FC<PracticeCompleteDialogProps> = ({
  show,
  onClose,
  onStartGame,
}) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
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
              onClose();
              onStartGame();
            }}
            className="text-black bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
          >
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
