import { GameObservationModel, GameObservationType } from "@/lib/db";
import * as routes from "./routes";
import * as idRoutes from "./[id]/routes";
import { BaseTest } from "@/lib/util";
import { Types } from "mongoose";

const getRouteHandlers = () => ({
  getOne: idRoutes.GET,
  getAll: routes.GET,
  addOne: routes.POST,
  updateOne: idRoutes.PUT,
  deleteOne: idRoutes.DELETE
});

const testObject = {
  playerId: "1",
  gameId: "2",
  data: { testData: "testData" }
};

const test = new BaseTest<
  GameObservationType,
  { playerId: string; gameId: string; data: object }
>(GameObservationModel, getRouteHandlers, testObject);

test.runTests(testObject, testObject);
