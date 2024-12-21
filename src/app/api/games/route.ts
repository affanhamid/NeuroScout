import { BaseAPI } from "@/lib/api/api";
import { GameModel, GameType } from "@/lib/db";
import { ApiRequest } from "@/types";

const api = new BaseAPI(GameModel);

export async function GET(): Promise<Response> {
  return await api.getAll();
}

export async function POST(req: ApiRequest<GameType>): Promise<Response> {
  const values = await req.json();
  return await api.addOne(values);
}
