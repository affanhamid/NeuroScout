import "@/drizzle/envConfig";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql, createPool } from "@vercel/postgres";
import * as schema from "../drizzle/schema";
import { MOT_Data, MOT_Flash_Data, MOT_Strobe_Data } from "@/db/Types";

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

const client = createPool({ connectionString });

export const db = drizzle(client, {
  schema,
});

export const addMOTData = async (data: MOT_Data) => {
  const timeOfData =
    typeof data.timeOfData === "string"
      ? new Date(data.timeOfData)
      : data.timeOfData;

  const result = await db.insert(schema.MOT_DATA).values({
    time_of_data: timeOfData,
    vts: data.params.vts,
    scores: data.scores,
    age: data.age,
    highest_level: data.highestLevel,
    time_to_clicks: data.timeToClicks,
    screen_width: data.screenWidth,
    screen_height: data.screenHeight,
    ball_size: data.ballSize,
    duration: data.duration,
    num_practice_rounds: data.numPracticeRounds,
  });
  console.log(result);
};

export async function addMOTStrobeData(data: MOT_Strobe_Data) {
  const timeOfData =
    typeof data.timeOfData === "string"
      ? new Date(data.timeOfData)
      : data.timeOfData;

  await db.insert(schema.MOT_STROBE_DATA).values({
    time_of_data: timeOfData,
    vts: data.params.vts,
    scores: data.scores,
    age: data.age,
    highest_level: data.highestLevel,
    time_to_clicks: data.timeToClicks,
    screen_width: data.screenWidth,
    screen_height: data.screenHeight,
    ball_size: data.ballSize,
    duration: data.duration,
    num_practice_rounds: data.numPracticeRounds,
    strobe_a: data.strobeA,
    strobe_b: data.strobeB,
  });
}

export async function addMOTFlashData(data: MOT_Flash_Data) {
  const timeOfData =
    typeof data.timeOfData === "string"
      ? new Date(data.timeOfData)
      : data.timeOfData;

  await db.insert(schema.MOT_FLASH_DATA).values({
    time_of_data: timeOfData,
    vts: data.params.vts,
    scores: data.scores,
    age: data.age,
    highest_level: data.highestLevel,
    time_to_clicks: data.timeToClicks,
    screen_width: data.screenWidth,
    screen_height: data.screenHeight,
    ball_size: data.ballSize,
    duration: data.duration,
    num_practice_rounds: data.numPracticeRounds,
    visible_time: data.visibleTime,
    invisible_time: data.invisibleTime,
  });
}

export async function getMOTParams() {
  const result = await db.select().from(schema.MOT_PARAMS);
  return result;
}

export async function getMOTStrobeParams() {
  const result = await db.select().from(schema.MOT_STROBE_PARAMS);
  return result;
}

export async function getMOTFlashParams() {
  const result = await db.select().from(schema.MOT_FLASH_PARAMS);
  return result;
}
