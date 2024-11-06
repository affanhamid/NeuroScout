import { NextResponse } from "next/server";
import { getTNTFlashParams } from "@/db/db";

export async function GET() {
  try {
    const result = await getTNTFlashParams();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
