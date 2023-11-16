import React from 'react'
import style from './style.module.scss'
import { Btn, CartModals } from '../shared'
import { Link } from 'react-router-dom';

//!Icon and Image
import { PiShoppingCartDuotone } from "react-icons/pi";

const NotItemShoppingCart = () => {
  return (
    <CartModals className={style.empty_item}>
        <div className={style.left}>
            <div className={style.icon}>
                <PiShoppingCartDuotone/>
            </div>
            <p>There are no products on your shopping card</p>
        </div>
        <div className={style.right}>
            <Link to={'/'}>
                <Btn contentTitle={"Shopping"}/>
            </Link>
        </div>
    </CartModals>
  )
}

export default NotItemShoppingCart