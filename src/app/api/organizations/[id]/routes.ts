import { OrganizationModel, OrganizationType } from "@/lib/db";
import { BaseAPI } from "@/lib/api/api";
import { ApiRequest } from "@/types";

const OrganizationAPI = new BaseAPI(OrganizationModel);

export const GET = ({
  params
}: {
  params: { id: string };
}): Promise<Response> => {
  return OrganizationAPI.getOne(params.id);
};

export const PUT = async (
  req: ApiRequest<Partial<OrganizationType>>,
  { params }: { params: { id: string } }
): Promise<Response> => {
  const updateData = await req.json();
  return OrganizationAPI.updateOne(params.id, updateData);
};

export const DELETE = ({
  params
}: {
  params: { id: string };
}): Promise<Response> => {
  return OrganizationAPI.deleteOne(params.id);
};
