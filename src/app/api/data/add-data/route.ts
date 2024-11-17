import { NextRequest, NextResponse } from "next/server";
import { addData } from "@/db";
import { InferInsertModel } from "drizzle-orm";
import { data, result } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  try {
    const reqJson = await req.json();
    const dataObj: InferInsertModel<typeof data> = reqJson.data;
    const resultObj: InferInsertModel<typeof result> = reqJson.result;

    addData(dataObj, resultObj);

    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}
