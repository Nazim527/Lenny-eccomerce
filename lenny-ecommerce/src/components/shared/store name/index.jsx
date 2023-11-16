import React from 'react'
import style from './style.module.scss'
import TitleContent from '../tittleContent'
import { Link } from 'react-router-dom'

const StoreName = ({image, title, text,price,storeNameClass,categoryId,id}) => {
  const shortTitle = (title.length > 25 ? title.slice(0,25).concat("...") : title)
  const shortDescr = (text.length > 25 ? text.slice(0,25).concat("...") : text)

  return (
    <Link to={`/categories/${categoryId}/productdetail/${id}`} className={`${style.store_name_cart} ${storeNameClass}`}>
        <div className={style.image}>
            <img src={image}/>
        </div>
        <div className={style.store_name}>
            <TitleContent title={shortTitle} content={shortDescr}/>
            {price && (
              <p className={style.price}>{`$${price}`}</p>
            )}
        </div>
    </Link>
  )
}

export default StoreName