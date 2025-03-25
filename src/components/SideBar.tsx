import { Users, UserPlus, FileText, X,LogOut } from "lucide-react";

type SidebarProps = {
  setVisible: (view: "customers" | "addCustomer" | "invoices" | "logout") => void;
  visible: string;
  onClose?: () => void;
};

export const Sidebar = ({ setVisible, visible, onClose }: SidebarProps) => {
  return (
    <div className="bg-white h-full flex flex-col w-64 md:w-72 border-r border-gray-200 relative">
      <button
        onClick={() => {
          if (onClose) onClose();
        }}
        className="md:hidden absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full"
      >
        <X size={20} className="text-gray-600" />
      </button>

      <div className="px-4 py-5 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 p-2 mt-2">
        <SidebarItem
          icon={<Users size={20} className="min-w-[20px]" />}
          label="customers"
          text="Customers"
          visible={visible}
          onClick={() => setVisible("customers")}
        />

        <SidebarItem
          icon={<UserPlus size={20} className="min-w-[20px]" />}
          label="addCustomer"
          text="Add Customer"
          visible={visible}
          onClick={() => setVisible("addCustomer")}
        />

        <SidebarItem
          icon={<FileText size={20} className="min-w-[20px]" />}
          label="invoices"
          text="Invoices"
          visible={visible}
          onClick={() => setVisible("invoices")}
        />
         <SidebarItem
          icon={<LogOut size={20} className="min-w-[20px]" />}
          label="logout"
          text="Logout"
          visible={visible}
          onClick={() => setVisible("logout")}
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  text,
  onClick,
  visible,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  onClick: () => void;
  visible: string;
}) => {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 text-base text-gray-600 rounded-lg transition-all
        ${
          label === visible
            ? "bg-blue-50 text-blue-600 font-semibold"
            : "hover:bg-gray-50 hover:text-gray-900"
        }`}
      onClick={onClick}
    >
      <span
        className={`${label === visible ? "text-blue-500" : "text-gray-500"}`}
      >
        {icon}
      </span>
      <span className="text-left">{text}</span>
    </button>
  );
};
