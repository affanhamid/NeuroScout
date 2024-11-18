import { db } from "./db";
import * as schema from "../drizzle/schema";
import { type SchemaKeys } from "../drizzle/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export const addData = async (
  dataObj: InferInsertModel<typeof schema.data>,
  resultObj: InferInsertModel<typeof schema.result>,
) => {
  // Insert resultObj and retrieve the inserted ID
  const resultInsert = await db
    .insert(schema.result)
    .values(resultObj)
    .returning({ id: schema.result.id });

  if (!resultInsert[0]?.id) {
    throw new Error("Failed to insert result object");
  }

  const resultId = resultInsert[0].id;

  // Add the resultId to the dataObj
  dataObj.resultId = resultId;
  dataObj.timeOfData = new Date(dataObj.timeOfData);

  // Insert dataObj
  const dataInsert = await db.insert(schema.data).values(dataObj);

  return dataInsert;
};

export async function readInstructions(gameId: number) {
  const result = await db
    .select()
    .from(schema.instruction)
    .where(eq(schema.instruction.gameId, gameId));
  result.sort((a, b) => a.step - b.step);
  return result;
}

export async function readParams(gameId: number) {
  let table;
  switch (gameId) {
    case 1:
      table = schema.tntParam;
      break;
    case 2:
      table = schema.tntGlowParam;
      break;
    case 3:
      table = schema.tntStrobeParam;
      break;
    default:
      break;
  }
  const result =
    table &&
    (await db
      .select({
        game: schema.game,
        param: schema.param,
        paramValues: table,
      })
      .from(schema.game)
      .innerJoin(schema.param, eq(schema.game.id, schema.param.gameId))
      .innerJoin(table, eq(schema.param.id, table.paramId))
      .where(eq(schema.param.gameId, gameId)));
  return result;
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
