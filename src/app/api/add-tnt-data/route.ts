import { NextResponse } from "next/server";
import { addTNTData, addTNTFlashData, addTNTStrobeData } from "@/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tableName = data.table;
    delete data.table;

    if (tableName === "TNT_STROBE_DATA") {
      await addTNTStrobeData(data);
    } else if (tableName === "TNT_FLASH_DATA") {
      await addTNTFlashData(data);
    } else if (tableName === "TNT_DATA") {
      await addTNTData(data);
    }

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
