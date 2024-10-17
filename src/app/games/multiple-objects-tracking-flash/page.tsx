import React from "react";
import StroboscopicMOTGame from "@/components/components/MOT/MOTStroboscopic";

const page = () => {
  return (
    <main>
      {/* <MOTStroboscopic /> */}
      {/* <MOTGame /> */}
      <StroboscopicMOTGame strobeA={1000} strobeB={100} />
    </main>
  );
};

export default page;
