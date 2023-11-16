import React from "react";
import star from "../../assets/icon/product/star.svg";
import heart from "../../assets/icon/product/Hearth.svg";
import TitleContent from "../shared/tittleContent";
import style from "./style.module.scss";
import { Link, useParams } from "react-router-dom";

//! Gonderilen basliqin uzunlugun mueyyen edib onu qabagini almaq ucun
const truntanceText = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
};

const Product = ({
  id,
  image,
  title,
  content,
  price,
  rating,
  productClassName,
  productCategoryId
}) => {
  //? Categoriesde gelen Id nigebul edirem

  const truntanceTitle = truntanceText(title, 25);
  const truntanceDescription = truntanceText(content, 25);

  return (
    <Link to={`/categories/${productCategoryId}/productdetail/${id}`}>
      <div className={`${style.product_box} ${productClassName}`}>
        <div className={style.box_header}>
          <div className={`${style.image}`}>
            <img src={image} alt="" />
          </div>
          <div className={style.icon}>
            <img src={heart} alt="" />
          </div>
        </div>

        <div className={style.box_footer}>
          <div className={style.footer_top}>
            <TitleContent
              title={truntanceTitle}
              content={truntanceDescription}
            />
            <div className={style.price}>
              <h3>{price}</h3>
            </div>
          </div>
          <div className={style.footer_bottom}>
            <div className={style.star}>
              <img src={star} alt="" />
            </div>
            <p>{rating}</p>
            <span className={style.diff_elips}></span>
            <p>1,238 sold</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
