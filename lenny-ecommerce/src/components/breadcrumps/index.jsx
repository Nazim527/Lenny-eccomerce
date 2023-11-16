import React, { useEffect, useState } from 'react';
import style from "./style.module.scss";
import { useLocation, Link } from "react-router-dom";
import { getSingleCategories } from '../../api/category';
import { getSingleProduct } from '../../api/products';

//! Icon 
import { BiSolidChevronRight } from "react-icons/bi";

//! Breadcrumps
const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [breadcrumbs, setBreadcrumbs] = React.useState([]);

    const fetchBreadcrumbs = async () => {
      const breadcrumbData = [];
      
      breadcrumbData.push({
        name: "Home",
        link: "/",
      })
      for(let i=0; i<pathnames.length; i++) {
          let currentPath = "";
          if(pathnames[i] == "categories") {
          currentPath = `/${pathnames.slice(0,2).join("/")}`
          console.log(currentPath);
          const categoryId = pathnames[1]; 
          const category = await getSingleCategories(categoryId); 
          breadcrumbData.push({
            name: category?.data?.attributes.title,
            link: currentPath,
          });
        } else if(pathnames[i] == "productdetail"){
          currentPath = `/${pathnames.slice(0,2).join("/")}`
          const productId = pathnames[3]; 
          const product = await getSingleProduct(productId); 
          breadcrumbData.push({
            name: product?.data?.attributes.title,
            link: currentPath,
          });
        }
      }

      setBreadcrumbs(breadcrumbData);
    };


    useEffect(() => {
      fetchBreadcrumbs();
    }, [location.pathname]);

  return (
    <div className={style.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <span key={index}>{breadcrumb.name}</span>
        ) : (
          <Link key={index} to={breadcrumb.link} onClick={() => history.push(routerTo)}>
            {breadcrumb.name}
            <BiSolidChevronRight/>
          </Link>
        );
      })}
    </div>
  );
};


export default BreadCrumbs;