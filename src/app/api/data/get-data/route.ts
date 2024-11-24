import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/db";

export async function GET(req: NextRequest) {
  try {
    const result = await readData();
    console.log(result[0]);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
