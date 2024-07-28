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

    if (!triggerId || !actions || !Array.isArray(actions) || actions.length === 0) {
      return NextResponse.json(
        {
          message: "Invalid input data",
        },
        { status: 400 }
      );
    }

    const zap = await db.$transaction(async (tx) => {
      // Create the Zap
      const newZap = await tx.zap.create({
        data: {
          userId: Number(userId), // Assuming userId is an integer
          triggerId
        },
      });

      // Create the Trigger and associate with the Zap
      const newTrigger = await tx.trigger.create({
        data: {
          triggerId,
          zapId: newZap.id,
        },
      });

      // Create the Actions and associate with the Zap
      const newActions = await Promise.all(
        actions.map((action, index) => 
          tx.action.create({
            data: {
              zapId: newZap.id,
              actionId: action.id,
              sortingOrder: index ?? 0, // Assuming you want to set sortingOrder
              metadata: action.metadata ?? {}, // Assuming metadata is provided in action
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
