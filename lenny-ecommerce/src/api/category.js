import { instance } from "./index";

export const getFetchCategories = async () => {
    const resCatg = await instance.get("/categories?populate=*")

    return resCatg.data
}

//! Choose Single categories
export const getSingleCategories = async (id) => {
    const response = await instance.get(`/categories/${id}?populate=*`);
  
    return response.data
  }