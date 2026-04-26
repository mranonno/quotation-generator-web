"use client";

import { useState } from "react";
import QuotationTemplate from "@/components/QuotationTemplate";
import FormInput from "@/components/FormInput";

type Product = {
  name: string;
  brand: string;
  model: string;
  origin?: string;
  qty: number;
  price: number;
  image?: string;
};

export default function Page() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [products, setProducts] = useState<Product[]>([
    {
      name: "",
      brand: "",
      model: "",
      origin: "",
      qty: 1,
      price: 0,
    },
  ]);

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* LEFT SIDE - FORM */}
      <div className="w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="font-bold mb-4 text-lg text-gray-800">Customer Info</h2>

        <FormInput
          label="Name"
          placeholder="Enter customer name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />

        <FormInput
          label="Phone"
          placeholder="Enter phone number"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />

        <FormInput
          label="Address"
          placeholder="Enter address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />

        <h2 className="font-bold mt-6 mb-3 text-lg text-gray-800">Products</h2>

        {products.map((p, i) => (
          <div
            key={i}
            className="border border-gray-100 p-4 mb-4 rounded-lg bg-gray-50"
          >
            <FormInput
              placeholder="Product Name"
              value={p.name}
              onChange={(e) => {
                const newData = [...products];
                newData[i].name = e.target.value;
                setProducts(newData);
              }}
            />

            <FormInput
              placeholder="Brand"
              value={p.brand}
              onChange={(e) => {
                const newData = [...products];
                newData[i].brand = e.target.value;
                setProducts(newData);
              }}
            />

            <FormInput
              placeholder="Model"
              value={p.model}
              onChange={(e) => {
                const newData = [...products];
                newData[i].model = e.target.value;
                setProducts(newData);
              }}
            />

            <FormInput
              placeholder="Origin"
              value={p.origin || ""}
              onChange={(e) => {
                const newData = [...products];
                newData[i].origin = e.target.value;
                setProducts(newData);
              }}
            />

            <div className="flex gap-2">
              <FormInput
                type="number"
                placeholder="Qty"
                value={p.qty}
                onChange={(e) => {
                  const newData = [...products];
                  newData[i].qty = Number(e.target.value);
                  setProducts(newData);
                }}
              />

              <FormInput
                type="number"
                placeholder="Price"
                value={p.price}
                onChange={(e) => {
                  const newData = [...products];
                  newData[i].price = Number(e.target.value);
                  setProducts(newData);
                }}
              />
            </div>
          </div>
        ))}

        {/* Add Product */}
        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 mt-3 rounded-md shadow-sm"
          onClick={() =>
            setProducts([
              ...products,
              {
                name: "",
                brand: "",
                model: "",
                origin: "",
                qty: 1,
                price: 0,
              },
            ])
          }
        >
          + Add Product
        </button>
      </div>

      {/* RIGHT SIDE - PREVIEW */}
      <div className="w-1/2 overflow-auto bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <QuotationTemplate
          serial="QTN-0001"
          date={new Date().toLocaleDateString()}
          customer={customer}
          products={products}
        />
      </div>
    </div>
  );
}
