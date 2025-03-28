import { PlayerModel, OrganizationModel, PlayerType } from "@/lib/db";
import { BaseAPI } from "@/lib/api/api";
import { ApiRequest } from "@/types";

const api = new BaseAPI(PlayerModel);

export const GET = ({
  params
}: {
  params: { id: string };
}): Promise<Response> => {
  return api.getOne(params.id);
};

export const PUT = async (
  req: ApiRequest<Partial<PlayerType>>,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const updateData = await req.json();

  const references = new Map();
  references.set(OrganizationModel, updateData.organizationId);

  return api.updateOne(params.id, updateData, references);
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
