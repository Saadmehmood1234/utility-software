"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/SideBar";
import AddCustomer from "@/components/AddCustomer";
import CustomerData from "@/components/CustomerData";
import InvoiceData from "@/components/InvoiceData";
import { Menu } from "lucide-react";
import Logout from "@/components/Logout";

type ViewType = "customers" | "addCustomer" | "invoices" | "logout";

const Dashboard = () => {
  const [visible, setVisible] = useState<ViewType>("customers");
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <div className="min-h-screen bg-gray-100">
      <button
        className="md:hidden fixed top-4 right-4 p-2 bg-white rounded-lg shadow-sm z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </button>

      <div className="flex flex-col md:flex-row">
        <div
          className={`md:relative fixed top-0 left-0 h-screen transform transition-transform duration-200 ease-in-out z-40
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
         <Sidebar setVisible={setVisible} visible={visible} onClose={() => setSidebarOpen(false)} />

        </div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className=" p-4 md:p-6">
              {visible === "customers" && <CustomerData setVisible={setVisible} visible={visible}/>}
              {visible === "addCustomer" && <AddCustomer />}
              {visible === "invoices" && <InvoiceData />}
              {visible === "logout" && <Logout setVisible={setVisible} visible={visible}/>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
