import { Model, Document, Types } from "mongoose";
import * as e from "@/errors";
import { handleDBError } from "@/errors";
import { connect, disconnect } from "./database";

export const addOne = async <TObject>(
  model: Model<TObject>,
  item: TObject // Input type is TObject
): Promise<Document & TObject> => {
  const newItem = await model.create(item); // Create item using TObject
  return newItem;
};

export const getOne = async <TObject>(
  model: Model<TObject>,
  id: string
): Promise<TObject & Document> => {
  const item = await model.findById(id);
  if (!item) {
    throw new e.NotFoundError(`Item with ID ${id} not found`);
  }
  return item;
};

export const getAll = async <TObject>(
  model: Model<TObject>
): Promise<(Document & TObject)[]> => {
  const items = await model.find();
  return items;
};

export const updateOne = async <TObject>(
  model: Model<TObject>,
  id: string,
  updates: Partial<TObject & Document>, // Updates are Partial<TModel>
  isNew: boolean
): Promise<Document & TObject> => {
  const updatedItem = await model
    .findByIdAndUpdate(id, updates, {
      new: isNew,
      runValidators: true
    })
    .exec();
  if (!updatedItem) {
    throw new e.NotFoundError(`Item with ID ${id} not found for update`);
  }
  return updatedItem;
};

export const deleteOne = async <TObject>(
  model: Model<TObject>,
  id: string // Input type is id
): Promise<Document & TObject> => {
  const updatedItem = await model
    .findByIdAndUpdate(
      id,
      { deletedAt: new Date() }, // Set the deletedAt field to the current timestamp
      { new: true, runValidators: true } // Return the updated document
    )
    .exec();
  if (!updatedItem) {
    throw new e.NotFoundError(`Item with ID ${id} not found for soft deletion`);
  }
  return updatedItem;
};

export const validateReferences = async <
  TObjects extends Record<string, string | number>
>(
  references:
    | Map<Model<TObjects[keyof TObjects]>, keyof TObjects[keyof TObjects]>
    | object
): Promise<boolean> => {
  if (!(references instanceof Map) || references.size === 0) {
    return false;
  }
  try {
    for (const [model, key] of references.entries()) {
      if (!Types.ObjectId.isValid(key as string)) {
        throw new e.ValidationError(
          `Invalid object id: model: ${model}, key: ${String(key)}`
        );
      }
      const exists = await model.exists({ _id: key });
      if (!exists) {
        throw new e.ValidationError(
          `Reference with object id ${String(key)} does not exist in ${Model}`
        );
      }
    }
    return true;
  } catch (err) {
    throw new e.DatabaseError(`Error Validating References: ${err}`);
  }
};

const withErrorHandling = <
  TObject,
  TArgs extends
    | [TObject] // For addOne
    | [id: string] // For getOne and deleteOne
    | [id: string, updates: Partial<TObject & Document>, isNew: boolean] // For updateOne
    | [], // For getAll
  TResult
>(
  handler: (
    model: Model<TObject & Document>,
    ...args: TArgs
  ) => Promise<TResult>
) => {
  return async (
    model: Model<TObject & Document>,
    ...args: TArgs
  ): Promise<TResult> => {
    try {
      return handler(model, ...args);
    } catch (error) {
      handleDBError(error);
      throw error;
    }
  };
};

export const handlers = {
  getAll: withErrorHandling(getAll),
  getOne: withErrorHandling(getOne),
  addOne: withErrorHandling(addOne),
  updateOne: withErrorHandling(updateOne),
  deleteOne: withErrorHandling(deleteOne)
};
