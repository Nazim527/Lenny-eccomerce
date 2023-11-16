import React from "react";
import styles from "./style.module.scss";

const CartModal = ({className, children }) => {
  return (
    <>
      <div className={`${styles.cart_modal} ${className}`}>{children}</div>
    </>
  );
};

export default CartModal;
