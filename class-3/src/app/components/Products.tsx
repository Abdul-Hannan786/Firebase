"use client";

import { useProductStore } from "@/store/product-store";
import { useEffect } from "react";

const Products = () => {
  const modifyProduct = useProductStore(store => store.modifyProduct)
  const products = useProductStore(store => store.products)
  const cart = useProductStore(store => store.cart)
  const modifyCart = useProductStore(store => store.modifyCart)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const { products: productsData  } = await response.json();
    modifyProduct(productsData.slice(0, 5))
  };

  const addToCart = (product) => {
    const updatedCart = { ...cart };

    if (updatedCart[product.id]) {
      updatedCart[product.id].qty += 1;
    } else {
      const newItem = { ...product, qty: 1 };
      updatedCart[product.id] = newItem;
    }
    modifyCart(updatedCart);
  };
  return (
    <div className="flex justify-between items-center flex-wrap">
      {products.map((product, index) => (
        <div
          key={product.id + index}
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
            onClick={() => {
              addToCart(product);
            }}
            className="px-2 p-1 bg-black text-white rounded-md"
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
