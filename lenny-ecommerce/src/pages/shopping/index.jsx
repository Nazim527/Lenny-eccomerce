import React from 'react'
import { ShoppingCartContent, ShoppingCartSorting } from './components/inde'
import { NotItemShopping, RelatedProduct } from '../../components'
import style from './style.module.scss'
import { useSelector } from 'react-redux'

const Shopping = () => {
  //! shopping kart bos olmasina gore UI
  const {cart} = useSelector((state) => state.cart) || []
 
  return (
    <div className={style.shopping}>
        <ShoppingCartSorting 
        shoppingTitle={"Shopping Chart"} 
        shoppingContent={"Showing your choices product"} 
        sortTrue={true}/>
        {cart.length > 0 ? (
          <ShoppingCartContent/>
        ) : (
          <NotItemShopping/>
        )}
        <RelatedProduct/>
    </div>
  )
}

export default Shopping