import React from "react";
import MOTFlashGame from "@/components/components/MOT/MOTFlash";
import { formFields, instructions } from "@/components/components/MOT/metaData";
import { MOTCalculateScore } from "@/components/components/MOT/scoring";

const page = () => {
  return (
    <main>
      <MOTFlashGame
        instructions={instructions}
        formFields={formFields}
        calculateScores={MOTCalculateScore}
      />
    </main>
  );
};

export default page;
