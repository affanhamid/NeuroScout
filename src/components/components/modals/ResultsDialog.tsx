"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface ResultsDialogProps<TParam> {
  show: boolean;
  onClose: () => void;
  scores: number[];
  practiceRounds: number;
  params: TParam;
  calculateScore: (
    scores: number[],
    params: TParam,
    practiceRounds: number
  ) => { currentScore: number; perfectScore: number };
}

export const ResultsDialog = <TParam extends {}>({
  show,
  scores,
  onClose,
  practiceRounds,
  params,
  calculateScore,
}: ResultsDialogProps<TParam>) => {
  const { currentScore, perfectScore } =
    scores && params && practiceRounds
      ? calculateScore(scores, params, practiceRounds)
      : { currentScore: 0, perfectScore: 0 };

  const percentageScore =
    perfectScore > 0 ? (currentScore / perfectScore) * 100 : 0;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Results</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-white text-center text-xl mx-32">
          <div className="flex flex-col gap-5">
            <b>Final Score:</b>
            <span className="text-green-600 text-3xl font-bold">
              {Math.round(percentageScore)} / 100
            </span>
          </div>
        </div>
        <DialogFooter className="flex w-full justify-between">
          <Link
            href="/"
            className="text-black bg-red-500 px-6 py-3 rounded-md hover:bg-red-600 mx-auto text-lg font-bold"
            onClick={onClose}
          >
            Close
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
