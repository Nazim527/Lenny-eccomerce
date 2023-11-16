import React from 'react'
import style from './style.module.scss'
import { Link } from 'react-router-dom'

//! Import Icon and Image
import PhoneImage from '../../assets/images/product/Phone/Iphone13_1.webp'
import { TitleContent } from '../../components/shared'


const SearchResult = ({id,productsImage, productsTitle, productsPrice,productCategoryId}) => {
  const shortTitle = (productsTitle.length > 25 ? productsTitle.slice(0,15).concat("...") : productsTitle)

  return (
    <Link to={`/categories/${productCategoryId}/productdetail/${id}`}>
        <div className={style.search_result_box}>
            <div className={style.images}>
                <img src={productsImage} alt="" />
            </div>
            <div className={style.result_info}>
                <TitleContent title={shortTitle} content={`$${productsPrice}`}/>
            </div>
        </div>
    </Link>
  )
}

export default SearchResult