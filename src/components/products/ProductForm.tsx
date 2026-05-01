"use client";

import { useState } from "react";
import ProductInput from "./ProductInput";
import {
  Package,
  Tag,
  Cpu,
  Globe,
  Banknote,
  Layers,
  Save,
  XCircle,
  Loader2,
} from "lucide-react";

type ProductState = {
  name: string;
  brand: string;
  model: string;
  origin: string;
  price: string;
  stock: string;
};

const initialState: ProductState = {
  name: "",
  brand: "",
  model: "",
  origin: "",
  price: "",
  stock: "",
};

export default function ProductForm() {
  const [product, setProduct] = useState<ProductState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save product");
      }

      alert("✅ Product saved to MongoDB successfully!");
      setProduct(initialState);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section: Basic Information */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Basic Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProductInput
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="e.g. Industrial Printer"
            icon={<Tag className="w-4 h-4" />}
            required
          />
          <ProductInput
            label="Brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="e.g. HP, Epson"
            icon={<Layers className="w-4 h-4" />}
          />
          <ProductInput
            label="Model"
            name="model"
            value={product.model}
            onChange={handleChange}
            placeholder="e.g. Pro-X 500"
            icon={<Cpu className="w-4 h-4" />}
          />
          <ProductInput
            label="Origin"
            name="origin"
            value={product.origin}
            onChange={handleChange}
            placeholder="e.g. Bangladesh, Japan"
            icon={<Globe className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Section: Inventory & Pricing */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-1.5 bg-emerald-50 rounded-lg">
            <Banknote className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Pricing & Stock
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProductInput
            label="Price (৳)"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
          <ProductInput
            label="Available Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => setProduct(initialState)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-50"
        >
          <XCircle className="w-4 h-4" />
          Clear Form
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:active:scale-100 text-white font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}
