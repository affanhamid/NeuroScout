import { OrganizationModel, OrganizationType } from "@/lib/db";
import * as routes from "./routes";
import * as idRoutes from "./[id]/routes";
import { BaseTest } from "@/lib/util";

const getRouteHandlers = () => ({
  getOne: idRoutes.GET,
  getAll: routes.GET,
  addOne: routes.POST,
  updateOne: idRoutes.PUT,
  deleteOne: idRoutes.DELETE
});

const test = new BaseTest<OrganizationType, { name: string }>(
  OrganizationModel,
  getRouteHandlers,
  { name: "Test Organization" }
);
test.runTests(
  { name: "Test Document POST" },
  { name: "Update Organization PUT" }
);
