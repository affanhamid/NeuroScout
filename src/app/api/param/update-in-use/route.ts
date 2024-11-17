import { update } from "@/db";
import { PARAM } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data: InferSelectModel<typeof PARAM> = await req.json();
    const table = req.nextUrl.searchParams.get("table");
    update(data, table as string);

    return NextResponse.json({
      success: true,
      message: "Data added successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}
