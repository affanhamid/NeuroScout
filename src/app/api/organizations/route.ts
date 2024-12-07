import { BaseAPI } from "@/lib/api/api";
import { OrganizationModel, OrganizationType } from "@/lib/db";
import { ApiRequest } from "@/types";

const api = new BaseAPI(OrganizationModel);

export async function GET(): Promise<Response> {
  return await api.getAll();
}

export async function POST(
  req: ApiRequest<OrganizationType>
): Promise<Response> {
  const values = await req.json();
  return await api.addOne(values);
}
