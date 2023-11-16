import React from "react";
import { getAllBlogs } from "../../api/blog";

export function GetBlogs() {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    async function getFetchBlogs() {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Blogs API de xeta bas verdi!", error);
      }
    }

    getFetchBlogs()
  }, []);

  return blogs
}
