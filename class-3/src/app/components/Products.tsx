"use client";

import { useProductStore } from "@/store/product-store";
import { useEffect } from "react";

const Products = () => {
  const modifyProduct = useProductStore((store) => store.modifyProduct);
  const products = useProductStore((store) => store.products);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modifyCart = useProductStore((store) => store.modifyCart);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const { products } = await response.json();
    modifyProduct(products.slice(0, 5));
  };

  return (
    <div className="flex justify-between items-center">
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid black",
            width: "20%",
            margin: "15px",
            padding: "15px",
            textAlign: "center",
          }}
        >
          <h3>{product.title}</h3>
          <h3>{product.price}</h3>
          <button
          className="bg-black text-white p-1.5 rounded-sm"
          // onClick={() => {
          //   addToCart(product);
          // }}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
