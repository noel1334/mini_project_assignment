import React from "react";

interface AlertProps {
  message: string;
  onClose?: () => void;
  type: "warning" | "error"; // Add a type with 2 options
}

const Alert: React.FC<AlertProps> = ({ message, onClose, type }) => {
  return (
    <div
      className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">
        {type === "warning" ? "Warning!" : "Error!"}
      </strong>
      <span className="block sm:inline">{message}</span>
      {onClose && ( // Conditionally render the close button
        <button
          className="absolute top-2 right-2 p-[5px] rounded-full bg-orange-900 text-white hover:bg-orange-200 hover:text-orange-500 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          X
        </button>
      )}
    </div>
  );
};

export default Alert;
