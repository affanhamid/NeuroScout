import { connect, disconnect } from "../db";
import { Model } from "mongoose";
import { ApiRequest } from "@/types/api";

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
    public testObject: TObject
  ) {}

  async testGetAll() {
    it("should return all documents with status 200", async () => {
      await connect();
      await this.model.create(this.testObject);
      await disconnect();

      const { getAll } = this.getRouteHandlers();
      const response = await getAll();
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toBeTruthy();
      expect(Array.isArray(body.data)).toBe(true);

      // Cleanup
      await connect();
      for (const doc of body.data) {
        await this.model.deleteOne({ _id: doc._id });
      }
      await disconnect();
    });
  }

  async testGetOne() {
    it("should return a single document with status 200", async () => {
      await connect();
      const createdDoc = await this.model.create(this.testObject);
      await disconnect();

      const { getOne } = this.getRouteHandlers();
      const response = await getOne({
        params: { id: createdDoc._id as string }
      });
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toBeTruthy();

      // Cleanup
      await connect();
      await this.model.deleteOne({ _id: createdDoc._id });
      await disconnect();
    });
  }

  async testPut(requestBody: Partial<TModel>) {
    it("should update an existing document with status 200", async () => {
      await connect();
      const createdDoc = await this.model.create(this.testObject);
      await disconnect();

      const { updateOne } = this.getRouteHandlers();
      const reqBody = {
        json: async () => requestBody
      } as ApiRequest<Partial<TModel>>;

      const response = await updateOne(reqBody, {
        params: { id: createdDoc._id as string }
      });
      const body = await response.json();

      expect(response.status).toBe(200);

      // Cleanup
      await connect();
      await this.model.deleteOne({ _id: createdDoc._id });
      await disconnect();
    });
  }
  async testPost(postObject: Partial<TModel>) {
    it("should create a new document with status 201", async () => {
      const { addOne } = this.getRouteHandlers();

      const reqBody = {
        json: async () => postObject
      } as ApiRequest<TModel>;

      const response = await addOne(reqBody);
      const body = await response.json();

      expect(response.status).toBe(201);

      // Cleanup
      await connect();
      await this.model.deleteOne({ _id: body.data._id });
      await disconnect();
    });
  }
  async testDelete() {
    it("should delete a document with status 200", async () => {
      await connect();
      const createdDoc = await this.model.create(this.testObject);
      await disconnect();

      const { deleteOne } = this.getRouteHandlers();
      const response = await deleteOne({
        params: { id: createdDoc._id as string }
      });

      const body = await response.json();

      expect(response.status).toBe(200);

      // Verify Deletion
      await connect();
      const deletedDoc = await this.model.findById(createdDoc._id);
      expect(deletedDoc).toBeNull();
      await disconnect();
    });
  }

  async runTests(
    postRequestBody: Partial<TModel>,
    updateRequestBody: Partial<TModel>
  ) {
    describe(`${this.model.modelName} API Tests`, () => {
      // Test for GET (getAll)
      this.testGetAll();
      // Test for GET (getOne)
      this.testGetOne();
      // Test for POST
      this.testPost(postRequestBody);
      // Test for PUT (updateOne)
      this.testPut(updateRequestBody);
      // Test for DELETE
      this.testDelete();
    });
  }
}
