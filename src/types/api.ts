import { Types } from "mongoose";
import type {
  OrganizationType,
  PlayerType,
  GameType,
  GameObservationType,
  UserType,
  ResultType,
  MetricsTemplateType,
  OrganizationFields,
  PlayerFields
} from "../lib/db/schema";

export class ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;

  constructor(status: number, data?: T, error?: string) {
    this.status = status;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T, status = 200): ApiResponse<T> {
    return new ApiResponse<T>(status, data);
  }

  static error<T>(error: string, status = 400): ApiResponse<T> {
    return new ApiResponse<T>(status, undefined, error);
  }

  toJson(): Response {
    const responseBody = this.error
      ? { success: false, error: this.error }
      : { success: true, data: this.data };

    return new Response(JSON.stringify(responseBody), { status: this.status });
  }
}

export type ApiRequest<T> = {
  json: () => Promise<T>;
};

// Organizations
export type CreateOrganizationRequest = ApiRequest<OrganizationFields>;
export type UpdateOrganizationRequest = ApiRequest<
  Partial<CreateOrganizationRequest>
>;

export type GetOrganizationResponse = ApiResponse<
  OrganizationType & { _id: Types.ObjectId }
>;
export type GetOrganizationsResponse = ApiResponse<
  OrganizationType & { _id: Types.ObjectId }[]
>;

// Player
export type CreatePlayerRequest = ApiRequest<PlayerFields>;
export type UpdatePlayerRequest = ApiRequest<Partial<CreatePlayerRequest>>;

export type GetPlayerResponse = ApiResponse<
  PlayerType & { _id: Types.ObjectId }
>;
export type GetPlayersResponse = ApiResponse<
  PlayerType & { _id: Types.ObjectId }[]
>;

// Game
export type CreateGameRequest = ApiRequest<{
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
}>;
export type UpdateGameRequest = Partial<CreateGameRequest>;

export type GetGameResponse = ApiResponse<GameType & { _id: Types.ObjectId }>;
export type GetGamesResponse = ApiResponse<
  GameType & { _id: Types.ObjectId }[]
>;

// Game Observation
export type CreateGameObservationRequest = ApiRequest<{
  playerId: string;
  gameId: string;
  data: Record<string, unknown>; // Using `unknown` for flexibility
}>;
export type UpdateGameObservationRequest =
  Partial<CreateGameObservationRequest>;

export type GetGameObservationResponse = ApiResponse<
  GameObservationType & { _id: Types.ObjectId }
>;
export type GetGameObservationsResponse = ApiResponse<
  GameObservationType & { _id: Types.ObjectId }[]
>;

// User
export type CreateUserRequest = ApiRequest<{
  email: string;
  password: string;
  role: "admin" | "user" | "manager";
  organizationId: string;
}>;
export type UpdateUserRequest = Partial<CreateUserRequest>;

export type GetUserResponse = ApiResponse<UserType & { _id: Types.ObjectId }>;
export type GetUsersResponse = ApiResponse<
  UserType & { _id: Types.ObjectId }[]
>;

// Result
export type CreateResultRequest = ApiRequest<{
  gameId: string;
  playerId: string;
  metrics: Record<string, unknown>; // Adjusted for flexibility
  resultDate?: Date;
}>;
export type UpdateResultRequest = Partial<CreateResultRequest>;

export type GetResultResponse = ApiResponse<
  ResultType & { _id: Types.ObjectId }
>;
export type GetResultsResponse = ApiResponse<
  ResultType & { _id: Types.ObjectId }[]
>;

// Metrics Template
export type CreateMetricsTemplateRequest = ApiRequest<{
  gameId: string;
  metrics: Array<{
    name: string;
    description: string;
    type: "number" | "string";
  }>;
}>;
export type UpdateMetricsTemplateRequest =
  Partial<CreateMetricsTemplateRequest>;

export type GetMetricsTemplateResponse = ApiResponse<
  MetricsTemplateType & { _id: Types.ObjectId }
>;
export type GetMetricsTemplatesResponse = ApiResponse<
  MetricsTemplateType & { _id: Types.ObjectId }[]
>;
