import React from "react";
import TNTFlashGame from "@/components/components/TNT/TNTFlash";
import {
  formFields,
  tnt_flash_instructions_tsx,
} from "@/components/components/TNT/metaData";
import { TNTCalculateScore } from "@/components/components/TNT/scoring";

const page = () => {
  return (
    <main>
      <TNTFlashGame
        instructions={tnt_flash_instructions_tsx}
        formFields={formFields}
        calculateScores={TNTCalculateScore}
      />
    </main>
  );
};

export default page;
