import { BaseAPI } from "@/lib/api/api";
import { OrganizationModel, OrganizationType } from "@/lib/db";
import { ApiRequest, CreateOrganizationRequest } from "@/types";

const OrganizationAPI = new BaseAPI<OrganizationType>(OrganizationModel);

export async function GET(): Promise<Response> {
  return await OrganizationAPI.getAll();
}

export async function POST(
  req: ApiRequest<OrganizationType>
): Promise<Response> {
  const values = await req.json();
  return await OrganizationAPI.addOne(values);
}
