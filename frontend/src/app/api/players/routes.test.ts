import {
  OrganizationFields,
  OrganizationModel,
  PlayerFields,
  PlayerModel,
  PlayerType
} from "@/lib/db";
import * as routes from "./route";
import * as idRoutes from "./[id]/route";
import { TestWithReferences } from "@/lib/util";
import { Model } from "mongoose";

const getRouteHandlers = () => ({
  getOne: idRoutes.GET,
  getAll: routes.GET,
  addOne: routes.POST,
  updateOne: idRoutes.PUT,
  deleteOne: idRoutes.DELETE
});

const references = new Map();
references.set(OrganizationModel, { name: "test organization for players" });

const updateReferences = (
  updatedReferences: Map<Model<[OrganizationFields]>, object> | object,
  testObject: PlayerFields,
  postRequestBody: Partial<PlayerType>,
  updateRequestBody: Partial<PlayerType>
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

const testObject = {
  firstName: "first name",
  lastName: "last name",
  age: 12,
  position: "striker",
  organizationId: ""
};

const test = new TestWithReferences(
  PlayerModel,
  getRouteHandlers,
  testObject,
  testObject,
  testObject,
  references,
  updateReferences
);

test.runTests();
