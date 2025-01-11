import { ErrorDetails } from "./api";

export class DatabaseError extends Error {
  public code: number; // HTTP status code
  public details?: ErrorDetails; // Optional error details

  constructor(message: string, code: number = 500, details?: ErrorDetails) {
    super(message); // Pass only the message to the Error constructor
    this.name = "DatabaseError"; // Set the name of the error
    this.code = code; // Assign the HTTP status code
    this.details = details; // Assign the details separately
  }
}

export class DatabaseConnectionError extends DatabaseError {
  constructor(message: string = "Failed to connect to the database") {
    super(message, 503); // 503: Service Unavailable
    this.name = "DatabaseConnectionError";
  }
}

export class DatabaseQueryError extends DatabaseError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, details); // 400: Bad Request
    this.name = "DatabaseQueryError";
  }
}

export class QuerySyntaxError extends DatabaseQueryError {
  constructor(details?: ErrorDetails) {
    super("Syntax error in the database query", details);
    this.name = "QuerySyntaxError";
  }
}

export class InvalidFieldError extends DatabaseQueryError {
  constructor(details?: ErrorDetails) {
    super("Invalid field or table in query", details);
    this.name = "InvalidFieldError";
  }
}

export class TypeMismatchError extends DatabaseQueryError {
  constructor(details?: ErrorDetails) {
    super("Type mismatch in query", details);
    this.name = "TypeMismatchError";
  }
}

export class PermissionDeniedError extends DatabaseQueryError {
  constructor(details?: ErrorDetails) {
    super("Permission denied for database query", details);
    this.name = "PermissionDeniedError";
  }
}

export class DatabaseTransactionError extends DatabaseError {
  constructor(
    message: string = "Database transaction failed",
    details?: ErrorDetails
  ) {
    super(message, 500, details); // 500: Internal Server Error
    this.name = "DatabaseTransactionError";
  }
}

export class DatabaseTimeoutError extends DatabaseError {
  constructor(
    message: string = "Database operation timed out",
    details?: ErrorDetails
  ) {
    super(message, 504, details); // 504: Gateway Timeout
    this.name = "DatabaseTimeoutError";
  }
}

export class DatabaseConstraintError extends DatabaseError {
  constructor(
    message: string = "Constraint violation in database operation",
    details?: ErrorDetails
  ) {
    super(message, 409, details); // 409: Conflict
    this.name = "DatabaseConstraintError";
  }
}

export class DatabaseResourceError extends DatabaseError {
  constructor(
    message: string = "Database resource limit exceeded",
    details?: ErrorDetails
  ) {
    super(message, 507, details); // 507: Insufficient Storage
    this.name = "DatabaseResourceError";
  }
}

export const handleDBError = (error: unknown): never => {
  if (error instanceof Error) {
    // Handle custom DatabaseError types
    if (error instanceof DatabaseError) {
      throw error; // Re-throw the specific database error
    }

    // Handle ValidationError
    if (error.name === "ValidationError") {
      throw new DatabaseQueryError("Validation failed", {
        info: error.message
      });
    }

    // Handle CastError (e.g., invalid ID format)
    if (error.name === "CastError") {
      throw new InvalidFieldError({
        info: error.message
      });
    }

    // Handle duplicate key errors
    if ("code" in error && (error as { code: number }).code === 11000) {
      throw new DatabaseConstraintError("Duplicate key error", {
        info: error.message
      });
    }

    // Handle connection or timeout errors
    if (
      error.message.includes("timed out") ||
      error.message.includes("ECONNREFUSED")
    ) {
      throw new DatabaseTimeoutError("Database connection timed out", {
        info: error.message
      });
    }

    if (error.message.includes("connect")) {
      throw new DatabaseConnectionError("Failed to connect to the database");
    }

    // Handle any other generic database-related errors
    throw new DatabaseQueryError("Database query failed", {
      info: error.message
    });
  }

  // Handle non-Error unknown errors
  throw new DatabaseError("An unknown error occurred");
};
