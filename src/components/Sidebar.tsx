"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Package,
  History,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Create Quotation", href: "/quotation", icon: FileText },
  { name: "History", href: "/history", icon: History },
  { name: "Add Product", href: "/products/add", icon: PlusCircle },
  { name: "All Products", href: "/products", icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar");
      return saved !== null ? saved === "true" : true;
    }
    return true;
  });

  const toggle = () => {
    setOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar", String(newState));
      return newState;
    });
  };

  return (
    <aside
      className={`relative h-screen bg-slate-900 border-r border-slate-800 transition-all duration-500 ease-in-out flex flex-col z-50 ${
        open ? "w-72" : "w-20"
      }`}
    >
      {/* Brand Logo Section */}
      <div className="h-20 flex items-center px-6 gap-3 border-b border-slate-800/50 overflow-hidden">
        <div className="shrink-0 bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
          <Zap className="text-white w-6 h-6 fill-current" />
        </div>
        <span
          className={`font-bold text-xl tracking-tight text-white transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        >
          Pulse<span className="text-blue-500"> Technologies</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6 px-3 space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!open ? item.name : ""} // Browser tooltip when collapsed
              className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span
                className={`font-medium whitespace-nowrap transition-all duration-300 ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={toggle}
          className="flex items-center justify-center w-full py-3 rounded-xl bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"
        >
          {open ? (
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
              <ChevronLeft size={18} />
              <span>Collapse</span>
            </div>
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>
    </aside>
  );
}
