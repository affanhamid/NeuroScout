import { PlayerModel, PlayerType } from "@/lib/db";
import * as playerRoutes from "./routes";
import * as playerIdRoutes from "./[id]/routes";
import { BaseTest } from "@/lib/util";

const getRouteHandlers = () => ({
  getOne: playerIdRoutes.GET,
  getAll: playerRoutes.GET,
  addOne: playerRoutes.POST,
  updateOne: playerIdRoutes.PUT,
  deleteOne: playerIdRoutes.DELETE
});

const PlayerTest = new BaseTest<
  PlayerType,
  { age: number; position: string; organizationId: string }
>(PlayerModel, getRouteHandlers, {
  age: 1,
  position: "striker",
  organizationId: "67518b8eab5e87f35d194601"
});

PlayerTest.runTests(
  { age: 20, position: "striker", organizationId: "67518b8eab5e87f35d194601" },
  { age: 3, position: "goalkeeper", organizationId: "67518b8eab5e87f35d194601" }
);
