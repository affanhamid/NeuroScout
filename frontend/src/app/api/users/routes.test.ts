import * as routes from "./route";
import * as idRoutes from "./[id]/route";
import {
  OrganizationFields,
  OrganizationModel,
  UserFields,
  UserModel,
  UserType
} from "@/lib/db";
import { TestWithReferences } from "@/lib/util";
import { Model } from "mongoose";

const getRouteHandlers = () => ({
  getOne: idRoutes.GET,
  getAll: routes.GET,
  addOne: routes.POST,
  updateOne: idRoutes.PUT,
  deleteOne: idRoutes.DELETE
});

const testObject = {
  email: "test@gmail.com",
  password: "abcdefghijklmnop",
  role: "admin",
  organizationId: "1"
} as const;

const references = new Map();
references.set(OrganizationModel, { name: "test organization for users" });

const updateReferences = (
  updatedReferences: Map<Model<[OrganizationFields]>, object> | object,
  testObject: UserFields,
  postRequestBody: Partial<UserType>,
  updateRequestBody: Partial<UserType>
) => {
  if (!(references instanceof Map) || references.size === 0) {
    return;
  }

  const organizationRef = updatedReferences as Map<any, any>;
  testObject.organizationId = organizationRef.get(OrganizationModel)?._id;
  postRequestBody.organizationId = organizationRef.get(OrganizationModel)?._id;
  updateRequestBody.organizationId =
    organizationRef.get(OrganizationModel)?._id;
};

const test = new TestWithReferences(
  UserModel,
  getRouteHandlers,
  testObject,
  testObject,
  testObject,
  references,
  updateReferences
);

test.runTests();
