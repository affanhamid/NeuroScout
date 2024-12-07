import { BaseAPI } from "@/lib/api/api";
import { PlayerModel, PlayerType, OrganizationModel } from "@/lib/db";
import { ApiRequest } from "@/types";

const api = new BaseAPI(PlayerModel);

export async function GET(): Promise<Response> {
  return await api.getAll();
}

export async function POST(req: ApiRequest<PlayerType>): Promise<Response> {
  const values = await req.json();
  const references = new Map();
  references.set(OrganizationModel, values.organizationId);
  return await api.addOne(values, references);
}
