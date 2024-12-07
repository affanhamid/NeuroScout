import { GameModel, GameType } from "@/lib/db";
import * as routes from "./route";
import * as idRoutes from "./[id]/route";
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
  name: "Test Game",
  description: "This is a test game",
  image:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newyorker.com%2Fnews%2Fdaily-comment%2Fmonkey-see-monkey-click&psig=AOvVaw3svzCM2koDD339l0-WpbGn&ust=1733520086039000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDs-NjHkYoDFQAAAAAdAAAAABAE",
  parameters: new Types.DocumentArray<{ id: string; data: object }>([
    { id: "13", data: { test: "test data" } }
  ]),
  scoringMechanism: [
    { id: "1", description: "test scoring mechanism", function: "() => {}" }
  ]
};

const test = new BaseTest<GameType, { name: string }>(
  GameModel,
  getRouteHandlers,
  testObject,
  testObject,
  testObject
);

test.runTests();
