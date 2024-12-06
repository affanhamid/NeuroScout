import { BaseAPI } from "@/lib/api/api";
import { GameModel, ResultModel, ResultType, PlayerModel } from "@/lib/db";
import { ApiRequest } from "@/types";

const api = new BaseAPI(ResultModel);

export async function GET(): Promise<Response> {
  return await api.getAll();
}

export async function POST(req: ApiRequest<ResultType>): Promise<Response> {
  const values = await req.json();
  const references = new Map();
  references.set(GameModel, values.gameId);
  references.set(PlayerModel, values.playerId);
  return await api.addOne(values, references);
}
