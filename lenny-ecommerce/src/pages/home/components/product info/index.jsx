import React from 'react'
import style from './style.module.scss'

//!image and Icon
import ProductImage from '../../../../assets/images/pages/Home/iPad Air 2020.png'
import { Btn, TitleContent } from '../../../../components/shared'

const productInfo = () => {
  return (
    <section className={style.product_info}>
      <div className={style.products}>
        <div className={style.product_left}>
          <img src={ProductImage} alt="" />
        </div>  
        
        <div className={style.product_right}>
          <div className={style.product_about}>
            <TitleContent classNames={style.product_title} 
            title={"Ipad Air Gen 5"} 
            content={"Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in sapien quam risus sed diam."}/>
           
            <div className={style.btns}>
              <Btn bg={true} contentTitle={"Buy $900"}/>
              <Btn contentTitle={"View Detail"}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default productInfo  