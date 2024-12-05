import { UserModel, UserType } from "@/lib/db";
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

const testObject = {
  email: "test@gmail.com",
  password: "abcdef",
  role: "admin",
  organizationId: "1"
} as const;

const test = new BaseTest<
  UserType,
  {
    email: string;
    password: string;
    role: "admin" | "user" | "manager";
    organizationId: string;
  }
>(UserModel, getRouteHandlers, testObject);
test.runTests(testObject, testObject);
