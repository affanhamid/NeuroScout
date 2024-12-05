import { OrganizationModel, OrganizationType } from "@/lib/db";
import * as organizationRoutes from "./routes";
import * as organizationIdRoutes from "./[id]/routes";
import { BaseTest } from "@/lib/util";

const getRouteHandlers = () => ({
  getOne: organizationIdRoutes.GET,
  getAll: organizationRoutes.GET,
  addOne: organizationRoutes.POST,
  updateOne: organizationIdRoutes.PUT,
  deleteOne: organizationIdRoutes.DELETE
});

const OrganizationTest = new BaseTest<OrganizationType, { name: string }>(
  OrganizationModel,
  getRouteHandlers,
  { name: "Test Organization" }
);
OrganizationTest.runTests(
  { name: "Test Document POST" },
  { name: "Update Organization PUT" }
);
