"use client";

import { useState } from "react";
import ListProduct from "./list-product";
import { InitialProducts } from "@/app/(tabs)/products/page";
import { getMoreProducts } from "@/app/products/[id]/actions";

interface ProductListProps {
  initialProducts: InitialProducts;
  //   initialProducts: {
  //     title: string;
  //     price: number;
  //     created_at: Date;
  //     photo: string;
  //     id: number;
  //   }[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <button
        onClick={onLoadMoreClick}
        disabled={isLoading}
        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
      >
        {isLoading ? "로딩중" : "Load More"}
      </button>
    </div>
  );
}
