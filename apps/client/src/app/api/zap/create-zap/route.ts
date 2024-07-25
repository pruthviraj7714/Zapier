import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "No User found!",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const { triggerId, actions } = body;

    // Validate required fields
    if (
      !triggerId ||
      !actions ||
      !Array.isArray(actions) ||
      actions.length === 0
    ) {
      return NextResponse.json(
        {
          message: "Invalid input data",
        },
        { status: 400 }
      );
    }

    // Create the new zap
    const newZap = await db.zap.create({
      data: {
        triggerId,
        userId: parseInt(userId),
        actions: {
          create: actions,
        },
      },
      include: {
        trigger: true,
        actions: true,
      },
    });

    return NextResponse.json(newZap, { status: 201 });
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      {
        message: "Error creating zap",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
