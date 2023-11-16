import React from "react";
import { BreadCrumbs, SortSection } from "../../components";
import { SearchContent } from "./components/index";
import { useProductFilters } from "../../hooks/useFilterPriceProducts";
import { CategoryProvider } from "../../store/category Provider";

const Search = () => {

  return (
    <>
      <BreadCrumbs />
      <CategoryProvider>
        <SortSection />
        <SearchContent />
      </CategoryProvider>
    </>
  );
};

export default Search;
