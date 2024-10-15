"use server";
import { sql } from "@vercel/postgres";

export interface Data {
  timeOfData: number;
  vts: number;
  scores: number[];
  age: number;
  highestLevel: string;
  timeToClicks: number[];
  email: string;
  screenWidth: number;
  screenHeight: number;
  ballSize: number;
  duration: number;
  practiceRounds: number;
}

export async function insertMOTData(data: Data): Promise<void> {
  console.log(process.env.POSTGRES_URL);
  try {
    const insertQuery = sql`
  INSERT INTO MOT_DATA (
    timeOfData, 
    vts, 
    scores, 
    age, 
    highestLevel, 
    timeToClicks, 
    email, 
    screenWidth, 
    screenHeight, 
    ballSize, 
    duration,
    practiceRounds
  ) VALUES (
    ${data.timeOfData}, 
    ${data.vts}, 
    ${data.scores},
    ${data.age}, 
    ${data.highestLevel}, 
    ${data.timeToClicks}, 
    ${data.email}, 
    ${data.screenWidth}, 
    ${data.screenHeight}, 
    ${data.ballSize}, 
    ${data.duration},
    ${data.practiceRounds}
  );
`;
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}
