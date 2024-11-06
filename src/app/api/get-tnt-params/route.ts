import { NextResponse } from "next/server";
import { getTNTParams } from "@/db/db";

export async function GET() {
  try {
    const result = await getTNTParams();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
