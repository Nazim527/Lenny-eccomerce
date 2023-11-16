import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import { useParams } from "react-router-dom";
import { useChooseSingleProduct } from "../../../../hooks/useChooseProduct";
import ProductInfoContent from "../shared/product info content";

//! Import MUI
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {Zoom, FreeMode, Navigation, Thumbs } from "swiper/modules";
import FadeLoader from "react-spinners/FadeLoader";

const ProductInfo = () => {
  //! MUI
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //! Selected Product
  const {id} = useParams()
  const {data} = useChooseSingleProduct({id})

  const selectedProduct = data?.attributes
  const ProductsImage = data?.attributes?.images?.data


  //! Loading 
  if (!ProductsImage || !selectedProduct) {
    return (
      <div className={style.loading}>
        <FadeLoader
        color={"#10322b"}
        size={100}/>
      </div>
    )
  }

  return (
    <section className={style.product_info}>
      <div className={style.left_image}>
        <Swiper
          key={id}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#f0f8ff",
            height: "380px",
            marginBottom: "8px",
            backgroundColor: "#F6F6F6",
            borderRadius: "9px"
          }}
          spaceBetween={20}
          zoom={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Zoom,FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >

          //! Product Slider Images
          {ProductsImage.map(({id,attributes}) => {
            return (
              <SwiperSlide key={id} style={{display: "flex", justifyContent: "center", alignItems: "center", color: "black"}}>
                <img 
                style={{width: "60%", height: "70%", objectFit: "contain"}} 
                src={`${import.meta.env.VITE_UPLOAD_IMG}${attributes.url}`} />
              </SwiperSlide>
            )
          })}
        </Swiper>  
        <Swiper
          onSwixper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          id={style.swippper}
        >
            {ProductsImage.map(({id,attributes}) => {
              return (
                <SwiperSlide key={id} style={{
                  display: "flex", 
                  height: "130px",
                  justifyContent: "center", 
                  alignItems: "center",
                  backgroundColor: "#F6F6F6",
                  borderRadius: "9px"
                  }}>
                  <img  
                  style={{width: "50%", height: "50%"}} 
                  src={`${import.meta.env.VITE_UPLOAD_IMG}${attributes.url}`} />
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>

      <div className={style.right_info}>
        <ProductInfoContent 
        productImage={`${import.meta.env.VITE_UPLOAD_IMG}${ProductsImage[0].attributes.url}`}
        productName={selectedProduct.title}
        price={selectedProduct.price}
        rating={selectedProduct.rating}
        description={selectedProduct.descruption}
        productColor={selectedProduct.color}
        productType={selectedProduct.Type}
        productId={data.id}
        OrginalPrice={selectedProduct.price}
        categoryId={selectedProduct.categories.data[0].id}
        />
      </div>
    </section>
  );
};

export default ProductInfo;
