import React from 'react'
import style from './style.module.scss'
import { TitleContent } from '../../../../components/shared'

const ShoppingCartSort = ({shoppingTitle, shoppingContent, sortTrue}) => {
  return (
    <div className={style.shopping_sort}>
        <div className={style.sort_left}>
          <TitleContent
          classNames={style.shoppingCart_title}
          title={shoppingTitle}
          content={shoppingContent}/>
        </div>
        {sortTrue && (
          <div className={style.sort_right}>
           <div className={style.sort_product}>
             <p>Sort By:</p>
             <select>
               <option value="2">Latest Added</option>
               <option value="1">Before Added</option>
             </select>
           </div>
         </div>
        )}
    </div>
  )
}

export default ShoppingCartSort