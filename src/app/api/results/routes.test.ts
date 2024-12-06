import * as routes from "./routes";
import * as idRoutes from "./[id]/routes";
import {
  GameFields,
  GameModel,
  ResultType,
  ResultFields,
  ResultModel,
  PlayerFields,
  PlayerModel
} from "@/lib/db";
import { TestWithReferences } from "@/lib/util";
import { Model, Types } from "mongoose";

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
  metrics: { testData: "testData" },
  resultDate: new Date()
};

const references = new Map();
references.set(PlayerModel, {
  age: 1,
  position: "striker",
  organizationId: "67537540ab5e87f35d194604"
});
references.set(GameModel, {
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
});

const updateReferences = (
  updatedReferences: Map<Model<[PlayerFields, GameFields]>, object> | object,
  testObject: ResultFields,
  postRequestBody: Partial<ResultType>,
  updateRequestBody: Partial<ResultType>
) => {
  if (!(references instanceof Map) || references.size === 0) {
    return;
  }

  const updatedRef = updatedReferences as Map<any, any>;

  testObject.playerId = updatedRef?.get(PlayerModel)._id;
  postRequestBody.playerId = updatedRef?.get(PlayerModel)._id;
  updateRequestBody.playerId = updatedRef?.get(PlayerModel)._id;
  testObject.gameId = updatedRef?.get(GameModel)._id;
  postRequestBody.gameId = updatedRef?.get(GameModel)._id;
  updateRequestBody.gameId = updatedRef?.get(GameModel)._id;
};

const test = new TestWithReferences(
  ResultModel,
  getRouteHandlers,
  testObject,
  testObject,
  testObject,
  references,
  updateReferences
);

test.runTests();
