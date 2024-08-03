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
    const { triggerId, actions, zapName } = body;

    if (!zapName) {
      return NextResponse.json(
        {
          message: "Please Give Name to your zap",
        },
        { status: 400 }
      );
    }

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

    const zap = await db.$transaction(async (tx: any) => {
      const newZap = await tx.zap.create({
        data: {
          userId: Number(userId),
          triggerId,
          name: zapName,
        },
      });

      const newTrigger = await tx.trigger.create({
        data: {
          triggerId,
          zapId: newZap.id,
        },
      });

      const newActions = await Promise.all(
        actions.map((action, index) =>
          tx.action.create({
            data: {
              zapId: newZap.id,
              actionId: action.id,
              sortingOrder: index ?? 0,
              metadata: action.metadata ?? {},
            },
          })
        )
      );

      return {
        ...newZap,
        trigger: newTrigger,
        actions: newActions,
      };
    });

    return NextResponse.json(zap, { status: 201 });
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
