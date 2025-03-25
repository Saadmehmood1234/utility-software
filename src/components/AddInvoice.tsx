"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type InvoicePropTypes = {
  setIsInvoiceAdd: (value: boolean) => void;
  customerId: string;
  isInvoiceAdd: boolean;
  setSelectedCustomer: (value: string) => void;
};

const AddInvoice = ({
  setIsInvoiceAdd,
  isInvoiceAdd,
  setSelectedCustomer,
  customerId,
}: InvoicePropTypes) => {
  const [invoice, setInvoice] = useState({
    date: new Date().toISOString().split("T")[0],
    previousReading: "",
    currentReading: "",
    rentAmount: "",
    freeCopies: "",
    ratePerReading: "",
    gstType: "CGST",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [name]: name === "date" || name === "gstType" ? value : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "date", label: "Date" },
      { field: "previousReading", label: "Previous Reading" },
      { field: "currentReading", label: "Current Reading" },
      { field: "rentAmount", label: "Rent Amount" },
      { field: "freeCopies", label: "Free Copies" },
      { field: "ratePerReading", label: "Rate Per Reading" },
    ];

    const missingField = requiredFields.find(
      (f) => !invoice[f.field as keyof typeof invoice]
    );

    if (missingField) {
      setErrors(`${missingField.label} is required!`);
      return false;
    }

    if (Number(invoice.currentReading) <= Number(invoice.previousReading)) {
      setErrors("Current reading must be greater than previous reading");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/add-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: invoice.date,
          customer: customerId,
          previousReading: invoice.previousReading,
          currentReading: invoice.currentReading,
          rentAmount: invoice.rentAmount,
          freeCopies: invoice.freeCopies,
          ratePerReading: invoice.ratePerReading,
          gstType: invoice.gstType.toLowerCase(),
        }),
      });

      if (res.ok) {
        setMessage("Invoice added successfully!");
        setInvoice({
          date: new Date().toISOString().split("T")[0],
          previousReading: "",
          currentReading: "",
          rentAmount: "",
          freeCopies: "",
          ratePerReading: "",
          gstType: "CGST",
        });
        setTimeout(() => {
          setIsInvoiceAdd(!isInvoiceAdd);
          setSelectedCustomer("");
        }, 1500);
      } else {
        const errorData = await res.json();
        setErrors(errorData.message || "Error adding invoice");
      }
    } catch (error) {
      setErrors("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-4 lg:mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-400 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Invoice
        </h2>

        {(message || errors) && (
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
                {message || errors}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={invoice.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                GST Type
              </label>
              <select
                name="gstType"
                value={invoice.gstType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="CGST">CGST</option>
                <option value="IGST">IGST</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Previous Reading
              </label>
              <input
                type="number"
                name="previousReading"
                value={invoice.previousReading}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Current Reading
              </label>
              <input
                type="number"
                name="currentReading"
                value={invoice.currentReading}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Rent Amount (₹)
              </label>
              <input
                type="number"
                name="rentAmount"
                value={invoice.rentAmount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Free Copies
              </label>
              <input
                type="number"
                name="freeCopies"
                value={invoice.freeCopies}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Rate Per Reading
              </label>
              <input
                type="number"
                name="ratePerReading"
                value={invoice.ratePerReading}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Adding Invoice...</span>
              </div>
            ) : (
              "Add Invoice"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvoice;
