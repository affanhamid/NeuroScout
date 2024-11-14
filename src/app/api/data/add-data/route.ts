import { NextRequest, NextResponse } from "next/server";
import { create } from "@/db";
import { InferInsertModel } from "drizzle-orm";
import { TNT_DATA } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  try {
    const data: InferInsertModel<typeof TNT_DATA> = await req.json();
    const tableName = req.nextUrl.searchParams.get("table");

    const result = tableName!.includes("DATA")
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
