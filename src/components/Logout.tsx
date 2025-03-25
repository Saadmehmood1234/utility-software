import React from "react";
import { signOut } from "next-auth/react";
type LogoutPropTypes = {
  setVisible: (view: "customers" | "addCustomer" | "invoices") => void;
  visible: string;
};
const Logout = ({ setVisible }: LogoutPropTypes) => {
  function handleSignOut() {
    signOut({ callbackUrl: "/" });
    
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg m-4 border-2 border-gray-400 p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
          >
            Logout
          </button>
          <button
            className="w-full ml-4 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-all duration-300"
            onClick={() => setVisible("customers")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
