"use client";
import { useEffect, useState } from "react";
import { InvoiceType } from "@/lib/types";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Download from "./Download";
import Link from "next/link";
import AddInvoice from "./AddInvoice";
import CustomerData from "./CustomerData";
import { deleteInvoice } from "@/app/actions/delete.actions";
type AddCustomerPropType = {
  setVisible: (view: "customers" | "addCustomer" | "invoices") => void;
  visible: string;
};
const InvoiceData = ({ setVisible, visible }: AddCustomerPropType) => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInvoiceAdd, setIsInvoiceAdded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/get-invoice");
        const data = await res.json();

        if (data.success) {
          setInvoices(data.data || []);
          setMessage("Invoices loaded successfully");
          setError("");
        } else {
          setError("Failed to load invoices");
          setMessage("");
        }
      } catch (error) {
        setError("Error fetching invoices");
        setMessage("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDeleteInvoice = async (id: string) => {
    try {
      const res = await deleteInvoice(id);
      if (!res.success) {
        setError(res.message || "Failed To delete Invoice");
        setMessage("");
      } else {
        setMessage(res.message || "Invoice deleted Successfully");
        setError("");
      }
    } catch (error: any) {
      setError;
    }
  };
  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Invoices</h2>
        </div>
        <div>
          {/* <Link href="/"> */}
          <button
            onClick={() => setIsInvoiceAdded(!isInvoiceAdd)}
            className="w-32 p-2 px-4 bg-green-500 rounded-lg"
          >
            Add Invoice
          </button>
          {isInvoiceAdd && (
            <CustomerData setVisible={setVisible} visible={visible} />
          )}
          {/* </Link> */}
        </div>
        {(message || error) && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {message ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={message ? "text-green-700" : "text-red-700"}>
                {message || error}
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No invoices found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Invoice
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 hidden md:table-cell">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Previous
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Current
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 hidden sm:table-cell">
                    Rent
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 hidden sm:table-cell">
                    Free Copies
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 hidden sm:table-cell">
                    Rate Per Reading
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 hidden lg:table-cell">
                    GST
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 hidden lg:table-cell">
                    GST Amount
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Total
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Download
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-center">
                      {inv.invoiceNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {new Date(inv.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center hidden md:table-cell">
                      {inv.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {inv.previousReading}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {inv.currentReading}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center hidden sm:table-cell">
                      {inv.rentAmount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center hidden sm:table-cell">
                      {inv.freeCopies}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center hidden sm:table-cell">
                      {inv.ratePerReading}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center hidden lg:table-cell">
                      {inv.gstType.toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center hidden lg:table-cell">
                      {Number(inv.gstAmount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center">
                      ₹{inv.totalAmount}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center">
                      <Download invoices={[inv]} />
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center">
                      <button
                        onClick={() => handleDeleteInvoice(inv._id)}
                        className="text-red-500 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceData;
