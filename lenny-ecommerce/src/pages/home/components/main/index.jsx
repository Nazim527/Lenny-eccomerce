import React from 'react';
import style from './style.module.scss';
import sy from '../../../../components/product/style.module.scss';
import { Btn, TitleContent } from '../../../../components/shared';
import { Product } from '../../../../components';
import productImageHuman from '../../../../assets/images/pages/Home/MainImg.png';
import productNavCircle from '../../../../assets/icon/pages/Home/CircleNavgPrdct.svg';
import productNavline from '../../../../assets/icon/pages/Home/Frame 48.png';

import { usePopularProducts } from '../../../../hooks/usePopularProducts';
import { Link } from 'react-router-dom';

const Main = () => {

  //! Product Fetch Data 
  const products = usePopularProducts({start: 15, limit: 1})

  return (
    <section className={style.main}>  
      <div className={style.main_left}>
        <div className={style.main_description}>
          <TitleContent
            classNames={style.main_title}
            title={"Upgrade Your Wardrobe With Our Collection"}
            content={
              "Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est ullamcorper nisl amet non mollis."
            }
          />
          <div className={style.main_btns}>
            <Btn bg={true} contentTitle={"Buy Now"} />
            <Link to={'categories/2/productdetail/16'}><Btn contentTitle={"View Detail"} /></Link>
          </div>
        </div>
      </div>

      <div className={style.main_right}>
        <div className={style.image}>
          <img src={productImageHuman} alt="Product" />
        </div>

        <div className={style.main_product}>
          <div className={style.circle_icon}>
            <img src={productNavCircle} alt="Circle Icon" />
          </div>
          <div className={style.line_icon}>
            <img src={productNavline} alt="Line Icon" />
          </div>


          {products?.data?.map(({id, attributes}) => {
            return (
              <Product key={id}
                id={id}
                image={`${import.meta.env.VITE_UPLOAD_IMG}${attributes?.images?.data[0].attributes.url}`}
                productClassName={sy.simple_product}
                title={attributes.title}
                rating={attributes.rating}
                content={attributes.descruption}
                productCategoryId={attributes.categories?.data[0]?.id}
              />
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Main;
