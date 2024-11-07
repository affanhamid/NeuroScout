import { db } from "./db";
import * as schema from "../drizzle/schema";

export async function getTableValues(tableName: string) {
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
