import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import { MainTitle } from "../../../../components";
import FeaturedCatgList from "../shared/featurecCatgList";
import { Categories } from "../../../../hooks/useCategories";


//! import Swiper JS
import "swiper/css";
import "swiper/css/scrollbar";
//! import required modules
import { Scrollbar, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const FeaturedCatg = () => {
  //! Ekran genisligine gore slider yerlesmesi
  const breakpoints = {
    1600: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    997: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    778: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    568: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    280: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  };

 

  //! Categories Fetch Data
  const categories = Categories();

  return (
    <section className={style.featured_category}>
      <MainTitle
        title={"Featured Category"}
        contentTitle={"View Detail"}
        mainClassName={style.category_header}
      />

      {/* //!Slider */}
      <div className={style.swipper_footer}>
        <Swiper
          breakpoints={breakpoints}
          scrollbar={{
            hide: false,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {categories?.data?.map(({id, attributes}) => {
            return (
              <SwiperSlide key={id}>
                <div style={{cursor: "pointer"}}>
                  <FeaturedCatgList
                  id={id}
                  icon={`${import.meta.env.VITE_UPLOAD_IMG}${attributes?.images?.data.attributes.url}`}
                  title={attributes.title}
                  content={`${attributes.pieces}K Product`}/>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedCatg;
