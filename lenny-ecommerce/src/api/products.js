import { instance } from "./index";
import qs from 'qs';

export const getProducts = async ({ start = 0, limit = 25 } = {}) => {
  const query = qs.stringify(
    {
      pagination: {
        start,
        limit,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await instance.get(`/products?populate=*&${query}`);

  return res.data;
};

//! Choose Single Product
export const getSingleProduct = async (id) => {
  const response = await instance.get(`/products/${id}?populate=*`);

  return response.data
}

//! get All products 
export const getAllProduct = async () => {
  const response = await instance.get(`/products?populate=*`);

  return response.data
}