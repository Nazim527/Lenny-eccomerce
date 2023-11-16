import { instance } from "./index";

export const getAllBlogs = async () => {
    const resBlog = await instance.get("/blogs?populate=*")

    return resBlog.data
}