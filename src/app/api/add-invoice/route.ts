import { dbConnect } from "@/lib/dbConnect";
import { Invoice } from "@/model/Invoice";
import { CustomerModel } from "@/model/Customer";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { calculateInvoice } from "@/lib/Invoice_Calc";
import { generateInvoiceNumber } from "@/lib/invoice_no";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const data = await req.json();

    console.log("Send data", data);
    if (
      !data.date ||
      !data.customer ||
      data.previousReading === undefined ||
      data.currentReading === undefined ||
      data.rentAmount === undefined ||
      data.freeCopies === undefined ||
      data.ratePerReading === undefined ||
      !data.gstType
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    const existingCustomer = await CustomerModel.findById(data.customer);
    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer not found." },
        { status: 404 }
      );
    }
    const calculated_value = {
      currentReading: Number(data.currentReading),
      previousReading: Number(data.previousReading),
      rentAmount: Number(data.rentAmount),
      freeCopies: Number(data.freeCopies),
      ratePerReading: Number(data.ratePerReading),
      gstType: data.gstType,
    };

    const calculated_result = calculateInvoice(calculated_value);
    const invoiceNo = generateInvoiceNumber();
    console.log("Invoice Result", calculated_result);
    const newInvoice = await Invoice.create({
      invoiceNo,
      date: data.date,
      customer: data.customer,
      customerName:existingCustomer.name,
      previousReading: data.previousReading,
      currentReading: data.currentReading,
      rentAmount: data.rentAmount,
      freeCopies: data.freeCopies,
      ratePerReading: data.ratePerReading,
      gstType: data.gstType,
      netPayableReading: calculated_result.netPayableReading,
      totalT1: calculated_result.totalT1,
      gstAmount: calculated_result.gstAmount,
      totalAmount: calculated_result.finalTotal,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Invoice added successfully",
        invoice: newInvoice,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding invoice:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
