import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, text }) => {
  return (
    <div className="mt-4 w-full flex justify-center">
      <button
        className="w-50 h-10 text-md rounded-sm text-lg font-medium cursor-pointer"
        style={{ backgroundColor: "#026DFF", color: "white" }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
