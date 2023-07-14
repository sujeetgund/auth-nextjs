import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User Found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
