import {
  OrganizationSchema,
  PlayerSchema,
  GameSchema,
  GameObservationSchema,
  UserSchema,
  ResultSchema,
  MetricsTemplateSchema
} from "./schema";
import { model, models } from "mongoose";

// Models
export const OrganizationModel =
  models.Organization || model("Organization", OrganizationSchema);
export const PlayerModel = models.Player || model("Player", PlayerSchema);
export const GameModel = models.Game || model("Game", GameSchema);
export const GameObservationModel =
  models["Game Observation"] ||
  model("Game Observation", GameObservationSchema);
export const UserModel = models.User || model("User", UserSchema);
export const ResultModel = models.Result || model("Result", ResultSchema);
export const MetricsTemplateModel =
  models.MetricTemplate || model("MetricTemplate", MetricsTemplateSchema);
