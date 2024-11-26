import { ModelType } from "dynamoose";
import * as e from "@/errors";

export const handleError = (error: unknown): never => {
  if (error instanceof Error) {
    // Handle Dynamoose Validation Errors
    if (error.message.includes("ValidationError")) {
      throw new e.ValidationError("Validation failed", {
        info: error.message,
      });
    }

    // Handle Dynamoose Conditional Check Errors
    if (error.message.includes("ConditionalCheckFailedException")) {
      throw new e.DatabaseConstraintError("Conditional check failed", {
        info: error.message,
      });
    }

    // Handle Dynamoose Timeout or Connection Errors
    if (
      error.message.includes("Request timed out") ||
      error.message.includes("connect")
    ) {
      throw new e.DatabaseTimeoutError("Database connection timed out", {
        info: error.message,
      });
    }

    // Handle Dynamoose Resource Limit Errors
    if (error.message.includes("ProvisionedThroughputExceededException")) {
      throw new e.DatabaseResourceError("Throughput limit exceeded", {
        info: error.message,
      });
    }

    // General Dynamoose Errors
    throw new e.DatabaseQueryError("Database query failed", {
      info: error.message,
    });
  }

  // Handle Unknown Errors
  throw new e.InternalServerError("An unknown error occurred");
};

export const create = async <T>(
  item: T,
  model: typeof ModelType<T>,
): Promise<T> => {
  try {
    const newItem = await model.create(item);
    return newItem;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getById = async <T>(
  id: string,
  model: typeof ModelType<T>,
): Promise<T | null> => {
  try {
    const item = await model.get(id);
    if (!item) {
      throw new e.NotFoundError(`Item with ID ${id} not found`);
    }
    return item;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAll = async <T>(model: typeof ModelType<T>): Promise<T[]> => {
  try {
    const items = await model.scan().exec();
    return items;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const update = async <T>(
  id: string,
  updates: Partial<T>,
  model: typeof ModelType<T>,
): Promise<T> => {
  try {
    const updatedItem = await model.update({ id }, updates);
    if (!updatedItem) {
      throw new e.NotFoundError(`Item with ID ${id} not found for update`);
    }
    return updatedItem;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteById = async <T>(
  id: string,
  model: typeof ModelType<T>,
): Promise<void> => {
  try {
    const deletedItem = await model.delete(id);
    if (!deletedItem) {
      throw new e.NotFoundError(`Item with ID ${id} not found for deletion`);
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};
