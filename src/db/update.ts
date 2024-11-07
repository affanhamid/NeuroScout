import { db } from "./db";
import * as schema from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function updateInUse(data: any, table: string) {
  const result = await db
    .update(schema[table as keyof typeof schema])
    .set(data)
    .where(eq(schema[table as keyof typeof schema].id, data.id));
  return result;
}
