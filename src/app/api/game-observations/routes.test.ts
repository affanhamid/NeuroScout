import {
  GameFields,
  GameModel,
  GameObservationFields,
  GameObservationModel,
  GameObservationType,
  PlayerFields,
  PlayerModel
} from "@/lib/db";
import * as routes from "./route";
import * as idRoutes from "./[id]/route";
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
  data: { testData: "testData" }
};

const references = new Map();
references.set(PlayerModel, {
  firstName: "first name",
  lastName: "last name",
  age: 11,
  position: "striker",
  organizationId: "67540288ab5e87f35d194609"
});
references.set(GameModel, {
  name: "Test Game",
  description: "This is a test game",
  image:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newyorker.com%2Fnews%2Fdaily-comment%2Fmonkey-see-monkey-click&psig=AOvVaw3svzCM2koDD339l0-WpbGn&ust=1733520086039000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDs-NjHkYoDFQAAAAAdAAAAABAE",
  instructions: new Types.DocumentArray<{ step: number; image: string }>([
    { step: 1, image: "https://www/google/com" }
  ]),
  parameters: new Types.DocumentArray<{ id: string; data: object }>([
    { id: "13", data: { test: "test data" } }
  ]),
  scoringMechanism: [
    { id: "1", description: "test scoring mechanism", function: "() => {}" }
  ]
});

const updateReferences = (
  updatedReferences: Map<Model<[PlayerFields, GameFields]>, object> | object,
  testObject: GameObservationFields,
  postRequestBody: Partial<GameObservationType>,
  updateRequestBody: Partial<GameObservationType>
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
  GameObservationModel,
  getRouteHandlers,
  testObject,
  testObject,
  testObject,
  references,
  updateReferences
);

test.runTests();
