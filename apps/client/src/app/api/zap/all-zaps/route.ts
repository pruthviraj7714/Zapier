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

    const zaps = await db.zap.findMany({
      where: {
        userId: parseInt(session.user.id, 10),
      },
      include : {
        trigger : {
          include : {
            type : true
          }
        },
        actions : {
          include : {
            type : true
          }
        },
      }
    });

    if (!zaps) {
      return NextResponse.json(
        {
          message: "No Zaps Found!",
        },
        { status: 404 } 
      );
    }

    return NextResponse.json(
      {
        zaps
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
