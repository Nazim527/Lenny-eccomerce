import React from 'react'
import style from './style.module.scss'
import { Btn, TitleContent } from '../../../../components/shared'
import { Product } from '../../../../components'
import { usePopularProducts } from '../../../../hooks/usePopularProducts'


import FadeLoader from "react-spinners/FadeLoader";

const popularPrdct = () => {
  const [showLoadLess, setShowLoadLess] = React.useState(false);
  const [start, setStart] = React.useState(0)
  const [limit, setLimit] = React.useState(8)

  //! Product Fetch Data 
  const produts = usePopularProducts({start,limit})

  const handleLoadMore = () => {
    setLimit((prev) => prev + 8)
    if (limit == 16) {
      setShowLoadLess(true)
    }

    window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' });
  }

  const handleLoadLess = () => {
    setLimit((prev) => prev - 8)
    console.log(limit);
    if(limit == 16) {
      setShowLoadLess(false)
    }

    window.scrollTo({ top: window.scrollY - window.innerHeight - 150, behavior: 'smooth' });
  }

  //!Loading 
  if (!produts || !produts?.data) {
    return (
      <div className={style.loading}>
        <FadeLoader
        color={"#10322b"}
        size={100}/>
      </div>
    )
  }

  return (
    <section className={style.popular_products}>
      <TitleContent classNames={style.popular_title} 
      title={"Popular Product on Lenny"} 
      content={"Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in"}/>
      
      <div className={style.product_boxes}>
        {produts?.data?.map(({id, attributes}) => {
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

      <div className={style.btns}>
        <Btn 
        contentTitle={showLoadLess ? "Load Less" : "Load More"}
        onClick={showLoadLess ? handleLoadLess : handleLoadMore}/>
      </div>
    </section>
  )
}

export default popularPrdct