import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET(req: NextRequest) {
  try {
    const availableTriggers = await db.availableTrigger.findMany({});

    return NextResponse.json({
      availableTriggers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error fetching user data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
