"use client";

import React, { useState } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: any; // From react-hook-form
  error?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  register,
  error
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Keep the label in the floating position if there's a value
    setFocused(!!event.target.value);
  };

  return (
    <div className="relative w-full mb-4">
      <label
        htmlFor={id}
        className={`absolute left-3 top-2.5 text-white transition-all duration-300 ease-in-out pointer-events-none ${
          focused ? "text-xs top-[-8px] bg-primary rounded-sm left-2 px-1" : ""
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
      />
      {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
