import { instance } from "./index";
import qs from 'qs';

export const getPagesProducts = async ({ categoryId,page, pageSize} = {}) => {
  const query = qs.stringify(
    {
      pagination: {
        page,
        pageSize,
      },
      filters: {
        categories: {
          id: {
            $eq: categoryId,
          }
        },
      },  
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await instance.get(`/products?populate=*&${query}`);

  return res.data;
};
