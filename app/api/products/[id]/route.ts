import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

/**
 * UPDATE PRODUCT (PUT)
 * Handles updating a specific product by its ID.
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // params is now a Promise
) {
  try {
    await connectDB();

    // 1. Await params to get the ID
    const { id } = await params;

    // 2. Get the update data from the request body
    const data = await req.json();

    // 3. Update the document in MongoDB
    const updated = await Product.findByIdAndUpdate(id, data, {
      new: true, // Returns the updated document instead of the old one
      runValidators: true, // Ensures the update follows your schema rules
    });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

/**
 * DELETE PRODUCT (DELETE)
 * Handles removing a specific product from the database.
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // params is now a Promise
) {
  try {
    await connectDB();

    // 1. Await params to get the ID
    const { id } = await params;

    // 2. Delete the document
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
