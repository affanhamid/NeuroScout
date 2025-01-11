import type {
  OrganizationFields,
  PlayerFields,
  GameFields,
  GameTypeWithId,
  GameObservationTypeWithId,
  UserTypeWithId,
  ResultTypeWithId,
  MetricsTemplateTypeWithId,
  OrganizationTypeWithId,
  PlayerTypeWithId,
  GameObservationFields,
  ResultFields,
  MetricsTemplateFields,
  UserFields
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

export type GetOrganizationResponse = ApiResponse<OrganizationTypeWithId>;
export type GetOrganizationsResponse = ApiResponse<OrganizationTypeWithId[]>;

// Player
export type CreatePlayerRequest = ApiRequest<PlayerFields>;
export type UpdatePlayerRequest = ApiRequest<Partial<CreatePlayerRequest>>;

export type GetPlayerResponse = ApiResponse<PlayerTypeWithId>;
export type GetPlayersResponse = ApiResponse<PlayerTypeWithId[]>;

// Game
export type CreateGameRequest = ApiRequest<GameFields>;
export type UpdateGameRequest = Partial<CreateGameRequest>;

export type GetGameResponse = ApiResponse<GameTypeWithId>;
export type GetGamesResponse = ApiResponse<GameTypeWithId[]>;

// Game Observation
export type CreateGameObservationRequest = ApiRequest<GameObservationFields>;
export type UpdateGameObservationRequest =
  Partial<CreateGameObservationRequest>;

export type GetGameObservationResponse = ApiResponse<GameObservationTypeWithId>;
export type GetGameObservationsResponse =
  ApiResponse<GameObservationTypeWithId>;

// User
export type CreateUserRequest = ApiRequest<UserFields>;
export type UpdateUserRequest = Partial<CreateUserRequest>;

export type GetUserResponse = ApiResponse<UserTypeWithId>;
export type GetUsersResponse = ApiResponse<UserTypeWithId[]>;

// Result
export type CreateResultRequest = ApiRequest<ResultFields>;
export type UpdateResultRequest = Partial<CreateResultRequest>;

export type GetResultResponse = ApiResponse<ResultTypeWithId>;
export type GetResultsResponse = ApiResponse<ResultTypeWithId[]>;

// Metrics Template
export type CreateMetricsTemplateRequest = ApiRequest<MetricsTemplateFields>;
export type UpdateMetricsTemplateRequest =
  Partial<CreateMetricsTemplateRequest>;

export type GetMetricsTemplateResponse = ApiResponse<MetricsTemplateTypeWithId>;
export type GetMetricsTemplatesResponse = ApiResponse<
  MetricsTemplateTypeWithId[]
>;
