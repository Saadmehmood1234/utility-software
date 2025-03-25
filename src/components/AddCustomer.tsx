"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    address: "",
    gstNo: "",
    currentReading: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors("");

    // Simple validation
    const requiredFields = [
      { field: "name", label: "Customer Name" },
      { field: "mobile", label: "Mobile Number" },
      { field: "address", label: "Address" },
      { field: "gstNo", label: "GST Number" },
      { field: "currentReading", label: "Current Reading" },
    ];

    const missingField = requiredFields.find(
      (f) => !customer[f.field as keyof typeof customer]
    );
    if (missingField) {
      setErrors(`${missingField.label} is required!`);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/add-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customer.name,
          mobile: customer.mobile,
          address: customer.address,
          gstNumber: customer.gstNo,
          currentReading: Number(customer.currentReading),
        }),
      });

      if (res.ok) {
        setMessage("Customer added successfully!");
        setCustomer({
          name: "",
          mobile: "",
          address: "",
          gstNo: "",
          currentReading: "",
        });
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await res.json();
        setErrors(errorData.message || "Error adding customer");
      }
    } catch (error) {
      setErrors("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-4 lg:mx-auto p-4">
      <div className="bg-white border-2 border-gray-400 rounded-xl shadow-sm   p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Customer
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
              <label className="text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={customer.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="+91 9876543210"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                GST Number
              </label>
              <input
                type="text"
                name="gstNo"
                value={customer.gstNo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="GSTIN1234567XYZ"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Current Reading
              </label>
              <input
                type="number"
                name="currentReading"
                value={customer.currentReading}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={customer.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Full address"
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
                <span>Adding Customer...</span>
              </div>
            ) : (
              "Add Customer"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
