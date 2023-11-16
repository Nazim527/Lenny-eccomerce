import React from "react";
import style from "./style.module.scss";
import ReactDOM from "react-dom"
import {PaypalPaymentMethod} from '../index'
import { Btn, CartModals, StoreName } from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

//! Images and Icon
import promosIcon from "../../assets/icon/pages/search/discount-shape.svg";
import { AiOutlineRight } from "react-icons/ai";

const ProductSummarySection = () => {
  const dispatch = useDispatch()
  const useChooseShoppingProducts = useSelector((state) => state.cart.cart);

  let totalPrice = 0;
  useChooseShoppingProducts.map((product) => {
    if (product.selectedProductSend) {
      totalPrice += product.price;
    }
  });

  //! Eger user daxil olmayibsa checkout sehifesine icaze vermesin
  const navigation = useNavigate()
  const {logToken} = useSelector((state) => state.auth)

  const handleNavigate = () => {
    if(logToken !== "") {
      navigation('/checkout')
    } else {
      alert("You do not have permission to access this page. Please log in or create an account to continue or access more content.")
      navigation('/shoppingcart')
    }
  } 

  //! Odenis buttonun gelmesi ucun
  const {pathname} = useLocation()
  const pathLocation = pathname.split('/').filter(x => x !== '')
  
  return (
    <CartModals className={style.product_summary}>
      <div className={style.summary_title}>
        <h1>Product Summary</h1>
      </div>

      <div className={style.summary_products_name}>
        {useChooseShoppingProducts.length > 0 &&
          useChooseShoppingProducts.map((product) => {
            if (product.selectedProductSend) {
              const shortProductName =
                product.productName.length > 20
                  ? product.productName.slice(0, 20).concat("...")
                  : product.productName;
              return (
                <div className={style.product_name_price} key={product.productId}>
                  <p>{shortProductName}</p>
                  <p>{`$${product.price}`}</p>
                </div>
              );
            }
          })}
      </div>

      <div className={style.summary_total_price_info}>
        <div className={`${style.prices} ${style.total_price}`}>
          <p>Total Price</p>
          {useChooseShoppingProducts.length > 0 ? (
            <p>{`$${totalPrice}`}</p>
          ) : (
            <p>$0</p>
          )}
        </div>
        <div className={`${style.prices} ${style.total_discount}`}>
          <p>{"Total Price(Discount)"}</p>
          <p>$0</p>
        </div>
        <div className={`${style.prices} ${style.total_fee}`}>
          <p>Tax & Fee</p>
          <p>$0</p>
        </div>
      </div>

      <div className={style.summary_total_prices}>
        <p>Total Price</p>
        {useChooseShoppingProducts.length > 0 ? (
            <p>{`$${totalPrice}`}</p>
          ) : (
            <p>$0</p>
          )}
      </div>

      <CartModals className={style.summary_promo}>
        <StoreName
          storeNameClass={style.promo_content}
          image={promosIcon}
          title={"Promo applied"}
          text={"1x shipping discount used"}
        />

        <div className={style.promo_icon}>
          <AiOutlineRight />
        </div>
      </CartModals>

      <div className={style.summary_checkout}>
          {pathLocation[0] !== "checkout" ? (
            <Btn bg={true} contentTitle={"Checkout"} onClick={handleNavigate}/>
          ) : (
            <PaypalPaymentMethod/>
          )}
      </div>
    </CartModals>
  );
};

export default ProductSummarySection;
