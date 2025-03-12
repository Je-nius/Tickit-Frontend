import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className="inline-block text-lg font-medium text-gray-700 mr-4"
        style={{ width: "120px" }}
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 px-4 text-lg outline-none border-b-2 border-gray-400"
      />
    </div>
  );
};

export default InputField;
