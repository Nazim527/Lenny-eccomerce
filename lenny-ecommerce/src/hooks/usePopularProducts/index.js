import React from "react";
import { getProducts } from "../../api/products";

export function usePopularProducts({ start = 0, limit = 15 } = {}) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPopularProducts() {
      try {
        const data = await getProducts({ start, limit });
        setProducts(data);
      } catch (error) {
        console.error("API de xeta bas verdi!", error);
      }
    }

    fetchPopularProducts()
  }, [start, limit]);

  return products
}
