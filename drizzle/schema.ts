import { pgTable, foreignKey, serial, integer, text, jsonb, real, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const instruction = pgTable("instruction", {
	id: serial().primaryKey().notNull(),
	step: integer().notNull(),
	link: text().notNull(),
	gameId: integer("game_id"),
}, (table) => {
	return {
		instructionGameIdGameIdFk: foreignKey({
			columns: [table.gameId],
			foreignColumns: [game.id],
			name: "instruction_game_id_game_id_fk"
		}),
	}
});

export const result = pgTable("result", {
	id: serial().primaryKey().notNull(),
	result: jsonb().notNull(),
	formData: jsonb("form_data").notNull(),
});

export const tntGlowParam = pgTable("tnt_glow_param", {
	paramId: integer("param_id").primaryKey().notNull(),
	numberOfBalls: integer("number_of_balls").notNull(),
	targetBalls: integer("target_balls").notNull(),
	duration: integer().notNull(),
	startingVts: integer("starting_vts").notNull(),
	changeInVts: integer("change_in_vts").notNull(),
	randomnessMean: real("randomness_mean").notNull(),
	randomnessStd: real("randomness_std").notNull(),
}, (table) => {
	return {
		tntGlowParamParamIdParamIdFk: foreignKey({
			columns: [table.paramId],
			foreignColumns: [param.id],
			name: "tnt_glow_param_param_id_param_id_fk"
		}),
	}
});

export const data = pgTable("data", {
	id: serial().primaryKey().notNull(),
	paramId: integer("param_id"),
	timeOfData: timestamp("time_of_data", { mode: 'string' }).notNull(),
	screenWidth: integer("screen_width").notNull(),
	screenHeight: integer("screen_height").notNull(),
	ballSize: real("ball_size").notNull(),
	resultId: integer("result_id"),
	gameId: integer("game_id"),
}, (table) => {
	return {
		dataParamIdParamIdFk: foreignKey({
			columns: [table.paramId],
			foreignColumns: [param.id],
			name: "data_param_id_param_id_fk"
		}),
		dataResultIdResultIdFk: foreignKey({
			columns: [table.resultId],
			foreignColumns: [result.id],
			name: "data_result_id_result_id_fk"
		}),
		dataGameIdGameIdFk: foreignKey({
			columns: [table.gameId],
			foreignColumns: [game.id],
			name: "data_game_id_game_id_fk"
		}),
	}
});

export const tntParam = pgTable("tnt_param", {
	paramId: integer("param_id").primaryKey().notNull(),
	numberOfBalls: integer("number_of_balls").notNull(),
	targetBalls: integer("target_balls").notNull(),
	duration: integer().notNull(),
	startingVts: integer("starting_vts").notNull(),
	changeInVts: integer("change_in_vts").notNull(),
}, (table) => {
	return {
		tntParamParamIdParamIdFk: foreignKey({
			columns: [table.paramId],
			foreignColumns: [param.id],
			name: "tnt_param_param_id_param_id_fk"
		}),
	}
});

export const game = pgTable("game", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	imageLink: text("image_link").notNull(),
});

export const tntStrobeParam = pgTable("tnt_strobe_param", {
	paramId: integer("param_id").primaryKey().notNull(),
	numberOfBalls: integer("number_of_balls").notNull(),
	targetBalls: integer("target_balls").notNull(),
	duration: integer().notNull(),
	startingVts: integer("starting_vts").notNull(),
	changeIntVts: integer("change_int_vts").notNull(),
	strobeA: real("strobe_a").notNull(),
	strobeB: real("strobe_b").notNull(),
}, (table) => {
	return {
		tntStrobeParamParamIdParamIdFk: foreignKey({
			columns: [table.paramId],
			foreignColumns: [param.id],
			name: "tnt_strobe_param_param_id_param_id_fk"
		}),
	}
});

export const param = pgTable("param", {
	id: serial().primaryKey().notNull(),
	practiceTrials: integer("practice_trials").notNull(),
	trials: integer().notNull(),
	inUse: boolean("in_use").default(false),
	gameId: integer("game_id"),
}, (table) => {
	return {
		paramGameIdGameIdFk: foreignKey({
			columns: [table.gameId],
			foreignColumns: [game.id],
			name: "param_game_id_game_id_fk"
		}),
	}
});
