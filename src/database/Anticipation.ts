"use server";
import { sql } from "@vercel/postgres";

export interface Data {
  timeOfData: number;
  params: {
    vts: number;
  };
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
  trialRounds: number;
}

export async function insertAnticipationData(data: Data): Promise<void> {
  try {
    // @ts-ignore: Ignore type error for array to primitive
    const insertQuery = sql`
      INSERT INTO ANTICIPATION_DATA (
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
        ${data.params.vts},
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
