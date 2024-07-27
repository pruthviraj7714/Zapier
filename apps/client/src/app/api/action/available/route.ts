import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET(req: NextRequest) {
  try {
    const availableActions = await db.availableAction.findMany({});

    return NextResponse.json({
      availableActions,
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
