import { NextRequest, NextResponse } from "next/server";
import { readParams } from "@/db";

export async function GET(req: NextRequest) {
  try {
    const gameId = req.nextUrl.searchParams.get("gameId");

    const result = await readParams(parseInt(gameId!));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}
