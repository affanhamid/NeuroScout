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
  time_of_data: timestamp("time_of_data").notNull(),
  vts: integer("vts").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highest_level: text("highest_level").notNull(),
  time_to_clicks: real("time_to_clicks").array().notNull(),
  screen_width: integer("screen_width").notNull(),
  screen_height: integer("screen_height").notNull(),
  ball_size: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  num_practice_rounds: integer("num_practice_rounds").notNull(),
});

export const TNT_STROBE_DATA = pgTable("TNT_STROBE_DATA", {
  id: serial("id").primaryKey(),
  time_of_data: timestamp("time_of_data").notNull(),
  vts: integer("vts").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highest_level: text("highest_level").notNull(),
  time_to_clicks: real("time_to_clicks").array().notNull(),
  screen_width: integer("screen_width").notNull(),
  screen_height: integer("screen_height").notNull(),
  ball_size: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  num_practice_rounds: integer("num_practice_rounds").notNull(),
  strobe_a: real("strobe_a").notNull(),
  strobe_b: real("strobe_b").notNull(),
});

export const TNT_FLASH_DATA = pgTable("TNT_FLASH_DATA", {
  id: serial("id").primaryKey(),
  time_of_data: timestamp("time_of_data").notNull(),
  vts: integer("vts").notNull(),
  scores: real("scores").array().notNull(),
  age: integer("age").notNull(),
  highest_level: text("highest_level").notNull(),
  time_to_clicks: real("time_to_clicks").array().notNull(),
  screen_width: integer("screen_width").notNull(),
  screen_height: integer("screen_height").notNull(),
  ball_size: real("ball_size").notNull(),
  duration: real("duration").notNull(),
  num_practice_rounds: integer("num_practice_rounds").notNull(),
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
});
