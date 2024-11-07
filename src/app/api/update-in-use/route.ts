import { NextResponse, NextRequest } from "next/server";
import { updateInUse } from "@/db";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const table = req.nextUrl.searchParams.get("table");
    updateInUse(data, table as string);

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
