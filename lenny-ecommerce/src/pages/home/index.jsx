import React from "react";
import {
  FeaturedCatg,
  LenysArtc,
  Main,
  PopularPrdct,
  ProductInfo,
} from "./components";

const Home = () => {
  return (
    <>
      <Main />
      <FeaturedCatg/>
      <PopularPrdct/>
      <ProductInfo/>
      <LenysArtc/>
    </>
  );
};

export default Home;
