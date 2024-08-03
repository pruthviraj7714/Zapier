import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({
        message: "No User found!",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: parseInt(session.user.id),
      },
      include: {
        zaps: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not fouond!",
      });
    }

    return NextResponse.json({
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
