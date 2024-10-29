import React from "react";
import StroboscopicMOTGame from "@/components/components/MOT/MOTStroboscopic";

const page = () => {
  return (
    <main>
      <StroboscopicMOTGame strobeA={1000} strobeB={100} isRandom={true} />
    </main>
  );
};

export default page;
