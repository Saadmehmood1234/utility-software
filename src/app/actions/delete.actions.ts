"use server";
import { Invoice } from "@/model/Invoice";
import { dbConnect } from "@/lib/dbConnect";
export const deleteInvoice = async (id: string) => {
  try {
    await dbConnect();
    const findInvoice = await Invoice.findById(id);
    if (!findInvoice) {
      return {
        success: false,
        message: "Invoic does not exists",
        status: 400,
      };
    }
    const deleteInvoice = await Invoice.findOneAndDelete({ _id: id });
    console.log(deleteInvoice);
    return {
      success: true,
      message: "Invoice Deleted Successfully",
      status: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Server Error in Delete Invoice",
      status: 500,
    };
  }
};
