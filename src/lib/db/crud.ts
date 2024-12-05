import { Model, Document, Types } from "mongoose";
import * as e from "@/errors";
import { handleDBError } from "@/errors";
import { connect, disconnect } from "./database";

export const addOne = async <TObject>(
  model: Model<TObject>,
  item: TObject // Input type is TObject
): Promise<Document & TObject> => {
  await connect();
  const newItem = await model.create(item); // Create item using TObject
  await disconnect();
  return newItem;
};

export const getOne = async <TObject>(
  model: Model<TObject>,
  id: string // Input type is id
): Promise<TObject & Document> => {
  await connect();

  const item = await model.findById(id);
  if (!item) {
    throw new e.NotFoundError(`Item with ID ${id} not found`);
  }
  await disconnect();
  return item;
};

export const getAll = async <TObject>(
  model: Model<TObject>
): Promise<(Document & TObject)[]> => {
  await connect();
  const items = await model.find();
  await disconnect();
  return items;
};

export const updateOne = async <TObject>(
  model: Model<TObject>,
  id: string,
  updates: Partial<TObject & Document>, // Updates are Partial<TModel>
  isNew: boolean
): Promise<Document & TObject> => {
  await connect();
  const updatedItem = await model
    .findByIdAndUpdate(id, updates, {
      new: isNew,
      runValidators: true
    })
    .exec();
  await disconnect();
  if (!updatedItem) {
    throw new e.NotFoundError(`Item with ID ${id} not found for update`);
  }
  return updatedItem;
};

export const deleteOne = async <TObject>(
  model: Model<TObject>,
  id: string // Input type is id
): Promise<void> => {
  await connect();
  const deletedItem = await model.findByIdAndDelete(id).exec();
  if (!deletedItem) {
    throw new e.NotFoundError(`Item with ID ${id} not found for deletion`);
  }
  await disconnect();
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
  await connect();
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
    await disconnect();
    return true;
  } catch (err) {
    await disconnect();
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
