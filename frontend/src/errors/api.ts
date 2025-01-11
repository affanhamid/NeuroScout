export type ErrorDetails = {
  field?: string; // Field or parameter causing the error
  value?: string | number | boolean | object | null; // Value that caused the error
  info?: string; // Additional human-readable information
};

export class ApiError extends Error {
  public code: number; // HTTP status code
  public details?: ErrorDetails; // Optional error details

  constructor(message: string, code: number, details?: ErrorDetails) {
    super(message + JSON.stringify(details));
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

export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError) {
    // Re-throw if it's already an ApiError
    throw error;
  }

  if (error instanceof Error) {
    // Map generic errors to specific types
    switch (error.name) {
      case "ValidationError":
        throw new ValidationError("Validation error occurred", {
          info: error.message
        });
      case "NotFoundError":
        throw new NotFoundError("Resource not found", {
          info: error.message
        });
      case "AuthenticationError":
        throw new AuthenticationError("Authentication failed", {
          info: error.message
        });
      case "AuthorizationError":
        throw new AuthorizationError("Access forbidden", {
          info: error.message
        });
      case "ConflictError":
        throw new ConflictError("Conflict error", {
          info: error.message
        });
      case "InternalServerError":
        throw new InternalServerError("Internal server error", {
          info: error.message
        });
      case "BadGatewayError":
        throw new BadGatewayError("Bad gateway error", {
          info: error.message
        });
      default:
        // Fallback for unhandled error names
        throw new InternalServerError("An unexpected error occurred", {
          info: error.message
        });
    }
  }

  // Handle unknown or non-Error objects
  throw new InternalServerError("An unknown error occurred", {
    info: String(error)
  });
};
