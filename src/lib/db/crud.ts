import { Model, Document } from "mongoose";
import { handleError } from "./db";
import * as e from "@/errors";

export const create = async <T extends Document>(
  item: Partial<T>,
  model: Model<T>,
): Promise<T> => {
  try {
    const newItem = await model.create(item);
    return newItem;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getById = async <T extends Document>(
  id: string,
  model: Model<T>,
): Promise<T | null> => {
  try {
    const item = await model.findById(id).exec();
    if (!item) {
      throw new e.NotFoundError(`Item with ID ${id} not found`);
    }
    return item;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAll = async <T extends Document>(
  model: Model<T>,
): Promise<T[]> => {
  try {
    const items = await model.find().exec();
    return items;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const update = async <T extends Document>(
  id: string,
  updates: Partial<T>,
  model: Model<T>,
): Promise<T> => {
  try {
    const updatedItem = await model
      .findByIdAndUpdate(id, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      })
      .exec();
    if (!updatedItem) {
      throw new e.NotFoundError(`Item with ID ${id} not found for update`);
    }
    return updatedItem;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteById = async <T extends Document>(
  id: string,
  model: Model<T>,
): Promise<void> => {
  try {
    const deletedItem = await model.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new e.NotFoundError(`Item with ID ${id} not found for deletion`);
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};
