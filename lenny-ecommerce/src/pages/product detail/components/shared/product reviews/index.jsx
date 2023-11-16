import React from "react";
import style from "./style.module.scss";
import CartModal from "../../../../../components/shared/cartModal";
import { MainTitle } from "../../../../../components";
import { Btn, TitleContent } from "../../../../../components/shared";

//! Image and Icon
import { BiFilterAlt, BiLike, BiDislike } from "react-icons/bi";
import headerRating from "../../../../../assets/images/pages/detail product/review_star.png";
import ball5 from "../../../../../assets/images/pages/detail product/review_5.png";
import ball4 from "../../../../../assets/images/pages/detail product/review_4.png";
import ball3 from "../../../../../assets/images/pages/detail product/review_3.png";
import ball2 from "../../../../../assets/images/pages/detail product/review_2.png";
import ball1 from "../../../../../assets/images/pages/detail product/1.png";
import review1 from "../../../../../assets/images/pages/detail product/Man_1.png";
import review2 from "../../../../../assets/images/pages/detail product/Man_2.png";
import review3 from "../../../../../assets/images/pages/detail product/Man_3.png";
import review4 from "../../../../../assets/images/pages/detail product/Man_4.png";
import star from "../../../../../assets/icon/product/star.svg";

//!Import MUI

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


const ProductReviews = () => {
  return (
    <div className={style.product_review}>
      <MainTitle title={"Product Reviews"} mainClassName={style.review_title}/>
      <CartModal className={style.review_header}>
        <div className={style.header_left}>
          <img src={headerRating} />
        </div>
        <div className={style.header_right}>
          <div className={style.rating_ball}>
            <img src={ball5} alt="" />
          </div>
          <div className={style.rating_ball}>
            <img src={ball4} alt="" />
          </div>
          <div className={style.rating_ball}>
            <img src={ball3} alt="" />
          </div>
          <div className={style.rating_ball}>
            <img src={ball2} alt="" />
          </div>
          <div className={style.rating_ball}>
            <img src={ball1} alt="" />
          </div>
        </div>
      </CartModal>

      <div className={style.review_footer}>
        <div className={style.footer_left}>
          <CartModal className={style.filter}>
            <h3>Reviews Filter</h3>
            <div className={style.line}></div>

            <div className={style.filter_group}>
              <div className={style.acardition_best}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={style.acardition_header}>
                      Best Filter
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails className={style.boxs_acardition}>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="5" />
                      <span>
                        <img src={star} alt="" />
                        <label htmlFor="5">5</label>
                      </span>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="4" />
                      <span>
                        <img src={star} alt="" />
                        <label htmlFor="4">4</label>
                      </span>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="3" />
                      <span>
                        <img src={star} alt="" />
                        <label htmlFor="3">3</label>
                      </span>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="2" />
                      <span>
                        <img src={star} alt="" />
                        <label htmlFor="2">2</label>
                      </span>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="1" />
                      <span>
                        <img src={star} alt="" />
                        <label htmlFor="1">1</label>
                      </span>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>

              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={style.acardition_header}>
                      Review Topics
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails className={style.boxs_acardition}>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="Product Quality" />
                      <label htmlFor="Product Quality">Product Quality</label>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="Seller Services" />
                      <label htmlFor="Seller Services">Seller Services</label>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="Product Price" />
                      <label htmlFor="Product Price">Product Price</label>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="Shipment" />
                      <label htmlFor="Shipment">Shipment</label>
                    </Typography>
                    <Typography className={style.customTypography}>
                      <input type="checkbox" id="Match with Description" />
                      <label htmlFor="Match with Description">
                        Match with Description
                      </label>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </CartModal>
        </div>

        <div className={style.footer_right}>
          {/* //!Reviews List Header */}
          <div className={style.review_list_header}>
            <h3>Review Lists</h3>

            <div className={style.btns}>
              <div className={style.reviews_btns}>
                <button>All Reviews</button>
                <button>With Photo & Video</button>
                <button>With Description</button>
              </div>

              <button className={style.filter_btn}>
                <BiFilterAlt />
              </button>
            </div>
          </div>

          {/* //!Reviews List Footer */}
          <div className={style.review_list_footer}>
            <div className={style.client_review}>
              <div className={style.client_review_header}>
                <div className={style.stars}>
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                </div>

                <TitleContent
                  title={"This is amazing product I have."}
                  content={"July 2, 2020 03:29 PM"}
                />
              </div>

              {/* //! Reviews Client info */}
              <div className={style.client_review_footer}>
                <div className={style.client_profile}>
                  <div className={style.profile_img}>
                    <img src={review1} alt="" />
                  </div>
                  <h4>Darrell Steward</h4>
                </div>
                <div className={style.client_btns}>
                  <div className={style.active}>
                    <Btn icon={<BiLike />} contentTitle={"128"} />
                  </div>
                  <Btn icon={<BiDislike />} />
                </div>
              </div>
            </div>

            <div className={style.line}></div>

            <div className={style.client_review}>
              <div className={style.client_review_header}>
                <div className={style.stars}>
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                </div>

                <TitleContent
                  title={"This is amazing product I have."}
                  content={"July 2, 2020 03:29 PM"}
                />
              </div>

              {/* //! Reviews Client info */}
              <div className={style.client_review_footer}>
                <div className={style.client_profile}>
                  <div className={style.profile_img}>
                    <img src={review2} alt="" />
                  </div>
                  <h4>Darlene Robertson</h4>
                </div>
                <div className={style.client_btns}>
                  <Btn icon={<BiLike />} contentTitle={"82"} />
                  <Btn icon={<BiDislike />} />
                </div>
              </div>
            </div>

            <div className={style.line}></div>

            <div className={style.client_review}>
              <div className={style.client_review_header}>
                <div className={style.stars}>
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                </div>

                <TitleContent
                  title={"This is amazing product I have."}
                  content={"July 2, 2020 03:29 PM"}
                />
              </div>

              {/* //! Reviews Client info */}
              <div className={style.client_review_footer}>
                <div className={style.client_profile}>
                  <div className={style.profile_img}>
                    <img src={review3} alt="" />
                  </div>
                  <h4>Kathryn Murphy</h4>
                </div>
                <div className={style.client_btns}>
                  <Btn icon={<BiLike />} contentTitle={"9"} />
                  <Btn icon={<BiDislike />} />
                </div>
              </div>
            </div>

            <div className={style.line}></div>

            <div className={style.client_review}>
              <div className={style.client_review_header}>
                <div className={style.stars}>
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                  <img src={star} />
                </div>

                <TitleContent
                  title={"This is amazing product I have."}
                  content={"July 2, 2020 03:29 PM"}
                />
              </div>

              {/* //! Reviews Client info */}
              <div className={style.client_review_footer}>
                <div className={style.client_profile}>
                  <div className={style.profile_img}>
                    <img src={review4} alt="" />
                  </div>
                  <h4>Ronald Richards</h4>
                </div>
                <div className={style.client_btns}>
                  <Btn icon={<BiLike />} contentTitle={"124"} />
                  <Btn icon={<BiDislike />} />
                </div>
              </div>
            </div>

            <div className={style.pages_num}>
              <Stack sx={{width: 360}}>
                <Pagination 
                count={105} 
                variant="outlined" 
                shape="rounded"
                size="medium" 
                sx={{
                '& .MuiPaginationItem-page': {
                    width: '0',
                },
                }} />
              </Stack>
            </div>
            <div className={style.line}></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
