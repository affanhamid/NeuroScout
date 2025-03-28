import { BaseAPI } from "@/lib/api/api";
import { GameObservationModel } from "@/lib/db";

const api = new BaseAPI(GameObservationModel);
export const GET = (
  request: Request,
  {
    params
  }: {
    params: { id: string };
  }
): Promise<Response> => {
  return api.getByField({ playerId: params.id });
};
