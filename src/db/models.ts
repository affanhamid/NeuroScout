import dynamoose from "dynamoose";
import {
  OrganizationSchema,
  PlayerSchema,
  GameSchema,
  GameObservationSchema,
  UserSchema,
  ResultSchema,
  MetricsTemplateSchema,
} from "@/types/database";

import type {
  Organization,
  Player,
  Game,
  GameObservation,
  User,
  Result,
  MetricsTemplate,
} from "@/types/models";

export const OrganizationModel = dynamoose.model<Organization>(
  "Organization",
  OrganizationSchema,
);
export const PlayerModel = dynamoose.model<Player>("Player", PlayerSchema);
export const GameModel = dynamoose.model<Game>("Game", GameSchema);
export const GameObservationModel = dynamoose.model<GameObservation>(
  "GameObservation",
  GameObservationSchema,
);
export const UserModel = dynamoose.model<User>("User", UserSchema);
export const ResultModel = dynamoose.model<Result>("Result", ResultSchema);
export const MetricsTemplateModel = dynamoose.model<MetricsTemplate>(
  "MetricsTemplate",
  MetricsTemplateSchema,
);
