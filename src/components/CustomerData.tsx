"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CustomerType } from "@/lib/types";
import AddInvoice from "./AddInvoice";
import {
  Loader2,
  AlertCircle,
  PlusCircle,
  Trash2,
  FileText,
  CheckCircle2,
} from "lucide-react";
type CustomerPropType = {
  setVisible: (view: "customers" | "addCustomer" | "invoices") => void;
  visible: string;
};
const CustomerData = ({ setVisible, visible }: CustomerPropType) => {
  const [customers, setCustomers] = useState<CustomerType[] | null>(null);
  const [message, setMessage] = useState("");
  const [isInvoiceAdd, setIsInvoiceAdd] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/get-customer");
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data || []);
          setMessage("Customer data loaded successfully");
          setTimeout(() => setMessage(""), 3000);
        } else {
          setMessage("Failed to fetch customer data");
        }
      } catch (error) {
        setMessage("Error fetching customer data");
        console.error("Fetch Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    try {
      const res = await fetch("/api/delete-customer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedCustomer }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Customer deleted successfully");
        setCustomers((prev) =>
          prev ? prev.filter((c) => c._id !== selectedCustomer) : prev
        );
      } else {
        setMessage("Failed to delete customer");
      }
    } catch (error) {
      setMessage("Error deleting customer");
      console.error("Delete Error:", error);
    }
    setSelectedCustomer(null);
  };

  const handleInvoice = (id: string) => {
    setIsInvoiceAdd((prev) => !prev);
    setSelectedCustomer(id);
  };

  return (
    <div className="p-4 md:p-6">
      {!isInvoiceAdd ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl  font-semibold text-gray-800">Customers</h2>
            <button
               onClick={() => setVisible("addCustomer")}
              className="flex max-md:hidden items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlusCircle size={18} />
              New Customer
            </button>
            <button
               onClick={() => setVisible("addCustomer")}
              className="flex md:hidden items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlusCircle size={18} />
             
            </button>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.includes("success") ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2">
                {message.includes("success") ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={
                    message.includes("success")
                      ? "text-green-700"
                      : "text-red-700"
                  }
                >
                  {message}
                </span>
              </div>
            </div>
          )}

          {customers === null ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No customers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden md:table-cell">
                      Mobile
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden lg:table-cell">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden md:table-cell">
                      GST No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Reading
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {customer.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                        {customer.mobile}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                        {customer.address}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                        {customer.gstNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {customer.currentReading}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleInvoice(customer._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Add Invoice"
                        >
                          <FileText size={18} />
                        </button>
                        <button
                          onClick={() => setSelectedCustomer(customer._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedCustomer && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
              <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this customer? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setSelectedCustomer(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <AddInvoice
          customerId={selectedCustomer || ""}
          setIsInvoiceAdd={setIsInvoiceAdd}
          isInvoiceAdd={isInvoiceAdd}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerData;
