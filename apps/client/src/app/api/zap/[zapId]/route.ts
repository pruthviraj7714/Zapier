import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { zapId: string } }
) {
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

    const zap = await db.zap.findUnique({
      where: {
        id: params.zapId,
        userId: parseInt(session.user.id),
      },
    });

    if (!zap) {
      return NextResponse.json(
        {
          message: "No Zap Found with this id",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      zap,
    });
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      {
        message: "Error fetching zap",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
