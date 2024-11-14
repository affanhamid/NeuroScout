import { NextResponse, NextRequest } from "next/server";
import { create } from "@/db";
import { InferInsertModel } from "drizzle-orm";
import { TNT_PARAMS } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  try {
    const data: InferInsertModel<typeof TNT_PARAMS> = await req.json();
    const tableName = req.nextUrl.searchParams.get("table");
    const result = tableName!.includes("PARAMS")
      ? await create(data, tableName!)
      : "Invalid table Name";

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
