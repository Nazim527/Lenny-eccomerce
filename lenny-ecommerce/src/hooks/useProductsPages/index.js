import React from "react";
import { getPagesProducts } from "../../api/pagesProducts";

export function usePagesProducts({ categoryId,page = 1, pageSize = 15 } = {}) {
  const [pagesProducts, setPagesProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPagesProducts() {
      try {
        const data = await getPagesProducts({ categoryId,page,pageSize });
        setPagesProducts(data);
      } catch (error) {
        console.error("Pages API de xeta bas verdi!", error);
      } 
    }

    fetchPagesProducts()
  }, [categoryId,page, pageSize]);

  return pagesProducts
}
