"use server";
import { Admin } from "@/model/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();
    if (!data.name || !data.username || !data.password) {
      return NextResponse.json({ success: false, message: "All fields are required" },{status:400})
    }

    const { name, username, password } = data;
    console.log("User username:", username, "User name:", name);

    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" },{status:400})
    }

    const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
      name
    )}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name,
      username,
      image: profilePicture,
      password: hashedPassword,
      profilePicture,
    });

    return NextResponse.json({ success: true, message: "Account created successfully" },{status:200})
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Server error, please try again" },{status:500})
  }
};
