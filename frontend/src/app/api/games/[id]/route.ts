import { GameModel, GameType } from "@/lib/db";
import { BaseAPI } from "@/lib/api/api";
import { ApiRequest } from "@/types";

const api = new BaseAPI(GameModel);

export const GET = async (
  request: Request,
  {
    params
  }: {
    params: { id: string };
  }
): Promise<Response> => {
  return api.getOne(params.id);
};

export const PUT = async (
  req: ApiRequest<Partial<GameType>>,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const updateData = await req.json();
  return api.updateOne(params.id, updateData);
};

export const DELETE = (
  request: Request,
  {
    params
  }: {
    params: { id: string };
  }
): Promise<Response> => {
  return api.deleteOne(params.id);
};
