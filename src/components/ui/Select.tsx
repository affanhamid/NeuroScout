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
  return (
    <div className="relative w-full mb-4">
      <select
        id={id}
        {...register}
        defaultValue=""
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
      >
        <option value="" disabled>
          Select {label}
        </option>
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
