import React from 'react'
import style from './style.module.scss'
import { ProductSummarySection } from '../../../../components'

//! Images Import
import ShoppingChartProduct from '../../../../components/cart product'
import productImage from '../../../../assets/images/product/Electronics/HEadphone.png'
import { ShoppingCartProductsBox } from '../inde'


const ShoppingCartContent = () => {
  return (
    <div className={style.shoppingCart_content}>
       <div className={style.cart_content_left}>
          <ShoppingCartProductsBox storeName={true}/>
       </div>

       <div className={style.cart_content_right}>
          <ProductSummarySection/>
       </div>
    </div>
  )
}

export default ShoppingCartContent