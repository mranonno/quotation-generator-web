import QuotationTemplate from "../src/components/QuotationTemplate";

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-10">
      <QuotationTemplate
        serial="QTN-0001"
        date="26-04-2026"
        customer={{
          name: "Anonno Das",
          phone: "017XXXXXXXX",
          address: "Dhaka, Bangladesh",
        }}
        products={[
          {
            name: "Pulse Oximeter",
            brand: "Yonker",
            model: "YK-80A",
            qty: 2,
            price: 1200,
            image: "/product.png",
          },
          {
            name: "Thermometer",
            brand: "Omron",
            model: "MT-100",
            qty: 1,
            price: 800,
          },
        ]}
      />
    </div>
  );
}
