import React from "react";
import style from "./style.module.scss";

//!Icon and Image
import { BiStore } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import storeImg from "../../../../../assets/images/pages/detail product/Ellipse 15.png";
import { Btn, TitleContent } from "../../../../../components/shared";
import { MainTitle } from "../../../../../components";

const ProductStore = () => {
  return (
    <div className={style.product_store}>
      <MainTitle title={"Merchant Information"} mainClassName={style.store_title}/>
      <div className={style.store_footer}>
        <div className={style.left_store}>
          <div className={style.store_icon}>
            <img src={storeImg} />
          </div>

          <div className={style.store_info}>
            <TitleContent
              title={"Logitech Indonesia"}
              content={"Jakarta Pusat"}
            />
            <div className={style.store_success}>
              <span>Top Rated Merchant</span>
              <span>Best Merchant</span>
            </div>
          </div>
        </div>

        <div className={style.right_store}>
          <Btn icon={<BsChatSquareText />} contentTitle={"Chat"} />
          <Btn icon={<BiStore />} contentTitle={"Visit Merchant"} />
        </div>
      </div>
    </div>
  );
};

export default ProductStore;
