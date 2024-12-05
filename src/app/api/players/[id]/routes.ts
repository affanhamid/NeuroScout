import { PlayerModel, PlayerType } from "@/lib/db";
import { BaseAPI } from "@/lib/api/api";
import { ApiRequest } from "@/types";

const PlayerAPI = new BaseAPI(PlayerModel);

export const GET = ({
  params
}: {
  params: { id: string };
}): Promise<Response> => {
  return PlayerAPI.getOne(params.id);
};

export const PUT = async (
  req: ApiRequest<Partial<PlayerType>>,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const updateData = await req.json();
  return PlayerAPI.updateOne(params.id, updateData);
};

export const DELETE = ({
  params
}: {
  params: { id: string };
}): Promise<Response> => {
  return PlayerAPI.deleteOne(params.id);
};
