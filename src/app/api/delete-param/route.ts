import { NextRequest, NextResponse } from "next/server";
import { deleteRow } from "@/db";

export async function DELETE(req: NextRequest) {
  // Access query params using `searchParams`
  const table = req.nextUrl.searchParams.get("table");
  const id = req.nextUrl.searchParams.get("id");
  console.log(table, id);

  try {
    const result = await deleteRow(table as string, parseInt(id as string));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
