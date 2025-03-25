import { dbConnect } from "@/lib/dbConnect";
import { CustomerModel } from "@/model/Customer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();
    console.log("Received Data:", data);
    const newCustomer = await CustomerModel.create({
      name: data.name,
      address: data.address,
      mobile: data.mobile,
      gstNumber: data.gstNumber,
      currentReading: data.currentReading,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Customer added successfully",
        customer: newCustomer,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(" Error adding customer:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
