import { update } from "@/db";
import { TNT_PARAMS } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data: InferSelectModel<typeof TNT_PARAMS> = await req.json();
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
      { status: 500 }
    );
  }
}
