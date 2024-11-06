import React from "react";
import TNTGame from "@/components/components/TNT/TNT";
import {
  formFields,
  tnt_instructions_tsx,
} from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";

const page = () => {
  return (
    <main>
      <TNTGame
        instructions={tnt_instructions_tsx}
        formFields={formFields}
        calculateScores={TNTCalculateScore}
      />
    </main>
  );
};

export default page;
