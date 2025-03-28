import { Model, Document } from "mongoose";
import { ApiResponse } from "@/types/api";
import {
  addOne,
  deleteOne,
  getAll,
  getByField,
  getOne,
  updateOne,
  validateReferences
} from "../db";
import { handleApiError } from "@/errors";
import { connect } from "../db";

export class BaseAPI<TObject> {
  constructor(public model: Model<TObject>) {
    this.connectToDb();
  }

  async connectToDb() {
    await connect();
  }

  async getOne(id: string): Promise<Response> {
    try {
      const modelObject = await getOne(this.model, id);
      if (!modelObject) {
        return ApiResponse.error("Item not found", 404).toJson();
      }
      return ApiResponse.success(modelObject).toJson();
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getAll(): Promise<Response> {
    try {
      const objects = await getAll(this.model);
      return ApiResponse.success(objects).toJson();
    } catch (error) {
      return handleApiError(error);
    }
  }

  async getByField<T>(fieldObj: Record<string, T>): Promise<Response> {
    try {
      const objects = await getByField(this.model, fieldObj);
      return ApiResponse.success(objects).toJson();
    } catch (error) {
      return handleApiError(error);
    }
  }

  async addOne<TObjects extends Record<string, string | number>>(
    values: TObject,
    references?: Map<
      Model<TObjects[keyof TObjects]>,
      keyof TObjects[keyof TObjects]
    >
  ): Promise<Response> {
    try {
      const validReferences = references
        ? await validateReferences(references!)
        : true;
      if (validReferences) {
        const result = await addOne<TObject>(this.model, values);
        return ApiResponse.success(result, 201).toJson();
      } else {
        return ApiResponse.error("invalid Reference", 403).toJson();
      }
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateOne<TObjects extends Record<string, string | number>>(
    id: string,
    updateData: Partial<Document & TObject>,
    references?: Map<
      Model<TObjects[keyof TObjects]>,
      keyof TObjects[keyof TObjects]
    >
  ): Promise<Response> {
    try {
      const validReferences = references
        ? await validateReferences(references!)
        : true;
      if (validReferences) {
        const updatedModel = await updateOne(this.model, id, updateData, true);
        if (!updatedModel) {
          return ApiResponse.error("Item not found", 404).toJson();
        }
        return ApiResponse.success(updatedModel).toJson();
      } else {
        return ApiResponse.error("invalid Reference", 403).toJson();
      }
    } catch (error) {
      return handleApiError(error);
    }
  }

  async deleteOne(id: string): Promise<Response> {
    try {
      await deleteOne(this.model, id);
      return ApiResponse.success(204).toJson();
    } catch (error) {
      return handleApiError(error);
    }
  }
}
