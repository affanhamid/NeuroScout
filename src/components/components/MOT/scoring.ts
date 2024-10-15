export const calculateScore = (
  selected: number[],
  actual: number[]
): { score: number; wrongBalls: number[]; correctBalls: number[] } => {
  let score = 0;
  const wrongBalls: number[] = [];
  const correctBalls: number[] = [];
  selected.forEach((selectedBall) => {
    if (actual.includes(selectedBall)) {
      score++;
      correctBalls.push(selectedBall);
    } else {
      wrongBalls.push(selectedBall);
    }
  });
  return { score: score, wrongBalls: wrongBalls, correctBalls: correctBalls };
};
