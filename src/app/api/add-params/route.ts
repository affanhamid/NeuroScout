import { NextResponse, NextRequest } from "next/server";
import { addTNTParams } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const table = req.nextUrl.searchParams.get("table");
    console.log(data);
    addTNTParams(data, table as string);

    return NextResponse.json({
      success: true,
      message: "Data added successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
