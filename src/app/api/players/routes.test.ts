import {
  OrganizationFields,
  OrganizationModel,
  PlayerFields,
  PlayerModel,
  PlayerType
} from "@/lib/db";
import * as routes from "./routes";
import * as idRoutes from "./[id]/routes";
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

const test = new TestWithReferences(
  PlayerModel,
  getRouteHandlers,
  {
    age: 1,
    position: "striker",
    organizationId: ""
  },
  { age: 20, position: "striker", organizationId: "" },
  { age: 3, position: "goalkeeper", organizationId: "" },
  references,
  updateReferences
);

test.runTests();
