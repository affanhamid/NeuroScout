import { db } from "./db";
import * as schema from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function deleteRow(table: string, id: number) {
  const result = await db
    .delete(schema[table as keyof typeof schema])
    .where(eq(schema[table as keyof typeof schema].id, id));
  return result;
}
