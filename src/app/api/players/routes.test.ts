import { PlayerModel, PlayerType } from "@/lib/db";
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

const test = new BaseTest<
  PlayerType,
  { age: number; position: string; organizationId: string }
>(PlayerModel, getRouteHandlers, {
  age: 1,
  position: "striker",
  organizationId: "67518b8eab5e87f35d194601"
});

test.runTests(
  { age: 20, position: "striker", organizationId: "67518b8eab5e87f35d194601" },
  { age: 3, position: "goalkeeper", organizationId: "67518b8eab5e87f35d194601" }
);
