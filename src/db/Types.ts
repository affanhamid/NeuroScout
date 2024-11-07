export interface TNT_Data {
  timeOfData: Date;
  params: {
    vts: number;
  };
  scores: number[];
  age: number;
  highestLevel: string;
  timeToClicks: number[];
  screenWidth: number;
  screenHeight: number;
  ballSize: number;
  duration: number;
  numPracticeRounds: number;
  trialRounds: number;
}

export interface TNT_Strobe_Data {
  timeOfData: Date;
  params: {
    vts: number;
  };
  scores: number[];
  age: number;
  highestLevel: string;
  timeToClicks: number[];
  screenWidth: number;
  screenHeight: number;
  ballSize: number;
  duration: number;
  numPracticeRounds: number;
  trialRounds: number;
  strobeA: number;
  strobeB: number;
}

export interface TNT_Flash_Data {
  timeOfData: Date;
  params: {
    vts: number;
  };
  scores: number[];
  age: number;
  highestLevel: string;
  timeToClicks: number[];
  screenWidth: number;
  screenHeight: number;
  ballSize: number;
  duration: number;
  numPracticeRounds: number;
  trialRounds: number;
  randomnessMean: number;
  randomnessStd: number;
}

export interface TNT_Params {
  numberOfBalls: number;
  targetBalls: number;
  duration: number;
  startingVTS: number;
  practiceTrials: number;
  trials: number;
}
