import { dbConnect } from "@/lib/dbConnect";
import { Invoice } from "@/model/Invoice";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const invoiceData = await Invoice.find()
    return NextResponse.json(
      {
        success: true,
        data: invoiceData,
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
