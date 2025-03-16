import React from "react";

interface AdminInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const AdminInputField: React.FC<AdminInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 px-4 text-lg outline-none border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default AdminInputField;
