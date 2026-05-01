import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";
/**
 * GET: Fetch all products from the inventory
 * Next.js 15+ defaults to dynamic rendering for API routes,
 * ensuring you always get the freshest data.
 */
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    // Logging the error ensures ESLint is happy and you can debug
    console.error("GET Products Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

/**
 * POST: Add a new product to the database
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    // Parse the incoming JSON body
    const data = await req.json();

    // 1. Server-side Validation
    if (!data.name || data.price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name or price" },
        { status: 400 },
      );
    }

    // 2. Data Sanitization (Optional but good practice)
    const productData = {
      name: data.name.trim(),
      brand: data.brand?.trim() || "",
      model: data.model?.trim() || "",
      origin: data.origin?.trim() || "",
      price: Number(data.price),
      image: data.image || "", // Base64 string or URL
    };

    const newProduct = await Product.create(productData);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    // Logging the specific error to your terminal
    console.error("POST Product Error:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
