// components/InputWithButton.tsx
import React from "react";

interface AuthButtonProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  buttonText: string;
  onButtonClick: () => void;
}

const InputWithButton: React.FC<AuthButtonProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-grow h-12 px-4 text-lg outline-none border-b-2 border-gray-400"
        />
        <button
          onClick={onButtonClick}
          className="ml-4 h-9 px-3 bg-blue-500 text-white rounded-md text-xs sm:text-sm md:text-base cursor-pointer hover:bg-blue-600 min-w-[80px] max-w-[120px] overflow-hidden"
          style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InputWithButton;
