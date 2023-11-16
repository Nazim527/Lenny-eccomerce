import React from "react";
import {
  ShoppingCartProductsBox,
  ShoppingCartSorting,
} from "../shopping/components/inde";
import style from "./style.module.scss";
import ShippingAddress from "./components/shipping adrress";
import { NotItemShopping, ProductSummarySection } from "../../components";
import { useSelector } from "react-redux";

const CheckoutSection = () => {
  //! Checkoutun bos olmasina gore UI
  const { cart } = useSelector((state) => state.cart) || [];

  return (
    <div className={style.checkout_section}>
      <ShoppingCartSorting
        shoppingTitle={"Checkout"}
        shoppingContent={"Showing your choices product"}
      />

      {cart.length > 0 ? (
        <div className={style.checkout_section_content}>
          <div className={style.checkout_content_left}>
            <ShippingAddress />
            <ShoppingCartProductsBox ShippingTrack={true} />
          </div>
          <div className={style.checkout_content_right}>
            <ProductSummarySection />
          </div>
        </div>
      ) : (
        <NotItemShopping />
      )}
    </div>
  );
};

export default CheckoutSection;
