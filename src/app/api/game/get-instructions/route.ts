import { NextRequest, NextResponse } from "next/server";
import { readInstructions } from "@/db";

export async function GET(req: NextRequest) {
  try {
    const gameId = req.nextUrl.searchParams.get("game_id");

    if (!gameId || isNaN(parseInt(gameId))) {
      return NextResponse.json("invalid game id");
    }

    const result = await readInstructions(parseInt(gameId!));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}
