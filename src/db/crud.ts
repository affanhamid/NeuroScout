import { db } from "./db";
import * as schema from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const create = async <TData extends { id?: number }>(
  data: TData,
  tableName: string,
) => {
  const result = await db
    .insert(schema[tableName as keyof typeof schema])
    .values(data);
  return result;
};

export async function read(tableName: string) {
  const result = await db
    .select()
    .from(schema[tableName as keyof typeof schema]);
  return result;
}

export async function getTables() {
  const tables = await db.execute(`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';
`);
  return tables.rows.map((row) => row.table_name);
}

export async function update<TData extends { id: number }>(
  data: TData,
  table: string,
) {
  const result = await db
    .update(schema[table as keyof typeof schema])
    .set(data)
    .where(eq(schema[table as keyof typeof schema].id, data.id));
  return result;
}

export async function deleteRow(table: string, id: number) {
  const result = await db
    .delete(schema[table as keyof typeof schema])
    .where(eq(schema[table as keyof typeof schema].id, id));
  return result;
}
