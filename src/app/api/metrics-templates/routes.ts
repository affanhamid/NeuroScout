import { BaseAPI } from "@/lib/api/api";
import { GameModel, MetricsTemplateModel, MetricsTemplateType } from "@/lib/db";
import { ApiRequest } from "@/types";

const api = new BaseAPI(MetricsTemplateModel);

export async function GET(): Promise<Response> {
  return await api.getAll();
}

export async function POST(
  req: ApiRequest<MetricsTemplateType>
): Promise<Response> {
  const values = await req.json();
  const references = new Map();
  references.set(GameModel, values.gameId);
  return await api.addOne(values, references);
}
