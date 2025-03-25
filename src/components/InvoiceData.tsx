import { useEffect, useState } from "react";
import { InvoiceType } from "@/lib/types";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const InvoiceData = () => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Invoices</h2>
        </div>

        {(message || error) && (
          <div className={`mb-6 p-4 rounded-lg ${message ? "bg-green-50" : "bg-red-50"}`}>
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Invoice </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Customer</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Previous</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Current</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 hidden sm:table-cell">Rent</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden lg:table-cell">GST</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{inv.invoiceNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(inv.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                      {inv.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">
                      {inv.previousReading}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">
                      {inv.currentReading}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right hidden sm:table-cell">
                      ₹{inv.rentAmount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      {inv.gstType.toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      ₹{inv.totalAmount}
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