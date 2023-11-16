import React from "react";
import { FilterProducts } from "../../api/filter";

export function useProductFilters({
  minBasePrice,
  maxBasePrice,
  page = 1,
  pageSize = 15,
  categoryId,
  bestFilter,
  colorFilter,
  categoryFilter,
  sortAscending,
  searchFilteration
}) {
  const [filterProductsData, setFilterProductsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    async function getFilterPrice() {
      try {
        const dataFilter = await FilterProducts({
          minBasePrice,
          maxBasePrice,
          page,
          pageSize,
          categoryId,
          bestFilter,
          colorFilter,
          categoryFilter,
          sortAscending,
          searchFilteration
        });

        if (isMounted) {
          setFilterProductsData(dataFilter);
          setLoading(false);
        }
      } catch (error) {
        console.log("Filter  API Error");
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getFilterPrice();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [minBasePrice, 
      maxBasePrice, 
      page, 
      pageSize, 
      categoryId,
      bestFilter,
      colorFilter,
      categoryFilter,
      sortAscending,
      searchFilteration]);

  return { filterProductsData, loading };
}
