"use client";

import { useState } from "react";
import QuotationTemplate from "@/components/QuotationTemplate";
import { Product } from "@/types/product";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  User,
  Plus,
  Trash2,
  Download,
  ImageIcon,
  Hash,
  DollarSign,
  Briefcase,
  Package,
  XCircle,
  Search,
} from "lucide-react";

// Mock Data for the Demo Phase
const DEMO_INVENTORY = [
  {
    name: "Industrial Printer X1",
    brand: "HP",
    model: "Pro-500",
    origin: "Japan",
    price: 45000,
  },
  {
    name: "Mechanical Keyboard",
    brand: "Logitech",
    model: "G-Pro",
    origin: "China",
    price: 8200,
  },
  {
    name: "Smart Sensor Hub",
    brand: "Xiaomi",
    model: "Hub-V3",
    origin: "China",
    price: 2400,
  },
  {
    name: "Heavy Duty Motor",
    brand: "Siemens",
    model: "M-90",
    origin: "Germany",
    price: 125000,
  },
];

const INITIAL_PRODUCT: Product = {
  name: "",
  brand: "",
  model: "",
  origin: "",
  qty: 1,
  price: 0,
  image: "",
};

export default function CreateQuotationPage() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Manual Add
  const addManualProduct = () =>
    setProducts((prev) => [...prev, { ...INITIAL_PRODUCT }]);

  // 🔹 Select from List
  const selectFromInventory = (item: (typeof DEMO_INVENTORY)[0]) => {
    const newProduct: Product = {
      ...INITIAL_PRODUCT,
      name: item.name,
      brand: item.brand,
      model: item.model,
      origin: item.origin,
      price: item.price,
    };
    setProducts((prev) => [...prev, newProduct]);
    setIsInventoryOpen(false);
  };

  const removeProduct = (index: number) =>
    setProducts((prev) => prev.filter((_, i) => i !== index));

  const updateProduct = (
    index: number,
    field: keyof Product,
    value: string | number,
  ) => {
    setProducts((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const downloadPDF = async () => {
    const element = document.getElementById("quotation");
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        210,
        (canvas.height * 210) / canvas.width,
      );
      pdf.save(`Quotation_${customer.name || "Draft"}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    }
  };

  const filteredInventory = DEMO_INVENTORY.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* 🔴 LEFT SIDE: BUILDER FORM */}
      <div className="w-full lg:w-[45%] p-6 lg:p-10 overflow-y-auto border-r border-slate-200 bg-white">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Quotation
          </h1>
          <p className="text-slate-500 text-sm">
            Assemble items from inventory or add them manually.
          </p>
        </header>

        {/* Customer Section */}
        <section className="space-y-4 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Customer Details
            </h2>
          </div>
          <div className="grid gap-4">
            {/* Client Name Input */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                name="name"
                type="text"
                placeholder="Client or Company Name"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-medium"
                onChange={handleCustomerChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Phone Input */}
              <div className="relative group">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-medium"
                  onChange={handleCustomerChange}
                />
              </div>

              {/* Address Input */}
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  name="address"
                  type="text"
                  placeholder="Location/City"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-medium"
                  onChange={handleCustomerChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Line Items
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 px-2 py-1 rounded text-blue-700 uppercase tracking-tight">
              {products.length} {products.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {products.map((p, i) => (
            <div
              key={i}
              className="group p-5 mb-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeProduct(i)}
                className="absolute -top-2 -right-2 bg-white border border-slate-200 p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Product Name / Description */}
              <input
                placeholder="Product Description (e.g. Industrial HP Printer)"
                className="w-full text-lg font-bold text-slate-900 mb-4 focus:text-blue-600 outline-none bg-transparent placeholder:text-slate-400 placeholder:font-normal"
                value={p.name}
                onChange={(e) => updateProduct(i, "name", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3 mb-4">
                <input
                  placeholder="Brand"
                  className="text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-medium transition-all placeholder:text-slate-400"
                  value={p.brand}
                  onChange={(e) => updateProduct(i, "brand", e.target.value)}
                />
                <input
                  placeholder="Model"
                  className="text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-medium transition-all placeholder:text-slate-400"
                  value={p.model}
                  onChange={(e) => updateProduct(i, "model", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Price Input */}
                <div className="relative flex-1 group/input">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-bold transition-all placeholder:text-slate-400"
                    value={p.price}
                    onChange={(e) =>
                      updateProduct(i, "price", Number(e.target.value))
                    }
                  />
                </div>

                {/* Quantity Input */}
                <div className="relative w-28 group/input">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                  <input
                    type="number"
                    placeholder="Qty"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-bold transition-all placeholder:text-slate-400"
                    value={p.qty}
                    onChange={(e) =>
                      updateProduct(i, "qty", Number(e.target.value))
                    }
                  />
                </div>

                {/* Image Upload Button */}
                <label className="flex items-center justify-center h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group/img">
                  <ImageIcon className="w-5 h-5 text-slate-400 group-hover/img:text-blue-500" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file)
                        updateProduct(i, "image", URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
            </div>
          ))}

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={addManualProduct}
              className="py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold text-xs hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex flex-col items-center gap-2 group"
            >
              <div className="p-2 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
                <Plus className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
              </div>
              Add Item Manually
            </button>
            <button
              onClick={() => setIsInventoryOpen(true)}
              className="py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold text-xs hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all flex flex-col items-center gap-2 group"
            >
              <div className="p-2 bg-slate-100 rounded-full group-hover:bg-emerald-100 transition-colors">
                <Package className="w-4 h-4 text-slate-500 group-hover:text-emerald-600" />
              </div>
              Select from Inventory
            </button>
          </div>
        </section>

        <button
          onClick={downloadPDF}
          className="mt-8 w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200"
        >
          <Download className="w-5 h-5" /> Generate PDF Quotation
        </button>
      </div>

      {/* 🔵 RIGHT SIDE: STICKY PREVIEW */}
      <div className="hidden lg:flex flex-1 bg-slate-200 items-start justify-center p-12 overflow-y-auto sticky top-0 h-screen">
        <div className="shadow-2xl shadow-slate-400/50 scale-[0.8] xl:scale-95 origin-top transition-transform">
          <QuotationTemplate
            serial="QTN-2024-001"
            date={new Date().toLocaleDateString("en-GB")}
            customer={customer}
            products={products}
          />
        </div>
      </div>

      {/* 🟢 INVENTORY MODAL */}
      {isInventoryOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h3 className="font-bold text-slate-800">
                  Select from Inventory
                </h3>
                <p className="text-xs text-slate-500">
                  Choose a product to add to quotation
                </p>
              </div>
              <button
                onClick={() => setIsInventoryOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto p-4 space-y-2">
              {filteredInventory.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => selectFromInventory(item)}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        {item.brand} • {item.model}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-900 text-sm">
                      ৳{item.price.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-blue-500 font-bold uppercase">
                      Select
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
