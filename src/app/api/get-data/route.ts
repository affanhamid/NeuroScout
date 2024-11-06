import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/db/db";

export async function GET(req: NextRequest) {
  // Access query params using `searchParams`
  const tableName = req.nextUrl.searchParams.get("dataTable") || "TNT_DATA";

  try {
    const result = await getData(tableName);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
