import {
  OrganizationSchema,
  PlayerSchema,
  GameSchema,
  GameObservationSchema,
  UserSchema,
  ResultSchema,
  MetricsTemplateSchema,
} from "./schema";
import { model } from "mongoose";

// Models
export const OrganizationModel = model("Organization", OrganizationSchema);
export const PlayerModel = model("Player", PlayerSchema);
export const GameModel = model("Game", GameSchema);
export const GameObservationModel = model(
  "Game Observation",
  GameObservationSchema,
);
export const UserModel = model("User", UserSchema);
export const ResultModel = model("Results", ResultSchema);
export const MetricsTemplateModel = model(
  "MetricsTemplate",
  MetricsTemplateSchema,
);
