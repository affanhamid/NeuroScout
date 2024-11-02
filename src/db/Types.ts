export interface MOT_Data {
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

export interface MOT_Strobe_Data {
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

export interface MOT_Flash_Data {
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
