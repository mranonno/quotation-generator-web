type Product = {
  name: string;
  brand: string;
  model: string;
  origin?: string;
  qty: number;
  price: number;
  image?: string;
};

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
  const total = products.reduce((sum, p) => sum + p.qty * p.price, 0);

  return (
    <div className="w-[210mm] h-[297mm] bg-white relative text-[12px] shadow-lg text-gray-900">
      {/* Background */}
      <img
        src="/pad.png"
        alt="pad"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 p-10 flex flex-col h-full pb-40">
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-wide">
              QUOTATION
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Ref: <span className="text-gray-800 font-medium">{serial}</span>
            </p>
          </div>

          <div className="text-right text-xs text-gray-600">
            <p>
              <span className="text-gray-500">Date:</span>{" "}
              <span className="text-gray-800 font-medium">{date}</span>
            </p>
          </div>
        </div>

        {/* Customer */}
        <div className="mt-4 text-xs text-gray-700 leading-relaxed">
          <p>
            <span className="text-gray-500">Customer:</span>{" "}
            <span className="text-gray-900 font-medium">{customer.name}</span>
          </p>

          <p>
            <span className="text-gray-500">Phone:</span>{" "}
            <span className="text-gray-800">{customer.phone}</span>
          </p>

          <p>
            <span className="text-gray-500">Address:</span>{" "}
            <span className="text-gray-800">{customer.address}</span>
          </p>
        </div>

        {/* Table */}
        <div className="mt-4 flex-1">
          <table className="w-full border border-gray-300 text-[11px]">
            {/* Header */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2 w-[5%]">#</th>
                <th className="border p-2 w-[12%]">Image</th>
                <th className="border p-2 w-[38%]">Product Details</th>
                <th className="border p-2 w-[10%]">Qty</th>
                <th className="border p-2 w-[15%]">Price</th>
                <th className="border p-2 w-[20%]">Total</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-gray-800">
              {products.map((p, i) => (
                <tr key={i}>
                  {/* Serial */}
                  <td className="border p-2 text-center text-gray-600">
                    {i + 1}
                  </td>

                  {/* Image */}
                  <td className="border p-2 text-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover mx-auto border"
                      />
                    ) : (
                      <span className="text-gray-400 text-[10px]">
                        No Image
                      </span>
                    )}
                  </td>

                  {/* Details */}
                  <td className="border p-2">
                    <div className="font-semibold text-gray-900">{p.name}</div>

                    <div className="text-[10px] text-gray-600 mt-1 leading-tight">
                      <p>
                        Brand: <span className="text-gray-800">{p.brand}</span>
                      </p>
                      <p>
                        Model: <span className="text-gray-800">{p.model}</span>
                      </p>
                      <p>
                        Origin:{" "}
                        <span className="text-gray-800">{p.origin || "-"}</span>
                      </p>
                    </div>
                  </td>

                  {/* Qty */}
                  <td className="border p-2 text-center text-gray-800">
                    {p.qty}
                  </td>

                  {/* Price */}
                  <td className="border p-2 text-center text-gray-800">
                    ৳{p.price}
                  </td>

                  {/* Total */}
                  <td className="border p-2 text-center font-medium text-gray-900">
                    ৳{p.qty * p.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div className="flex justify-end mt-4">
          <div className="w-1/3 border border-gray-300 bg-gray-50">
            <div className="flex justify-between p-2 text-gray-800">
              <span className="font-medium">Grand Total</span>
              <span className="font-bold text-gray-900">৳{total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-10 text-xs text-gray-700">
          <div className="text-center">
            <p className="border-t w-40 pt-1 text-gray-600">Prepared By</p>
          </div>

          <div className="text-center">
            <p className="border-t w-40 pt-1 text-gray-600">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
