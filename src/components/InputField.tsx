import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, error, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-purple-900 font-medium">{label}</label>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3">{icon}</span>}
        <input
          {...props}
          className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

export default InputField;
