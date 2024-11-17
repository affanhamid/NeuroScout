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

export const data = pgTable("DATA", {
  id: serial("id").primaryKey(),
  paramId: integer("param_id").references(() => param.id),
  timeOfData: timestamp("time_of_data").notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
});

export const result = pgTable("RESULT", {
  id: serial("id").primaryKey(),
  result: jsonb("result").notNull(),
  formData: jsonb("form_data").notNull(),
});

// Params

export const param = pgTable("PARAM", {
  id: serial("id").primaryKey(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  inUse: boolean("in_use").default(false),
});

export const tntParam = pgTable("TNT_PARAM", {
  paramId: integer("param_id").references(() => param.id),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_in_vts").notNull(),
});

export const tntStrobeParam = pgTable("TNT_STROBE_PARAM", {
  paramId: integer("param_id").references(() => param.id),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_int_vts").notNull(),
  strobeA: real("strobe_a").notNull(),
  strobeB: real("strobe_b").notNull(),
});

export const tntGlowParam = pgTable("TNT_GLOW_PARAM", {
  paramId: integer("param_id").references(() => param.id),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_in_vts").notNull(),
  randomnessMean: real("randomness_mean").notNull(),
  randomnessStd: real("randomness_std").notNull(),
});

// Instructions

export const tntInstruction = pgTable("TNT_INSTRUCTION", {
  id: serial("id").primaryKey(),
  step: integer("step").notNull(),
  link: text("link").notNull(),
  gameId: integer("game_id").references(() => game.id),
});

// Games

export const game = pgTable("GAME", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  imageLink: text("image_link").notNull(),
});
