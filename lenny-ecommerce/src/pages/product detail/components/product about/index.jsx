import React from "react";
import style from "./style.module.scss";

//! import MUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DetailProduct, ProductReviews, ProductStore } from "../shared";
import { RelatedProduct } from "../../../../components";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductAbout = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={style.product_about}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab sx={{ width: "120px", whiteSpace: "wrap"}} label="Detail Product" {...a11yProps(0)} />
            <Tab sx={{ width: "100px", whiteSpace: "nowrap"}} label="Merchant" {...a11yProps(1)} />
            <Tab sx={{ width: "100px", whiteSpace: "nowrap"}} label="Reviews" {...a11yProps(2)} />
            <Tab sx={{ width: "100px", whiteSpace: "wrap"}} label="Related Product" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DetailProduct/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProductStore/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ProductReviews/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <RelatedProduct/>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ProductAbout;
