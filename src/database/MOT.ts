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
  isStrobe: boolean;
  strobeA: number;
  strobeB: number;
}

export async function insertMOTData(data: Data): Promise<void> {
  try {
    // @ts-ignore: Ignore type error for array to primitive
    const insertQuery = sql`
      INSERT INTO MOT_DATA (
        time_of_data,
        vts,
        scores,
        age,
        highest_level,
        time_to_clicks,
        email,
        screen_width,
        screen_height,
        ball_size,
        duration,
        practice_rounds,
        is_strobe,
        strobe_a,
        strobe_b
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
        ${data.practiceRounds},
        ${data.isStrobe},
        ${data.strobeA},
        ${data.strobeB}
      );
    `;
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}
