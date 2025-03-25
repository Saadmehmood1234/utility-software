import CustomerData from "@/components/CustomerData";
import { dbConnect } from "@/lib/dbConnect";
import { CustomerModel } from "@/model/Customer";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const customerData = await CustomerModel.find().lean();
    return NextResponse.json(
      {
        success: true,
        data: customerData,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
