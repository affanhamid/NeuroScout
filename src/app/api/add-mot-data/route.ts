import { NextResponse } from "next/server";
import { addMOTData, addMOTFlashData, addMOTStrobeData } from "@/db/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tableName = data.table;
    delete data.table;

    if (tableName === "MOT_STROBE_DATA") {
      await addMOTStrobeData(data);
    } else if (tableName === "MOT_FLASH_DATA") {
      await addMOTFlashData(data);
    } else if (tableName === "MOT_DATA") {
      await addMOTData(data);
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
