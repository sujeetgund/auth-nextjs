import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // check if  user exists
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // create token
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // create a response object
    const res = NextResponse.json(
      { message: "Login successful", success: true, user: user.username },
      { status: 200 }
    );

    // set cookie
    res.cookies.set("token", token, {
      httpOnly: true,
    });

    // return response
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
