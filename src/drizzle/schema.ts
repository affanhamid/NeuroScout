import { pgTable, timestamp, integer, text, real } from "drizzle-orm/pg-core";

export const TNT_DATA = pgTable("TNT_DATA", {
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

export const TNT_PARAMS = pgTable("TNT_PARAMS", {
  number_of_balls: integer("number_of_balls").notNull(),
  target_balls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  starting_vts: integer("starting_vts").notNull(),
  practice_trials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
});

export const TNT_STROBE_PARAMS = pgTable("TNT_STROBE_PARAMS", {
  number_of_balls: integer("number_of_balls").notNull(),
  target_balls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  starting_vts: integer("starting_vts").notNull(),
  practice_trials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  strobe_a: real("strobe_a").notNull(),
  strobe_b: real("strobe_b").notNull(),
});

export const TNT_FLASH_PARAMS = pgTable("TNT_FLASH_PARAMS", {
  number_of_balls: integer("number_of_balls").notNull(),
  target_balls: integer("target_balls").notNull(),
  duration: integer("duration").notNull(),
  starting_vts: integer("starting_vts").notNull(),
  practice_trials: integer("practice_trials").notNull(),
  trials: integer("trials").notNull(),
  visible_time: real("visible_time").notNull(),
  invisible_time: real("invisible_time").notNull(),
});
