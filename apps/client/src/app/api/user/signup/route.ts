import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
import { signUpSchema } from "@/types/zodTypes";

export async function POST(req: NextRequest) {
  try {
    const parsedBody = signUpSchema.safeParse(await req.json());

    if(!parsedBody.success) {
      return NextResponse.json({
        message : "Invalid Credentials!"
      }, {status : 301})
    }

    const { name, email, password} = parsedBody.data;

    const isNameOrEmailExist = await db.user.findFirst({
      where: {
        OR: [{ name: name }, { email: email }],
      },
    });

    if (isNameOrEmailExist) {
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Account Successfully Created",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      {
        message: "Error signing up user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
