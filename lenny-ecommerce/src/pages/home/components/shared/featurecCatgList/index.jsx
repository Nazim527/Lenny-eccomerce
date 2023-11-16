import React from "react";
import { CartModals, TitleContent } from "../../../../../components/shared";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const FeaturedCatgList = ({ id, icon, title, content }) => {
  return (
    <Link to={`/categories/${id}`}>
      <CartModals className={style.cart_list}>
        <div className={style.cart_icon}>
          <img src={icon} alt="" />
        </div>
        <TitleContent
          classNames={style.list_title}
          title={title}
          content={content}
        />
      </CartModals>
    </Link>
  );
};

export default FeaturedCatgList;
