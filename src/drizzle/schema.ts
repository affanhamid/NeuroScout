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

// Games

export const game = pgTable("game", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageLink: text("image_link").notNull(),
});

// Params

export const param = pgTable("param", {
  id: serial("id").primaryKey(),
  practiceTrials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  inUse: boolean("in_use").default(false),
  gameId: integer("game_id").references(() => game.id),
});

export const tntParam = pgTable("tnt_param", {
  paramId: integer("param_id")
    .references(() => param.id)
    .primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_in_vts").notNull(),
});

export const tntStrobeParam = pgTable("tnt_strobe_param", {
  paramId: integer("param_id")
    .references(() => param.id)
    .primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_int_vts").notNull(),
  strobeA: real("strobe_a").notNull(),
  strobeB: real("strobe_b").notNull(),
});

export const tntGlowParam = pgTable("tnt_glow_param", {
  paramId: integer("param_id")
    .references(() => param.id)
    .primaryKey(),
  numberOfBalls: integer("number_of_balls").notNull(),
  targetBalls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  startingVts: integer("starting_vts").notNull(),
  changeInVts: integer("change_in_vts").notNull(),
  randomnessMean: real("randomness_mean").notNull(),
  randomnessStd: real("randomness_std").notNull(),
});

// Data

export const result = pgTable("result", {
  id: serial("id").primaryKey(),
  result: jsonb("result").notNull(),
  formData: jsonb("form_data").notNull(),
});

export const data = pgTable("data", {
  id: serial("id").primaryKey(),
  paramId: integer("param_id").references(() => param.id),
  gameId: integer("game_id").references(() => game.id),
  timeOfData: timestamp("time_of_data").notNull(),
  screenWidth: integer("screen_width").notNull(),
  screenHeight: integer("screen_height").notNull(),
  ballSize: real("ball_size").notNull(),
  resultId: integer("result_id").references(() => result.id),
});

// Instructions

export const instruction = pgTable("instruction", {
  id: serial("id").primaryKey(),
  step: integer("step").notNull(),
  link: text("link").notNull(),
  gameId: integer("game_id").references(() => game.id),
});

// Centralized schema object
export const schema = {
  game,
  param,
  result,
  data,
};

// Define a helper type for all schema keys
export type SchemaKeys = keyof typeof schema;

// Ensure tables have an `id` column
type TableWithId = {
  id: any; // You can use `unknown` or a stricter type for the `id` column
};

// Restrict schema to tables with `id`
type SchemaWithId = {
  [K in keyof typeof schema]: (typeof schema)[K] extends TableWithId
    ? (typeof schema)[K]
    : never;
};

// Define valid table keys
export type TableWithIdName = keyof SchemaWithId;
