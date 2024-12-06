import { connect, disconnect } from "../db";
import { Model, Types } from "mongoose";
import { ApiRequest } from "@/types/api";
import * as e from "@/errors";

export class BaseTest<TModel, TObject> {
  constructor(
    public model: Model<TModel>,
    public getRouteHandlers: () => {
      getOne: ({ params }: { params: { id: string } }) => Promise<Response>;
      getAll: () => Promise<Response>;
      addOne: (req: ApiRequest<TModel>) => Promise<Response>;
      updateOne: (
        req: ApiRequest<Partial<TModel>>,
        { params }: { params: { id: string } }
      ) => Promise<Response>;
      deleteOne: ({ params }: { params: { id: string } }) => Promise<Response>;
    },
    public testObject: TObject,
    public postRequestBody: Partial<TModel>,
    public updateRequestBody: Partial<TModel>
  ) {}

  async createObject() {
    console.log("created object fn 1");
    await connect();
    const createdDoc = await this.model.create(this.testObject);
    await disconnect();
    return { createdDoc, referencedObjects: {} };
  }

  async deleteObject(createdDoc: any, referencedObjects: any) {
    await connect();

    await this.model.deleteOne({ _id: createdDoc._id });
    if (referencedObjects instanceof Map && referencedObjects.size !== 0) {
      for (const [model, id] of referencedObjects.entries()) {
        await model.deleteOne({ _id: id });
      }
    }
    await disconnect();
  }

  testGetAll() {
    it("should return all documents with status 200", async () => {
      const { getAll } = this.getRouteHandlers();
      const response = await getAll();
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toBeTruthy();
      expect(Array.isArray(body.data)).toBe(true);
    });
  }

  testGetOne(getCreatedDoc: () => any) {
    it("should return a single document with status 200", async () => {
      const createdDoc = getCreatedDoc();
      const { getOne } = this.getRouteHandlers();
      const response = await getOne({
        params: { id: createdDoc._id as string }
      });
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toBeTruthy();
    });
  }

  testPut(requestBody: Partial<TModel>, getCreatedDoc: () => any) {
    it("should update an existing document with status 200", async () => {
      const createdDoc = getCreatedDoc();
      const { updateOne } = this.getRouteHandlers();
      const reqBody = {
        json: async () => requestBody
      } as ApiRequest<Partial<TModel>>;

      const response = await updateOne(reqBody, {
        params: { id: createdDoc._id as string }
      });
      await response.json();

      expect(response.status).toBe(200);
    });
  }

  testPost(postObject: Partial<TModel>) {
    it("should create a new document with status 201", async () => {
      const { addOne } = this.getRouteHandlers();

      const reqBody = {
        json: async () => postObject
      } as ApiRequest<TModel>;

      const response = await addOne(reqBody);
      const body = await response.json();

      expect(response.status).toBe(201);

      await this.deleteObject(body.data, {});
    });
  }

  testDelete(getCreatedDoc: () => any) {
    it("should delete a document with status 200", async () => {
      const createdDoc = getCreatedDoc();
      const { deleteOne } = this.getRouteHandlers();
      const response = await deleteOne({
        params: { id: createdDoc._id as string }
      });

      await response.json();

      expect(response.status).toBe(200);

      // Verify Deletion
      await connect();
      const deletedDoc = await this.model.findById(createdDoc._id);
      expect(deletedDoc).toBeTruthy();
      await disconnect();
    });
  }

  runTests() {
    describe(`${this.model.modelName} API Tests`, () => {
      let createdDoc: any;
      let referencedObjects: any;

      const getCreatedDoc = () => {
        if (!createdDoc) {
          throw new Error("createdDoc is not initialized");
        }
        return createdDoc;
      };

      beforeAll(async () => {
        const createdObjects = await this.createObject();
        createdDoc = createdObjects.createdDoc;
        referencedObjects = createdObjects.referencedObjects;
      });

      afterAll(async () => {
        if (createdDoc) {
          await this.deleteObject(createdDoc, referencedObjects);
        }
      });

      // Test cases
      this.testGetAll();
      this.testGetOne(getCreatedDoc);
      this.testPost(this.postRequestBody);
      this.testPut(this.updateRequestBody, getCreatedDoc);
      this.testDelete(getCreatedDoc);
    });
  }
}

export class TestWithReferences<TModel, TObject, TObjects> extends BaseTest<
  TModel,
  TObject
> {
  constructor(
    public model: Model<TModel>,
    public getRouteHandlers: () => {
      getOne: ({ params }: { params: { id: string } }) => Promise<Response>;
      getAll: () => Promise<Response>;
      addOne: (req: ApiRequest<TModel>) => Promise<Response>;
      updateOne: (
        req: ApiRequest<Partial<TModel>>,
        { params }: { params: { id: string } }
      ) => Promise<Response>;
      deleteOne: ({ params }: { params: { id: string } }) => Promise<Response>;
    },
    public testObject: TObject,
    public postRequestBody: Partial<TModel>,
    public updateRequestBody: Partial<TModel>,
    public updatedReferences:
      | Map<Model<TObjects[keyof TObjects]>, object>
      | object,
    public updateReferences: (
      updatedReferences: Map<Model<TObjects[keyof TObjects]>, object> | object,
      testObject: TObject,
      postRequestBody: Partial<TModel>,
      updateRequestBody: Partial<TModel>
    ) => void
  ) {
    super(
      model,
      getRouteHandlers,
      testObject,
      postRequestBody,
      updateRequestBody
    );
  }

  createReferencedObjects = async <
    TObjects extends Record<string, string | number>
  >(
    references:
      | Map<Model<TObjects[keyof TObjects]>, { _id: Types.ObjectId }>
      | object
  ) => {
    if (!(references instanceof Map) || references.size === 0) {
      return {};
    }
    await connect();
    const referencedObjects = new Map();
    try {
      for (const [model, objectToAdd] of references.entries()) {
        const createdDoc = await model.create(objectToAdd);
        referencedObjects.set(model, createdDoc._id);
      }
      await disconnect();
      return referencedObjects;
    } catch (err) {
      await disconnect();
      throw new e.DatabaseError(`Error Validating References: ${err}`);
    }
  };

  async createObject() {
    const referencedObjects = await this.createReferencedObjects(
      this.updatedReferences
    );
    this.updateReferences(
      referencedObjects,
      this.testObject,
      this.postRequestBody,
      this.updateRequestBody
    );

    await connect();
    const createdDoc = await this.model.create(this.testObject);
    await disconnect();
    return { createdDoc, referencedObjects };
  }
}
