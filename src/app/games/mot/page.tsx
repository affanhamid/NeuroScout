import React from "react";
import MOTGame from "@/components/components/MOT/MOTGame";
import { formFields, instructions } from "@/components/components/MOT/metaData";
import { MOTCalculateScore } from "@/components/components/MOT/scoring";

const page = () => {
  return (
    <main>
      <MOTGame
        instructions={instructions}
        formFields={formFields}
        calculateScores={MOTCalculateScore}
      />
    </main>
  );
};

export default page;
