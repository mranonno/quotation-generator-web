"use client";

import { ArrowRight } from "lucide-react"; // Optional: add an icon for better UX

type Props = {
  title: string;
  description: string;
  buttonText: string;
  variant: "blue" | "emerald"; // Renamed from color to variant for better naming convention
  onClick?: () => void;
};

export default function QuickActionCard({
  title,
  description,
  buttonText,
  variant,
  onClick,
}: Props) {
  // Define styles based on variant
  const styles = {
    blue: {
      bg: "bg-blue-50/50",
      border: "border-blue-100",
      text: "text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700 shadow-blue-100",
      iconBg: "bg-blue-100",
    },
    emerald: {
      bg: "bg-emerald-50/50",
      border: "border-emerald-100",
      text: "text-emerald-700",
      button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100",
      iconBg: "bg-emerald-100",
    },
  };

  const current = styles[variant];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 ${current.bg} ${current.border}`}
    >
      <div className="relative z-10">
        <h3 className={`text-base font-bold ${current.text} tracking-tight`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 leading-relaxed max-w-45">
          {description}
        </p>

        <button
          onClick={onClick}
          className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 shadow-md ${current.button}`}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Subtle Background Decorative Element */}
      <div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${current.iconBg}`}
      />
    </div>
  );
}
