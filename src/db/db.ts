import "@/drizzle/envConfig";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { createPool } from "@vercel/postgres";
import * as schema from "../drizzle/schema";

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error("POSTGRES_URL environment variable is not set");
}
const client = createPool({ connectionString });
export const db = drizzle(client, { schema });
