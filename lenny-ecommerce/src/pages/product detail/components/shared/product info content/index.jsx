import React, { useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";

//! Image and Icon Import
import { RiShoppingCart2Line } from "react-icons/ri";
import star from "../../../../../assets/icon/product/star.svg";

//! MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Btn } from "../../../../../components/shared";
import { addToCArt } from "../../../../shopping/redux/store/reducer/cartSlice";

const ProductInfoContent = ({
  productId,
  productImage,
  productName,
  rating,
  price,
  OrginalPrice,
  description,
  productColor,
  productType,
  categoryId}) => {
  const [type, setType] = React.useState("");
  const [color, setColor] = React.useState("");

  //! Redux add to Cart
  const dispatch = useDispatch();


  const handleBtn = (e) => {
    if(e.target.className != "_bg_green_sw9yu_16") {
      dispatch(addToCArt({ 
        productId,
        categoryId,
        productImage,
        productName, 
        price, 
        description,
        OrginalPrice,
        selectedProductSend: false,
        quantityProduct: 1}))
    }
  }

  return (
    <div className={style.product_info_content}>
      <div className={style.info_header}>
        <div className={style.product_sell_info}>
          <div className={style.product_title}>
            <h2>{productName}</h2>
            <div className={style.product_rating_info}>
              <div className={style.star}>
                <img src={star} alt="" />
              </div>
              <p>{rating}</p>
              <span className={style.diff_elips}></span>
              <p>1,238 sold</p>
            </div>
          </div>

          <div className={style.product_price}>
            <h3>{`$${price}`}</h3>
          </div>
        </div>

        <div className={style.product_description}>
          <p>{description}</p>
        </div>
      </div>

      <div className={style.line}></div>

      <div className={style.info_footer}>
        <div className={style.product_variant}>
          <h4>Product Variant:</h4>

          <div className={style.choose_variant}>
            <div className={style.variant_type}>
              <h6>Type</h6>
              <FormControl sx={{ m: 1, minWidth: 150, margin: 0, marginTop: 1.8 }} size="small">
                <InputLabel id="" 
                sx={{background: "#FFF",
                borderLeft: "5px solid #fff",
                borderRight: "5px solid #fff",}}>
                  Type product
                </InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  value={productType}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                >
                  <MenuItem value={productType}>{productType}</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={style.variant_color}>
              <h6>Color</h6>
              <FormControl sx={{ m: 1, minWidth: 150, margin: 0, marginTop: 1.8 }} size="small">
                <InputLabel id="" 
                sx={{background: "#FFF",
                borderLeft: "5px solid #fff",
                borderRight: "5px solid #fff",}}>
                  Color product
                </InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  value={productColor}
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={productColor}>{productColor}</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className={style.product_btns} onClick={handleBtn}>
          <Btn bg={true} contentTitle={"Buy Now"} />
          <Btn icon={<RiShoppingCart2Line />}  contentTitle={"Add To Cart"}/>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoContent;
