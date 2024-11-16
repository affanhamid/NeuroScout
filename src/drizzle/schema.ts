import {
  pgTable,
  timestamp,
  integer,
  text,
  real,
  boolean,
  serial,
  jsonb,
} from "drizzle-orm/pg-core";

// Data

export const TNT_DATA = pgTable("TNT_DATA", {
  id: serial("id").primaryKey(),
  timeOfData: timestamp("time_of_data").notNull(),
  params: jsonb("params").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highestLevel: text("highest_level").notNull(),
  timeToClicks: real("time_to_clicks").array().notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  numPracticeRounds: integer("num_practice_rounds").notNull(),
  numTrialRounds: integer("num_trial_rounds").notNull(),
});

export const TNT_STROBE_DATA = pgTable("TNT_STROBE_DATA", {
  id: serial("id").primaryKey(),
  timeOfData: timestamp("time_of_data").notNull(),
  params: jsonb("params").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highestLevel: text("highest_level").notNull(),
  timeToClicks: real("time_to_clicks").array().notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  numPracticeRounds: integer("num_practice_rounds").notNull(),
  numTrialRounds: integer("num_trial_rounds").notNull(),
  strobeA: real("strobe_a").notNull(),
  strobeB: real("strobe_b").notNull(),
});

export const TNT_GLOW_DATA = pgTable("TNT_GLOW_DATA", {
  id: serial("id").primaryKey(),
  timeOfData: timestamp("time_of_data").notNull(),
  params: jsonb("params").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highestLevel: text("highest_level").notNull(),
  timeToClicks: real("time_to_clicks").array().notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  numPracticeRounds: integer("num_practice_rounds").notNull(),
  numTrialRounds: integer("num_trial_rounds").notNull(),
  randomnessMean: real("randomness_mean").notNull(),
  randomnessStd: real("randomnessStd").notNull(),
});

// Params

export const TNT_PARAMS = pgTable("TNT_PARAMS", {
  id: serial("id").primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_in_vts").notNull(),
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
  changeInVts: integer("change_int_vts").notNull(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  strobeA: real("strobe_a").notNull(),
  strobeB: real("strobe_b").notNull(),
  inUse: boolean("in_use").default(false),
});

export const TNT_GLOW_PARAMS = pgTable("TNT_GLOW_PARAMS", {
  id: serial("id").primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_in_vts").notNull(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  inUse: boolean("in_use").default(false),
  randomnessMean: real("randomness_mean").notNull(),
  randomnessStd: real("randomness_std").notNull(),
});

// Instructions

export const TNT_INSTRUCTIONS = pgTable("TNT_INSTRUCTIONS", {
  id: serial("id").primaryKey(),
  step: integer("step").notNull(),
  link: text("link").notNull(),
});

export const TNT_GLOW_INSTRUCTIONS = pgTable("TNT_GLOW_INSTRUCTIONS", {
  id: serial("id").primaryKey(),
  step: integer("step").notNull(),
  link: text("link").notNull(),
});

export const TNT_STROBE_INSTRUCTIONS = pgTable("TNT_STROBE_INSTRUCTIONS", {
  id: serial("id").primaryKey(),
  step: integer("step").notNull(),
  link: text("link").notNull(),
});

export const GAMES = pgTable("GAMES", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  imageLink: text("image_link").notNull(),
});
