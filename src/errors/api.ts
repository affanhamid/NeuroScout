export type ErrorDetails = {
  field?: string; // Field or parameter causing the error
  value?: string | number | boolean | object | null; // Value that caused the error
  info?: string; // Additional human-readable information
};

export class ApiError extends Error {
  public code: number; // HTTP status code
  public details?: ErrorDetails; // Optional error details

  constructor(message: string, code: number, details?: ErrorDetails) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, details); // 400: Bad Request
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 404, details); // 404: Not Found
    this.name = "NotFoundError";
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 401, details); // 401: Unauthorized
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 403, details); // 403: Forbidden
    this.name = "AuthorizationError";
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 409, details); // 409: Conflict
    this.name = "ConflictError";
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 500, details); // 500: Internal Server Error
    this.name = "InternalServerError";
  }
}

export class BadGatewayError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 502, details); // 502: Bad Gateway
    this.name = "BadGatewayError";
  }
}
