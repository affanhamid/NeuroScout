import { NextResponse } from "next/server";
import { getTables } from "@/db";

export async function GET() {
  try {
    const result = await getTables();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
