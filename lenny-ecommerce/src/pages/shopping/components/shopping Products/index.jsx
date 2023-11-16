import React from 'react'
import style from './style.module.scss'
import ShoppingChartProduct from '../../../../components/cart product'
import { CartModals, StoreName } from '../../../../components/shared'
import { useSelector } from 'react-redux'


//!Image and Icon 
import CargoIcon from '../../../../assets/icon/pages/checkout/ShippingCargo.svg'
import storeNameIcon from '../../../../assets/images/pages/detail product/Ellipse 15.png'
import { BsChevronCompactDown } from "react-icons/bs";

const ShippingProductsCart = ({storeName,ShippingTrack}) => {

    //!Elave elediyimiz Productlarin gorsenmesi ucun
    const ShoppingProducts = useSelector((state) => state.cart.cart)
    console.log(ShoppingProducts);
    return (
    <CartModals className={style.shippingProductsBox}>
        {storeName && (
            <div className={style.shippingProductsBox_header}>
                <StoreName 
                image={storeNameIcon}
                storeNameClass={style.product_store_name}
                title={"Logitech Indonesia"}
                text={"Central Jakarta"}/>
            </div>
        )}

        <div className={style.shippingProductsBox_content}>
            {ShoppingProducts.map((product) => {
                return (
                    <ShoppingChartProduct
                    key={product.productId}
                    id={product.productId}  
                    image={product.productImage}
                    productName={product.productName}
                    productDescuption={product.description}
                    price={product.price}
                    categoryId={product.categoryId}
                    />
                )
            })}
        </div>

        {ShippingTrack && (
            <div className={style.shippingProductsBox_footer}>
                <h1>Shipping</h1>
                <CartModals className={style.shippingProductsBox_cargo_box}>
                    <StoreName
                    storeNameClass={style.cargo_store}
                    image={CargoIcon}
                    title={"TIKI"}
                    text={"TIKI Supercepat"}/>

                    <div className={style.cargo_box_right}>
                        <p>$129</p>
                        <BsChevronCompactDown/>
                    </div>
                </CartModals>
            </div>
        )}
    </CartModals>
  )
}

export default ShippingProductsCart