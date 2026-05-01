import { useMemo } from "react";
import { Product } from "@/types/product";
import { calcTotal } from "@/utils/calcTotal";

type Props = {
  serial: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  products: Product[];
};

export default function QuotationTemplate({
  serial,
  date,
  customer,
  products,
}: Props) {
  // Memoize total to avoid recalculation on unrelated re-renders
  const total = useMemo(() => calcTotal(products), [products]);

  // Currency Formatter for Taka
  const formatCurrency = (amount: number) =>
    `৳${new Intl.NumberFormat("en-BD").format(amount)}`;

  // Safer Address Splitting Logic
  const addressWords = customer.address ? customer.address.split(" ") : [];
  const addressLine1 = addressWords.slice(0, 7).join(" ");
  const addressLine2 = addressWords.slice(7).join(" ");

  return (
    <div
      id="quotation"
      className="w-[210mm] h-[297mm] bg-white relative text-[12px] shadow-lg text-gray-900 overflow-hidden"
    >
      {/* Background Layer */}
      <img
        src="/pad.png"
        alt="Letterhead Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="relative z-10 p-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex mt-8 justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0B43A1] tracking-wide">
            QUOTATION
          </h1>
        </div>

        {/* Customer & Meta Info */}
        <div className="flex justify-between items-start mt-12">
          <div className="text-xs text-gray-700 leading-relaxed max-w-[60%]">
            <p className="font-semibold text-gray-500 uppercase text-[10px] mb-1">
              Bill To:
            </p>
            <p>
              <span className="text-gray-500">Customer:</span>{" "}
              <span className="text-gray-900 font-medium">
                {customer.name || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="text-gray-800">{customer.phone || "N/A"}</span>
            </p>
            <div className="flex gap-1">
              <span className="text-gray-500 shrink-0">Address:</span>
              <span className="text-gray-800">
                {addressLine1}
                {addressLine2 && <br />}
                {addressLine2}
              </span>
            </div>
          </div>

          <div className="text-right text-xs">
            <p className="text-gray-500">
              Ref: <span className="text-gray-800 font-medium">{serial}</span>
            </p>
            <p className="mt-1">
              <span className="text-gray-500">Date:</span>{" "}
              <span className="text-gray-800 font-medium">{date}</span>
            </p>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-6 flex-1">
          <table className="w-full border-collapse border border-gray-300 text-[11px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-[10px]">
              <tr>
                <th className="border border-gray-300 p-2 w-[5%]">#</th>
                <th className="border border-gray-300 p-2 w-[12%]">Image</th>
                <th className="border border-gray-300 p-2 w-[38%] text-left">
                  Product Details
                </th>
                <th className="border border-gray-300 p-2 w-[10%]">Qty</th>
                <th className="border border-gray-300 p-2 w-[15%]">Price</th>
                <th className="border border-gray-300 p-2 w-[20%]">Total</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {products.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="border border-gray-300 p-2 text-center text-gray-500">
                    {String(i + 1).padStart(2, "0")}
                  </td>

                  <td className="border border-gray-300 p-2 text-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-contain mx-auto border bg-white"
                      />
                    ) : (
                      <span className="text-gray-400 text-[9px] italic">
                        No Image
                      </span>
                    )}
                  </td>

                  <td className="border border-gray-300 p-2">
                    <div className="font-bold text-gray-900">
                      {p.name || "Untitled Product"}
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5 leading-tight">
                      <p>
                        Brand:{" "}
                        <span className="text-gray-800 font-medium">
                          {p.brand || "-"}
                        </span>
                      </p>
                      <p>
                        Model:{" "}
                        <span className="text-gray-800 font-medium">
                          {p.model || "-"}
                        </span>
                      </p>
                      <p>
                        Origin:{" "}
                        <span className="text-gray-800 font-medium">
                          {p.origin || "-"}
                        </span>
                      </p>
                    </div>
                  </td>

                  <td className="border border-gray-300 p-2 text-center">
                    {p.qty}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="border border-gray-300 p-2 text-center font-bold text-gray-900">
                    {formatCurrency(p.qty * p.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mt-4">
          <div className="w-1/3 border border-gray-300 bg-gray-50">
            <div className="flex justify-between items-center p-2.5">
              <span className="font-bold text-gray-700 uppercase text-[10px]">
                Grand Total
              </span>
              <span className="font-black text-gray-900 text-sm">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Signature Footer */}
        <div className="flex justify-between mt-16 pb-20 text-xs text-gray-700">
          <div className="text-center">
            <div className="border-t border-gray-400 w-44 pt-1.5 text-gray-600 font-medium">
              Prepared By
            </div>
          </div>

          <div className="text-center">
            <div className="border-t border-gray-400 w-44 pt-1.5 text-gray-600 font-medium">
              Authorized Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
