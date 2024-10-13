export const calculateScore = (
  selected: number[],
  actual: number[]
): number => {
  let score = 0;
  selected.forEach((selectedBall) => {
    if (actual.includes(selectedBall)) {
      score++;
    }
  });
  return score;
};
