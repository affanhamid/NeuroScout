import {
  OrganizationModel,
  PlayerModel,
  GameModel,
  GameObservationModel,
  UserModel,
  ResultsModel,
  MetricsTemplateModel,
} from "./database";
import { InferSchemaType } from "mongoose";

// Generic API response type
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Infer types from Mongoose models
type Organization = InferSchemaType<typeof OrganizationModel>;
type Player = InferSchemaType<typeof PlayerModel>;
type Game = InferSchemaType<typeof GameModel>;
type GameObservation = InferSchemaType<typeof GameObservationModel>;
type User = InferSchemaType<typeof UserModel>;
type Result = InferSchemaType<typeof ResultsModel>;
type MetricsTemplate = InferSchemaType<typeof MetricsTemplateModel>;

// Organizations
export type CreateOrganizationRequest = { name: string };
export type UpdateOrganizationRequest = Partial<CreateOrganizationRequest>;

export type GetOrganizationResponse = ApiResponse<Organization>;
export type GetOrganizationsResponse = ApiResponse<Organization[]>;

// Player
export type CreatePlayerRequest = {
  id?: string; // Adjusted `id` type to match Mongoose (likely a string)
  age: number;
  position: number;
  organizationId: string;
};
export type UpdatePlayerRequest = Partial<CreatePlayerRequest>;

export type GetPlayerResponse = ApiResponse<Player>;
export type GetPlayersResponse = ApiResponse<Player[]>;

// Game
export type CreateGameRequest = {
  name: string;
  description: string;
  image: string;
  parameters: Array<{
    id: string;
    data: Record<string, unknown>; // Using `unknown` for flexibility
  }>;
  scoringMechanisms: Array<{
    id: string;
    description: string;
    function: string; // Serialized function stored as a string
  }>;
};
export type UpdateGameRequest = Partial<CreateGameRequest>;

export type GetGameResponse = ApiResponse<Game>;
export type GetGamesResponse = ApiResponse<Game[]>;

// Game Observation
export type CreateGameObservationRequest = {
  playerId: string;
  gameId: string;
  data: Record<string, unknown>; // Using `unknown` for flexibility
};
export type UpdateGameObservationRequest =
  Partial<CreateGameObservationRequest>;

export type GetGameObservationResponse = ApiResponse<GameObservation>;
export type GetGameObservationsResponse = ApiResponse<GameObservation[]>;

// User
export type CreateUserRequest = {
  email: string;
  password: string;
  role: "admin" | "user" | "manager";
  organizationId: string;
};
export type UpdateUserRequest = Partial<CreateUserRequest>;

export type GetUserResponse = ApiResponse<User>;
export type GetUsersResponse = ApiResponse<User[]>;

// Result
export type CreateResultRequest = {
  gameId: string;
  playerId: string;
  metrics: Record<string, unknown>; // Adjusted for flexibility
  resultDate?: Date;
};
export type UpdateResultRequest = Partial<CreateResultRequest>;

export type GetResultResponse = ApiResponse<Result>;
export type GetResultsResponse = ApiResponse<Result[]>;

// Metrics Template
export type CreateMetricsTemplateRequest = {
  gameId: string;
  metrics: Array<{
    name: string;
    description: string;
    type: "number" | "string";
  }>;
};
export type UpdateMetricsTemplateRequest =
  Partial<CreateMetricsTemplateRequest>;

export type GetMetricsTemplateResponse = ApiResponse<MetricsTemplate>;
export type GetMetricsTemplatesResponse = ApiResponse<MetricsTemplate[]>;
