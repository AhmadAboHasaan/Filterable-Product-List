import React from "react";
import { Product } from "./types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div id="product-display">
    {products.map((product) => (
      <ProductItem key={product.name} product={product} />
    ))}
  </div>
);

export default ProductList;
