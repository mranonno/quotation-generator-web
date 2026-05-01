"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  //   MoreVertical,
  Edit3,
  Trash2,
  Package,
  Globe,
  Cpu,
} from "lucide-react";
import Link from "next/link";

// Mock data for products
const initialProducts = [
  {
    id: 1,
    name: "Industrial Printer X1",
    brand: "HP",
    model: "Pro-500",
    origin: "Japan",
    price: "৳ 45,000",
    stock: 12,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    brand: "Logitech",
    model: "G-Pro",
    origin: "China",
    price: "৳ 8,200",
    stock: 45,
  },
  {
    id: 3,
    name: "Smart Sensor Hub",
    brand: "Xiaomi",
    model: "Hub-V3",
    origin: "China",
    price: "৳ 2,400",
    stock: 110,
  },
  {
    id: 4,
    name: "Heavy Duty Motor",
    brand: "Siemens",
    model: "M-90",
    origin: "Germany",
    price: "৳ 1,25,000",
    stock: 5,
  },
  {
    id: 5,
    name: "LCD Touch Panel",
    brand: "Samsung",
    model: "T-800",
    origin: "South Korea",
    price: "৳ 12,900",
    stock: 22,
  },
];

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              All Products
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your inventory and product specifications.
            </p>
          </div>
          <Link
            href="/products/add"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name, brand, or model..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Category
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {initialProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Row: Brand & Actions */}
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> {product.model}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {product.origin}
                  </span>
                </div>
              </div>

              {/* Pricing & Stock Footer */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    Price
                  </p>
                  <p className="text-lg font-extrabold text-slate-900">
                    {product.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    Stock
                  </p>
                  <p
                    className={`text-sm font-bold ${product.stock < 10 ? "text-rose-500" : "text-emerald-500"}`}
                  >
                    {product.stock} units
                  </p>
                </div>
              </div>

              {/* Subtle Decorative Icon */}
              <Package className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />
            </div>
          ))}
        </div>

        {/* Empty State (Optional logic) */}
        {initialProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">
              No products found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or add a new product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
