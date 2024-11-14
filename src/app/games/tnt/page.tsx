import React from "react";
import TNTGame from "@/components/components/TNT/TNT";
import { formFields } from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";
import { InstructionStepInterface } from "@/components/components/modals/InstructionDialog";
import Image from "next/image";

const page = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/data/get-data?dataTable=TNT_INSTRUCTIONS`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
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
    <TNTGame
      instructions={instructionSteps}
      calculateScores={TNTCalculateScore}
      formFields={formFields}
    />
  );
};

export default page;
