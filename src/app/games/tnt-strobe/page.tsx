import React from "react";
import TNTStroboscopicGame from "@/components/components/TNT/TNTStroboscopic";
import {
  formFields,
  tnt_strobe_instructions_tsx,
} from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";

const page = () => {
  return (
    <main>
      <TNTStroboscopicGame
        instructions={tnt_strobe_instructions_tsx}
        formFields={formFields}
        calculateScores={TNTCalculateScore}
      />
    </main>
  );
};

export default page;
