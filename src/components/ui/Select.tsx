"use client";

import React, { useState } from "react";

interface SelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  register: any; // From react-hook-form
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  register,
  error
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <label
        htmlFor={id}
        className={`absolute left-3 top-2.5 text-white transition-all duration-300 ease-in-out pointer-events-none ${
          focused || register?.value
            ? "text-xs top-[-8px] bg-primary rounded-sm left-2 px-1"
            : ""
        }`}
      >
        {label}
      </label>
      <select
        id={id}
        {...register}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className=""
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Select;
