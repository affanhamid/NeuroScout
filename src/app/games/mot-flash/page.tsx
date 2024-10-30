import React from "react";
import MOTFlashGame from "@/components/components/MOT/MOTFlash";

const page = () => {
  return (
    <main>
      <MOTFlashGame strobeA={1000} strobeB={100} isRandom={true} />
    </main>
  );
};

export default page;
