import React from "react";
import TNTFlashGame from "@/components/components/TNT/TNTFlash";
import { formFields } from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";
import Image from "next/image";
import { InstructionStepInterface } from "@/components/components/modals/InstructionDialog";

const page = async () => {
  const response = await fetch(
    "http://localhost:3000/api/data/get-data?dataTable=TNT_FLASH_INSTRUCTIONS",
  );
  const steps: { link: string }[] = await response.json();
  const instructionSteps: InstructionStepInterface[] = steps.map(
    (step, index) => ({
      tsx: (
        <Image key={index} src={step.link} width={1000} height={1000} alt="" />
      ),
    }),
  );

  return (
    <main>
      <TNTFlashGame
        instructions={instructionSteps}
        formFields={formFields}
        calculateScores={TNTCalculateScore}
      />
    </main>
  );
};

export default page;