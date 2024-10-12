export const calculateScore = (
  selected: number[],
  actual: number[]
): number => {
  let score = 0;
  console.log(selected, actual);
  selected.forEach((selectedBall) => {
    if (actual.includes(selectedBall)) {
      score++;
    }
  });
  return score;
};
