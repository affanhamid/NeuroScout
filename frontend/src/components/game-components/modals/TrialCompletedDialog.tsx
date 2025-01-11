const TrialCompleteDialog = ({
  onStart,
  onShowInstructions,
  nextTrialNum,
  isPractice,
  totalTrials
}: {
  onStart: () => void;
  onShowInstructions: () => void;
  nextTrialNum: number;
  isPractice: boolean;
  totalTrials: number;
}) => {
  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="text-white border-white border rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center py-32">
        <h1 className="text-3xl lg:text-4xl text-white">
          {isPractice && "Practice"} Trial {nextTrialNum - 1} of {totalTrials}{" "}
          completed
        </h1>
        <div className="text-center mb-8">
          <h2 className="text-gray-300">
            Next up: {isPractice && "Practice"} Trial {nextTrialNum}
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <button onClick={onStart}>Start Next Trial</button>
          <button onClick={onShowInstructions} className="bg-gray-700">
            Show Instructions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialCompleteDialog;
