import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET(req: NextRequest) {
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

    const user = await db.user.findUnique({
      where: {
        id: parseInt(session.user.id, 10),
      },
      select: {
        zaps: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found!",
        },
        { status: 404 } 
      );
    }

    return NextResponse.json(
      {
        zaps: user.zaps,
      },
      { status: 200 } 
    );
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      {
        message: "Error fetching user data",
        error: error.message,
      },
      { status: 500 } 
    );
  }
}
