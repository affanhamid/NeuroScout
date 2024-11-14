import React from "react";
import TNTStroboscopicGame from "@/components/components/TNT/TNTStroboscopic";
import { formFields } from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";
import { InstructionStepInterface } from "@/components/components/modals/InstructionDialog";
import Image from "next/image";

const page = async () => {
  const response = await fetch(
    "http://localhost:3000/api/data/get-data?dataTable=TNT_STROBE_INSTRUCTIONS",
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
      <TNTStroboscopicGame
        instructions={instructionSteps}
        formFields={formFields}
        calculateScores={TNTCalculateScore}
      />
    </main>
  );
};

export default page;
