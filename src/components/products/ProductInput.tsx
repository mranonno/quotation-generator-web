"use client";

import { ReactNode } from "react";

type Props = {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean; // 1. Added required to the Type
  onChange: (name: string, value: string) => void;
};

export default function ProductInput({
  label,
  name,
  value,
  type = "text",
  placeholder,
  icon,
  required = false, // 2. Default to false
  onChange,
}: Props) {
  return (
    <div className="w-full space-y-1.5">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">
        {label}
        {/* Optional: Add a red asterisk if required */}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          required={required} // 3. Pass it to the native input
          onChange={(e) => onChange(name, e.target.value)}
          className={`
            w-full transition-all duration-200
            bg-slate-50 border border-slate-200 
            text-slate-900 text-sm rounded-xl
            placeholder:text-slate-400
            focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white
            ${icon ? "pl-11" : "pl-4"} pr-4 py-2.5
          `}
        />
      </div>
    </div>
  );
}
