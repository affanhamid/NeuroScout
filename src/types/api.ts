import {
  Organization,
  Player,
  Game,
  GameObservation,
  User,
  Result,
  MetricsTemplate,
} from "./models";
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Organizations

export type CreateOrganizationRequest = { name: string };
export type UpdateOrganizationRequest = Partial<CreateOrganizationRequest>;

export type GetOrganizationResponse = ApiResponse<Organization>;
export type GetOrganizationsResponse = ApiResponse<Organization[]>;

// Player

export type CreatePlayerRequest = {
  id?: number;
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
    data: Record<string, object | number | string>;
  }>;
  scoringMechanisms: Array<{
    id: string;
    description: string;
    function: string;
  }>;
};
export type UpdateGameRequest = Partial<CreateGameRequest>;

export type GetGameResponse = ApiResponse<Game>;
export type GetGamesResponse = ApiResponse<Game[]>;

// Game Observation

export type CreateGameObservationRequest = {
  playerId: string;
  gameId: string;
  data: Record<string, object | string | number>;
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
  metrics: Record<string, MetricsTemplate>;
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
