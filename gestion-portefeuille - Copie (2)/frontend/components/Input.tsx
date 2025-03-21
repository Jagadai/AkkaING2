import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}

export const Input: React.FC<InputProps> = ({ type = "text", placeholder, value, onChange, className = "", name }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${className}`}
    />
  );
};
