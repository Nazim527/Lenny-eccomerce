import React from "react";
import { getFetchCategories } from "../../api/category";

export function Categories() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getFetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("API de xeta bas verdi!", error);
      }
    }
    fetchCategories()
  }, []);

  return categories;
}
