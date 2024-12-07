import { useState } from "react";
import Image from "next/image";

const Carousel = () => {};

const InstructionDialog = ({
  instructions
}: {
  instructions: { step: number; image: string }[];
}) => {
  const [step, setStep] = useState(0);
  console.log(instructions);
  return (
    <div className="bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      {instructions.length !== 0 && (
        <div>
          <Image
            src={instructions[step].image}
            alt={`${step}`}
            width={700}
            height={400}
          />
        </div>
      )}
    </div>
  );
};

export default InstructionDialog;
