import { Product } from "@/types/product";

export const calcTotal = (products: Product[]) =>
  products.reduce((sum, p) => sum + p.qty * p.price, 0);
