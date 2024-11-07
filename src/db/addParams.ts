import { db } from "./db";
import * as schema from "../drizzle/schema";
import { TNT_Params } from "./Types";

export async function addTNTParams(data: TNT_Params, tableName: string) {
  const result = await db
    .insert(schema[tableName as keyof typeof schema])
    .values(data);
  return result;
}
