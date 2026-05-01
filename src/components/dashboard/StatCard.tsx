"use client";

import { TrendingUp, Package, FileText, Banknote } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  trend?: string;
  icon?: "package" | "file-text" | "currency";
  highlight?: boolean; // Add this line to fix the error
};

export default function StatCard({
  title,
  value,
  trend,
  icon,
  highlight = false,
}: Props) {
  const iconMap = {
    package: {
      component: <Package className="w-5 h-5" />,
      color: "bg-blue-50 text-blue-600",
    },
    "file-text": {
      component: <FileText className="w-5 h-5" />,
      color: "bg-purple-50 text-purple-600",
    },
    currency: {
      component: <Banknote className="w-5 h-5" />,
      color: "bg-emerald-50 text-emerald-600",
    },
  };

  const selectedIcon = icon ? iconMap[icon] : iconMap["package"];

  return (
    <div
      className={`group p-6 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
        highlight
          ? "bg-slate-900 border-slate-800 text-white" // Styles for highlighted card
          : "bg-white border-slate-200/60 text-slate-900 hover:border-blue-100" // Default styles
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-xl font-medium mb-1 ${highlight ? "text-slate-400" : "text-slate-500"}`}
          >
            {title}
          </p>
          <h3 className="text-3xl font-medium tracking-tight">{value}</h3>
        </div>

        <div
          className={`p-3 rounded-xl transition-colors duration-300 ${
            highlight ? "bg-white/10 text-white" : selectedIcon.color
          }`}
        >
          {selectedIcon.component}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5">
          <div
            className={`flex items-center justify-center w-5 h-5 rounded-full ${highlight ? "bg-white/10" : "bg-emerald-50"}`}
          >
            <TrendingUp
              className={`w-3 h-3 ${highlight ? "text-emerald-400" : "text-emerald-600"}`}
            />
          </div>
          <span
            className={`font-semibold ${highlight ? "text-emerald-400" : "text-emerald-600"}`}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}
