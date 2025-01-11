import { handleDBError } from "@/errors";

import * as e from "@/errors";

describe("handleError", () => {
  test("should throw ValidationError for ValidationError name", () => {
    const error = new Error("Validation failed");
    error.name = "ValidationError";

    expect(() => handleDBError(error)).toThrow(e.DatabaseQueryError);
    expect(() => handleDBError(error)).toThrow("Validation failed");
  });

  test("should throw InvalidFieldError for CastError name", () => {
    const error = new Error("Invalid ID");
    error.name = "CastError";

    expect(() => handleDBError(error)).toThrow(e.InvalidFieldError);
    expect(() => handleDBError(error)).toThrow(
      "Invalid field or table in query"
    );
  });

  test("should throw DatabaseConstraintError for duplicate key error (code 11000)", () => {
    const error = new Error("Duplicate key error") as Error & { code: number };
    error.code = 11000;

    expect(() => handleDBError(error)).toThrow(e.DatabaseConstraintError);
    expect(() => handleDBError(error)).toThrow("Duplicate key error");
  });

  test("should throw DatabaseTimeoutError for connection timeout", () => {
    const error = new Error("timed out connecting to database");

    expect(() => handleDBError(error)).toThrow(e.DatabaseTimeoutError);
    expect(() => handleDBError(error)).toThrow("Database connection timed out");
  });

  test("should throw DatabaseTimeoutError for ECONNREFUSED", () => {
    const error = new Error("ECONNREFUSED");

    expect(() => handleDBError(error)).toThrow(e.DatabaseTimeoutError);
    expect(() => handleDBError(error)).toThrow("Database connection timed out");
  });

  test("should throw DatabaseConnectionError for generic connection errors", () => {
    const error = new Error("Failed to connect");

    expect(() => handleDBError(error)).toThrow(e.DatabaseConnectionError);
    expect(() => handleDBError(error)).toThrow(
      "Failed to connect to the database"
    );
  });

  test("should throw DatabaseQueryError for QuerySyntaxError", () => {
    const error = new e.QuerySyntaxError({ info: "Syntax issue" });

    expect(() => handleDBError(error)).toThrow(e.QuerySyntaxError);
    expect(() => handleDBError(error)).toThrow(
      "Syntax error in the database query"
    );
  });

  test("should throw TypeMismatchError for type mismatch in query", () => {
    const error = new e.TypeMismatchError({ info: "Type mismatch detected" });

    expect(() => handleDBError(error)).toThrow(e.TypeMismatchError);
    expect(() => handleDBError(error)).toThrow("Type mismatch in query");
  });

  test("should throw PermissionDeniedError for permission issues", () => {
    const error = new e.PermissionDeniedError({ info: "Permission denied" });

    expect(() => handleDBError(error)).toThrow(e.PermissionDeniedError);
    expect(() => handleDBError(error)).toThrow(
      "Permission denied for database query"
    );
  });

  test("should throw DatabaseTransactionError for failed transactions", () => {
    const error = new e.DatabaseTransactionError("Transaction error occurred");

    expect(() => handleDBError(error)).toThrow(e.DatabaseTransactionError);
    expect(() => handleDBError(error)).toThrow("Transaction error occurred");
  });

  test("should throw DatabaseResourceError for resource limit exceeded", () => {
    const error = new e.DatabaseResourceError("Resource limit exceeded");

    expect(() => handleDBError(error)).toThrow(e.DatabaseResourceError);
    expect(() => handleDBError(error)).toThrow("Resource limit exceeded");
  });

  test("should throw DatabaseQueryError for general database query errors", () => {
    const error = new Error("Some database query error");

    expect(() => handleDBError(error)).toThrow(e.DatabaseQueryError);
    expect(() => handleDBError(error)).toThrow("Database query failed");
  });

  test("should throw InternalServerError for unknown errors", () => {
    const error = "Unknown error";

    expect(() => handleDBError(error)).toThrow(e.DatabaseError);
    expect(() => handleDBError(error)).toThrow("An unknown error occurred");
  });
});
