import React from 'react'
import style from './style.module.scss'
import MainTitle from '../mainTitle'
import { usePopularProducts } from '../../hooks/usePopularProducts'
import Product from '../product'


const RelatedProduct = () => {
    const RelatedProducts = usePopularProducts({start: 5, limit: 4});

  return (
    <div className={style.related_products}>
        <div className={style.related_header}>
            <MainTitle title={"Related Product"} contentTitle={"View Detail"}/>
        </div>

        <div className={style.related_footer}>
            {RelatedProducts?.data?.map(({id, attributes}) => {
            return (
                <Product key={id}
                id={id}
                image={`${import.meta.env.VITE_UPLOAD_IMG}${attributes?.images?.data[0].attributes.url}`}
                title={attributes.title}
                price={`$${attributes.price}`}
                content={attributes.descruption}
                rating={attributes.rating}
                productCategoryId={attributes.categories?.data[0]?.id}/>
            )
            })}
        </div>
    </div>
  )
}

export default RelatedProduct