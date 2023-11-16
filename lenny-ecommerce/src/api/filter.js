import { instance } from "./index";
import qs from "qs";

export const FilterProducts = async (query) => {
  const strapiQuery = {
    filters: {},
  };

  //! Price Filter add
  strapiQuery["filters"]["price"] = {
    $gte: query.minBasePrice,
    $lte: query.maxBasePrice,
  };
  const queryFilter = {
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
    },
    filters: {
      categories: {
        id: {
          $eq: query.categoryId,
        },
      },
    },
  };

  //! Best Filter 
  if(query.bestFilter) {
    strapiQuery['filters']['rating'] = { $gte: query.bestFilter}
  }

  //! Color Filter 
  if(query.colorFilter) {
    strapiQuery['filters']['color'] = {$in: query.colorFilter}
  }

  //! Category Filter
  if (query.categoryFilter) {
    if (!strapiQuery.filters.categories) {
      strapiQuery.filters.categories = {};
    }
    strapiQuery['filters']['categories']['title'] = {
      $in: query.categoryFilter,
    };
  }

  //! Sorting Price
  const sortQuery = {
    sort: (query.sortAscending) ? ['price:asc'] : ['price:desc'],
  };

  //! Searching Filteration
  if(query.searchFilteration && query.searchFilteration.length) {
    strapiQuery['filters']['title'] = {$contains: query.searchFilteration}
  }


  const strapiQueryStr = qs.stringify({...strapiQuery, ... sortQuery}, { encodeValuesOnly: true });
  const queryFilterStr = qs.stringify(queryFilter, { encodeValuesOnly: true });
  const res = await instance.get(
    `/products?populate=*&${strapiQueryStr}&${queryFilterStr}`
  );
  const filtProductData = res.data;

  return filtProductData;
};
