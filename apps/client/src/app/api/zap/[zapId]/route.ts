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
        zapRuns : true
      }
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


export async function DELETE(
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

    const userId = parseInt(session.user.id);

    const zap = await db.zap.findFirst({
      where: {
        id: params.zapId,
        userId,
      },
    });

    if (!zap) {
      return NextResponse.json(
        {
          message: "No Zap found with this id for the user",
        },
        { status: 404 }
      );
    }

    await db.$transaction(async (tx) => {
      await tx.zapRun.deleteMany({
        where : {
          zapId : params.zapId
        }
      })

      await tx.trigger.deleteMany({
        where: {
          zapId: params.zapId,
        },
      });

      await tx.action.deleteMany({
        where: {
          zapId: params.zapId,
        },
      });

      await tx.zap.delete({
        where: {
          id: params.zapId,
        },
      });
    });

    return NextResponse.json({
      message: "Zap deleted successfully",
    });
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      {
        message: "Error deleting zap",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
