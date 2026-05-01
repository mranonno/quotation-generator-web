import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: String,
    model: String,
    origin: String,
    price: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true },
);

// This ensures we don't try to create the model twice
const Product = models.Product || model("Product", ProductSchema);

export default Product;
