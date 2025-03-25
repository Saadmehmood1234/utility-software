import { dbConnect } from "@/lib/dbConnect";
import { CustomerModel } from "@/model/Customer";
import { NextRequest, NextResponse } from "next/server";
export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { id } = await req.json(); 
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer ID is required",
        },
        { status: 400 }
      );
    }
    const deletedCustomer = await CustomerModel.findOneAndDelete({ _id: id });
    if (!deletedCustomer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Customer Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
