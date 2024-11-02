import React from "react";
import StroboscopicMOTGame from "@/components/components/MOT/MOTStroboscopic";
import { formFields, instructions } from "@/components/components/MOT/metaData";
import { MOTCalculateScore } from "@/components/components/MOT/scoring";

const page = () => {
  return (
    <main>
      <StroboscopicMOTGame
        instructions={instructions}
        formFields={formFields}
        calculateScores={MOTCalculateScore}
      />
    </main>
  );
};

export default page;
