import { OrganizationModel } from "@/lib/db";
import * as routes from "./route";
import * as idRoutes from "./[id]/route";
import { BaseTest } from "@/lib/util";

const getRouteHandlers = () => ({
  getOne: idRoutes.GET,
  getAll: routes.GET,
  addOne: routes.POST,
  updateOne: idRoutes.PUT,
  deleteOne: idRoutes.DELETE
});

const test = new BaseTest(
  OrganizationModel,
  getRouteHandlers,
  { name: "Test Organization" },
  { name: "Test Document POST" },
  { name: "Update Organization PUT" }
);
test.runTests();
