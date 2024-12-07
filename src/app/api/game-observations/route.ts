import { BaseAPI } from "@/lib/api/api";
import {
  GameModel,
  GameObservationModel,
  GameObservationType,
  PlayerModel
} from "@/lib/db";
import { ApiRequest } from "@/types";

const api = new BaseAPI(GameObservationModel);

export async function GET(): Promise<Response> {
  return await api.getAll();
}

export async function POST(
  req: ApiRequest<GameObservationType>
): Promise<Response> {
  const values = await req.json();
  const references = new Map();
  references.set(GameModel, values.gameId);
  references.set(PlayerModel, values.playerId);
  return await api.addOne(values, references);
}
