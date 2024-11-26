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
    details?: ErrorDetails,
  ) {
    super(message, 500, details); // 500: Internal Server Error
    this.name = "DatabaseTransactionError";
  }
}

export class DatabaseTimeoutError extends DatabaseError {
  constructor(
    message: string = "Database operation timed out",
    details?: ErrorDetails,
  ) {
    super(message, 504, details); // 504: Gateway Timeout
    this.name = "DatabaseTimeoutError";
  }
}

export class DatabaseConstraintError extends DatabaseError {
  constructor(
    message: string = "Constraint violation in database operation",
    details?: ErrorDetails,
  ) {
    super(message, 409, details); // 409: Conflict
    this.name = "DatabaseConstraintError";
  }
}

export class DatabaseResourceError extends DatabaseError {
  constructor(
    message: string = "Database resource limit exceeded",
    details?: ErrorDetails,
  ) {
    super(message, 507, details); // 507: Insufficient Storage
    this.name = "DatabaseResourceError";
  }
}
