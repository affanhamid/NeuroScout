import { relations } from "drizzle-orm/relations";
import { game, instruction, param, tntGlowParam, data, result, tntParam, tntStrobeParam } from "./schema";

export const instructionRelations = relations(instruction, ({one}) => ({
	game: one(game, {
		fields: [instruction.gameId],
		references: [game.id]
	}),
}));

export const gameRelations = relations(game, ({many}) => ({
	instructions: many(instruction),
	data: many(data),
	params: many(param),
}));

export const tntGlowParamRelations = relations(tntGlowParam, ({one}) => ({
	param: one(param, {
		fields: [tntGlowParam.paramId],
		references: [param.id]
	}),
}));

export const paramRelations = relations(param, ({one, many}) => ({
	tntGlowParams: many(tntGlowParam),
	data: many(data),
	tntParams: many(tntParam),
	tntStrobeParams: many(tntStrobeParam),
	game: one(game, {
		fields: [param.gameId],
		references: [game.id]
	}),
}));

export const dataRelations = relations(data, ({one}) => ({
	param: one(param, {
		fields: [data.paramId],
		references: [param.id]
	}),
	result: one(result, {
		fields: [data.resultId],
		references: [result.id]
	}),
	game: one(game, {
		fields: [data.gameId],
		references: [game.id]
	}),
}));

export const resultRelations = relations(result, ({many}) => ({
	data: many(data),
}));

export const tntParamRelations = relations(tntParam, ({one}) => ({
	param: one(param, {
		fields: [tntParam.paramId],
		references: [param.id]
	}),
}));

export const tntStrobeParamRelations = relations(tntStrobeParam, ({one}) => ({
	param: one(param, {
		fields: [tntStrobeParam.paramId],
		references: [param.id]
	}),
}));