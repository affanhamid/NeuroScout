const TrialCompleteDialog = ({
  onStart,
  onShowInstructions
}: {
  onStart: () => void;
  onShowInstructions: () => void;
}) => {
  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="text-white border-white border-2 rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center py-32">
        <h2 className="text-5xl pb-10">Trial Completed</h2>

        <div className="flex flex-col gap-5">
          <button onClick={onStart} className="rounded-lg">
            Start Next Trial
          </button>
          <button
            onClick={onShowInstructions}
            className="bg-gray-700 rounded-lg"
          >
            Show Instructions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialCompleteDialog;
