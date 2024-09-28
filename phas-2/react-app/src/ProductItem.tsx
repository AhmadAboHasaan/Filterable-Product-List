import React from "react";
import { Product } from "./types";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <div className="product-item">
    <img src={product.image} alt={product.name} loading="lazy" />
    <h3>{product.name}</h3>
    <p>Category: {product.category}</p>
    <p>Price: ${product.price}</p>
  </div>
);

export default ProductItem;
