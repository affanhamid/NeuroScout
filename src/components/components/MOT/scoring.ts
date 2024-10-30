"use client";
export const MOTCalculateScore = (
  scores: number[],
  params: { vts: number },
  practiceRounds: number
) => {
  let vts = params.vts;
  let perfectVts = vts;
  let currentScore = 0;
  let perfectScore = 0;

  scores.slice(practiceRounds).forEach((score) => {
    currentScore += score * vts;
    perfectScore += 4 * perfectVts;

    if (score === 4) {
      vts += 1;
    } else {
      if (vts > 2) {
        vts -= 1;
      }
    }

    perfectVts += 1;
  });

  return { currentScore, perfectScore };
};
