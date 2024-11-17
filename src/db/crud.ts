import { db } from "./db";
import * as schema from "../drizzle/schema";
import { type SchemaKeys } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const create = async <TData extends { id?: number }>(
  data: TData,
  tableName: SchemaKeys,
) => {
  const result = await db.insert(schema[tableName]).values(data);
  return result;
};

export async function readInstructions(gameId: number) {
  const result = await db
    .select()
    .from(schema.instruction)
    .where(eq(schema.instruction.gameId, gameId));
  return result;
}

export async function readParams(gameId: number) {
  switch (gameId) {
    case 1:
      const result = await db
        .select({
          game: schema.game,
          param: schema.param,
          tntParam: schema.tntParam,
        })
        .from(schema.game)
        .innerJoin(schema.param, eq(schema.game.id, schema.param.gameId))
        .innerJoin(
          schema.tntParam,
          eq(schema.param.id, schema.tntParam.paramId),
        )
        .where(eq(schema.param.gameId, gameId));
      const flattenedResult = result.map((row) => ({
        ...row.game,
        ...row.param,
        ...row.tntParam,
      }));
      return flattenedResult;

    default:
      break;
  }
}
export async function readAll(tableName: SchemaKeys) {
  const table = schema[tableName];
  const result = await db.select().from(table);
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
    .where(eq(schema[table as keyof typeof schema].inumberd, data.id));
  return result;
}

export async function deleteRow(table: string, id: number) {
  const result = await db
    .delete(schema[table as keyof typeof schema])
    .where(eq(schema[table as keyof typeof schema].id, id));
  return result;
}
