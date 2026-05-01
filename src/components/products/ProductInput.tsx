"use client";

import { ReactNode } from "react";

type Props = {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  icon?: ReactNode; // Added icon support
  onChange: (name: string, value: string) => void;
};

export default function ProductInput({
  label,
  name,
  value,
  type = "text",
  placeholder,
  icon,
  onChange,
}: Props) {
  return (
    <div className="w-full space-y-1.5">
      {/* Label with slightly better tracking and color */}
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">
        {label}
      </label>

      <div className="relative group">
        {/* Render Icon if provided */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
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
