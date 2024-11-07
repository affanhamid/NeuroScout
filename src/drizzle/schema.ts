import {
  pgTable,
  timestamp,
  integer,
  text,
  real,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

// Data

export const TNT_DATA = pgTable("TNT_DATA", {
  id: serial("id").primaryKey(),
  timeOfData: timestamp("time_of_data").notNull(),
  vts: integer("vts").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highestLevel: text("highest_level").notNull(),
  timeToClicks: real("time_to_clicks").array().notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  numPracticeRounds: integer("num_practice_rounds").notNull(),
});

export const TNT_STROBE_DATA = pgTable("TNT_STROBE_DATA", {
  id: serial("id").primaryKey(),
  timeOfData: timestamp("time_of_data").notNull(),
  vts: integer("vts").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highestLevel: text("highest_level").notNull(),
  timeToClicks: real("time_to_clicks").array().notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  numPracticeRounds: integer("num_practice_rounds").notNull(),
  strobeA: real("strobe_a").notNull(),
  strobeB: real("strobe_b").notNull(),
});

export const TNT_FLASH_DATA = pgTable("TNT_FLASH_DATA", {
  id: serial("id").primaryKey(),
  timeOfData: timestamp("time_of_data").notNull(),
  vts: integer("vts").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highestLevel: text("highest_level").notNull(),
  timeToClicks: real("time_to_clicks").array().notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  numPracticeRounds: integer("num_practice_rounds").notNull(),
});

// Params

export const TNT_PARAMS = pgTable("TNT_PARAMS", {
  id: serial("id").primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVTS: integer("starting_vts").notNull(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  inUse: boolean("in_use").default(false),
});

export const TNT_STROBE_PARAMS = pgTable("TNT_STROBE_PARAMS", {
  id: serial("id").primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  strobeA: real("strobe_a").notNull(),
  strobeB: real("strobe_b").notNull(),
  inUse: boolean("in_use").default(false),
});

export const TNT_FLASH_PARAMS = pgTable("TNT_FLASH_PARAMS", {
  id: serial("id").primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  inUse: boolean("in_use").default(false),
  randomnessMean: real("randomness_mean").notNull(),
  randomnessStd: real("randomness_std").notNull(),
});
