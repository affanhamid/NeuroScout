import { BaseAPI } from "@/lib/api/api";
import { PlayerModel } from "@/lib/db";

const api = new BaseAPI(PlayerModel);
export const GET = (
  request: Request,
  {
    params
  }: {
    params: { id: string };
  }
): Promise<Response> => {
  return api.getByField({ organizationId: params.id });
};
