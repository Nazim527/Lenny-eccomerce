import React from "react";
import CartModal from "../../../../components/shared/cartModal";
import style from "./style.module.scss";
import { Product } from "../../../../components";
import { usePagesProducts } from "../../../../hooks/useProductsPages";
import { useLocation, useParams } from "react-router-dom";
import { useProductFilters } from "../../../../hooks/useFilterPriceProducts";
import { useCategory, useShowMobileFilter, useShowProductsTotal } from "../../../../store/category Provider";
import { useLocalStorage } from "../../../../hooks/useLocalStroge";
import { CartModals } from "../../../../components/shared";


//! Import icon
import star from '../../../../assets/icon/product/star.svg'
import { CgClose } from "react-icons/cg";

//!Import MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FadeLoader from "react-spinners/FadeLoader";


const SearchContent = () => {
  //!ShowCategories
  const [showCategories,setShowCategories] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  }
  //! Show All Products
  const { id } = useParams();

  const fetchProducts = usePagesProducts({categoryId: id,
  page: currentPage, pageSize: 9})
  let UiProducts = fetchProducts?.data || []
  let pagesNumCount = fetchProducts?.meta

  //! Checkboxun LocalStorge da saxlanmasi
  const [bestCheckInput, setBestCheckInput] = React.useState(() => {
    const storedBestFilterChecked = localStorage.getItem('bestFilterChecked');
    return storedBestFilterChecked ? JSON.parse(storedBestFilterChecked) : {};
  });

   const [colorFilterChecked, setColorFilterChecked] = React.useState(() => {
    const storedColorFilterChecked = localStorage.getItem('colorFilterChecked');
    return storedColorFilterChecked ? JSON.parse(storedColorFilterChecked) : {};
  });

   const [categoryFilterChecked, setCategoryFilterChecked] = React.useState(() => {
    const storedCategoryFilterChecked = localStorage.getItem('categoryFilterChecked');
    return storedCategoryFilterChecked ? JSON.parse(storedCategoryFilterChecked) : {};
  });

  //! Color LocalStroge
  React.useEffect(() => {
    localStorage.setItem('colorFilterChecked', JSON.stringify(colorFilterChecked));
  }, [colorFilterChecked]);
 
 //! Best LocalStroge
 React.useEffect(() => {
    localStorage.setItem('bestFilterChecked', JSON.stringify(bestCheckInput));
  }, [bestCheckInput]);

  //!Category LocalStroge
  React.useEffect(() => {
    localStorage.setItem('categoryFilterChecked', JSON.stringify(categoryFilterChecked));
  }, [categoryFilterChecked]);
 


  //! Filter Products
  const [starRating,setStarRating] = useLocalStorage('starRating', '');
  const [chooseColorProducts, setChooseColorProducts] = useLocalStorage('chooseColorProducts', []);
  const [chooseCategoryProducts, setChooseCategoryProducts] = useLocalStorage('chooseCategoryProducts', []);
   
  
  //! Category Filter
   const handleCategoryName = (e) => {
    if (!e) {
      return;
    }
    const categoryName = e.target.name;
    const isChecked = e.target.checked

    setCategoryFilterChecked((prev) => ({
      ...prev,
      [categoryName]: isChecked
    }))

    if(chooseCategoryProducts.includes(categoryName)) {
      setChooseCategoryProducts(chooseCategoryProducts.filter(category => category !== categoryName))
    } else {
      setChooseCategoryProducts([...chooseCategoryProducts, categoryName])
    }
  }


  //! Bug solved: CategoryId nin bizim category secimlerimize gore uygunlasmasi
  const categoryIdToApply = chooseCategoryProducts.length > 0 ? undefined : id


  //! Sorting 
  const {currentCategory} = useCategory()
  const sortAscending = currentCategory?.sortAscending ?? true;

  //!Price Filter
  const [selectedPriceRange, setSelectedPriceRange] = useLocalStorage('selectedPriceRange', {})
  const [activeButton, setActiveButton] = React.useState("")
  const handleFilterClick = ({minPrice, maxPrice}, buttonActive) => {
    setSelectedPriceRange({minPrice, maxPrice})
    setActiveButton(buttonActive)
    
    if(buttonActive == "minimal") {
      setMinPrice("1")
      setMaxPrice("200")
    } else if(buttonActive == "midle") {
      setMinPrice("250")
      setMaxPrice("500")
    } else if (buttonActive == "expensive"){
      setMinPrice("500")
      setMaxPrice("1500")
    }
  }

  //! Active button 
  React.useEffect(() => {
    localStorage.setItem('activeButton', activeButton)

  },[activeButton])

  //? Sehife yenilendikde Local bosalmagini onlemek ucun
  React.useEffect(() => {
    const storedActiveButtons = localStorage.getItem('activeButton')
    if(storedActiveButtons) {
      setActiveButton(storedActiveButtons)
    }
  }, [])

  const storedActiveButton = localStorage.getItem('activeButton');
  if (!activeButton && storedActiveButton) {
    setActiveButton(storedActiveButton);
  }
  
  //*Fetching filtered products data
  const {filterProductsData} = useProductFilters({
    minBasePrice: selectedPriceRange['minPrice'], 
    maxBasePrice: selectedPriceRange['maxPrice'],
    bestFilter: starRating,
    colorFilter: chooseColorProducts,
    categoryFilter: chooseCategoryProducts,
    page: currentPage,
    pageSize: 9,
    categoryId: categoryIdToApply,
    sortAscending: sortAscending
  })
  
  //! Total sayi Show Productsa gondermek ucun
  const {setShowProductTotal} = useShowProductsTotal()
  setShowProductTotal(filterProductsData.meta)

  const priceFilterProdData = filterProductsData?.data
  if (selectedPriceRange.minPrice || (priceFilterProdData && priceFilterProdData.length >= 0)) {
    UiProducts = priceFilterProdData || [];
    pagesNumCount = filterProductsData?.meta
  } else if(selectedPriceRange.minPrice == "0") {
    UiProducts = fetchProducts?.data || []
    pagesNumCount = fetchProducts?.meta
  }

  //!Input text Min and Max Price products
  const [minPrice, setMinPrice] = useLocalStorage('minPrice', '');
  const [maxPrice, setMaxPrice] = useLocalStorage('maxPrice', ''); 

  React.useEffect(() => {
    if (minPrice !== "" || maxPrice !== "") {
      handleFilterClick({minPrice,maxPrice});
    } else if(minPrice == "" || maxPrice == "") {
      handleFilterClick({minPrice:1,maxPrice:6000})
    }
  }, [minPrice, maxPrice]);
  
  //!Best Filter 
  const handleStarRatingClick = (e) => {
    setStarRating(starRating === 4 ? null : 4);

    const bestFilter = e.target.name;
    const isChecked = e.target.checked;

    setBestCheckInput((prev) => ({
      ...prev,
      [bestFilter]: isChecked,
    }))
  };
  
  
  
  //! Color Filters
  const handleColorName = (e) => {
    const colorName = e.target.name;
    const isChecked = e.target.checked;

    setColorFilterChecked((prev) => ({
      ...prev,
      [colorName]: isChecked,
    }));

    if (chooseColorProducts.includes(colorName)) {
      setChooseColorProducts(chooseColorProducts.filter(color => color !== colorName));
    } else {
      setChooseColorProducts([...chooseColorProducts, colorName]);
    }
  }

  //*PagesNum
  console.log(filterProductsData);
  const handlePageChange = (e,page) => {
    if (filterProductsData && priceFilterProdData.length === 0) {
      setCurrentPage(1); // Birinci sayfaya yönlendir
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  } 

  // React.useEffect(() => {
  //   if(filterProductsData.data == 0) {
  //     filterProductsData.meta.pagination.page = 1
  //   }
  // },[filterProductsData])

  //! Sehife ye kecis olduqda Filterin temizlenmesi 
  const lastId = localStorage.getItem('storedId');
  React.useEffect(() => {

    if (lastId != id) {
      const localStorageItemsToRemove = ['bestFilterChecked', 
      'starRating', 
      'colorFilterChecked', 
      'chooseColorProducts', 
      'chooseCategoryProducts', 
      'categoryFilterChecked', 
      'minPrice', 
      'maxPrice',
      'activeButton'];

      localStorageItemsToRemove.forEach(item => {
        localStorage.removeItem(item);
      });
      localStorage.setItem('storedId', id);
    }
  }, [id]);

  React.useEffect(() => {
    if(id!=lastId) {
      window.location.reload();
    }
  }, [])
  //! Example
  // console.log(currentCategory);
  // console.log(priceFilterProd);
  // console.log(priceFilterProdData.length);
  //! Loading fetch Data
  if ((!fetchProducts || !fetchProducts.data) && 
  (!filterProductsData || !filterProductsData.data)) {
    return (
      <div className={style.loading}>
        <FadeLoader
        color={"#10322b"}
        size={100}/>
      </div>
    );
  } 

  //! Mobile Filter 
  const {showMobileFilter, setShowMobileFilter} = useShowMobileFilter()

  const handleCloseFilter = () => {
    setShowMobileFilter(false)
  }
  const handleCloseOverlay = () => {
    setShowMobileFilter(false)
  }

  return (
    <section className={style.search_content}>
      {/* //! Overlay */}
      {
        showMobileFilter && (
          <div className={style.overlay} onClick={handleCloseOverlay}></div>
        )
      }
      <div className={!showMobileFilter ? `${style.left_filter}` : `${style.left_filter_mobile}`}>
        <CartModal className={style.filter}>
          <h3>Filter Option</h3>
          <div className={style.line}></div>

          <div className={style.filter_group}>
            {showMobileFilter && (
              <div className={style.close_filter} onClick={handleCloseFilter}>
                <CgClose className={style.closeIcon}/>
              </div>
            )}
            <div className={style.acardition_best}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography className={style.acardition_header}>Best Filter</Typography>
                </AccordionSummary>

                <AccordionDetails className={style.boxs_acardition}>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" 
                    id="4 stars or upper"
                    name="4stars" 
                    checked={bestCheckInput['4stars']}
                    onClick={handleStarRatingClick}/>
                    <span>
                      <img src={star} alt=""/>
                      <label htmlFor="4 stars or upper">4 stars or upper</label>
                    </span>
                  </Typography>
                  <Typography  className={style.customTypography}>
                    <input type="checkbox" id="Same-day delivery"/>
                    <label htmlFor="Same-day delivery">Same-day delivery</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="COD"/>
                    <label htmlFor="COD">COD</label>
                  </Typography>
                </AccordionDetails>

              </Accordion>
            </div>

            <div className={style.acardition_color}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography className={style.acardition_header}>Color</Typography>
                </AccordionSummary>

                <AccordionDetails className={style.boxs_acardition}>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="black" name="Black"
                    checked={colorFilterChecked['Black']}
                    onClick={handleColorName}/>
                    <label htmlFor="black">Black</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Blue" name="Blue"
                    checked={colorFilterChecked['Blue']}
                    onClick={handleColorName}/>
                    <label htmlFor="Blue">Blue</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="White" name="White"
                    checked={colorFilterChecked['White']}
                    onClick={handleColorName}/>
                    <label htmlFor="White">White</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Red" name="Red"
                    checked={colorFilterChecked['Red']}
                    onClick={handleColorName}/>
                    <label htmlFor="Red">Red</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Brown" name="Brown"
                    checked={colorFilterChecked['Brown']}
                    onClick={handleColorName}/>
                    <label htmlFor="Brown">Brown</label>
                  </Typography>
                </AccordionDetails>

              </Accordion>
            </div>
            
            <div className={style.acardition_category}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography className={style.acardition_header}>Category</Typography>
                </AccordionSummary>

                <AccordionDetails className={style.boxs_acardition}>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Electronics" name="Electronics"
                    checked={categoryFilterChecked['Electronics']}
                    onClick={handleCategoryName}/>
                    <label htmlFor="Electronics">Electronics</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Fashion" name="Fashion"
                    checked={categoryFilterChecked['Fashion']}
                    onClick={handleCategoryName}/>
                    <label htmlFor="Fashion">Fashion</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Action Figure" name="Action Figure"
                    checked={categoryFilterChecked['Action Figure']}
                    onClick={handleCategoryName}/>
                    <label htmlFor="Action Figure">Action Figure</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Book" name="Book"
                    checked={categoryFilterChecked['Book']}
                    onClick={handleCategoryName}/>
                    <label htmlFor="Book">Book</label>
                  </Typography>
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Phone" name="Phone"
                    checked={categoryFilterChecked['Phone']}
                    onClick={handleCategoryName}/>
                    <label htmlFor="Phone">Phone</label>
                  </Typography>
                  {showCategories && 
                  <Typography className={style.customTypography}>
                    <input type="checkbox" id="Gaming" name="Gaming"
                    checked={categoryFilterChecked['Gaming']}
                    onClick={handleCategoryName}/>
                    <label htmlFor="Gaming">Gaming</label>
                  </Typography>}
                  <a onClick={toggleCategories} style={{cursor: "pointer"}}>{!showCategories ? "Show All Categories" : "Show Hide Categories"}</a>
                </AccordionDetails>

              </Accordion>
            </div>

            <div className={style.acardition_price}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header">
                  <Typography className={style.acardition_header}>Price Range</Typography>
                </AccordionSummary>

                <AccordionDetails className={style.boxs_prices}>
                  <Typography className={style.price_text}>
                      <select>
                        <option label="USD">USD</option>
                        <option label="AZN">AZN</option>
                      </select>
                      <input type="number" 
                      value={`${minPrice}`}
                      placeholder="Minimum price"
                      onChange={(e) => {
                        setActiveButton(" ")
                        setMinPrice(e.target.value);
                      }}/>
                  </Typography>
                  <Typography className={style.price_text}>
                      <select>
                        <option label="USD">USD</option>
                        <option label="AZN">AZN</option>
                      </select>
                      <input type="number" 
                      value={`${maxPrice}`}
                      placeholder="Maximum price" 
                      onChange={(e) => {
                        setActiveButton(" ")
                        setMaxPrice(e.target.value);
                      }}/>
                  </Typography>
                  <Typography>
                    <button onClick={() => 
                    (handleFilterClick({minPrice: 1, maxPrice:200}, "minimal"))}
                    className={activeButton == "minimal" && `${style.active_price}`}>
                      $0 - $200
                    </button>
                  </Typography>
                  <Typography>
                    <button onClick={() => handleFilterClick({minPrice: 250, maxPrice:500}, "midle")}
                    className={activeButton == "midle" && `${style.active_price}`}>
                      $250 - $500
                    </button>
                  </Typography>
                  <Typography>
                    <button onClick={() => handleFilterClick({minPrice: 500, maxPrice:1500}, "expensive")}
                    className={activeButton == "expensive" && `${style.active_price}`}>
                      $500 - $1500
                    </button>
                  </Typography>
                </AccordionDetails>

              </Accordion>
            </div>
          </div>
        </CartModal>
      </div>


      <div className={style.right_product}>
            {UiProducts.length > 0 ? (
            <div className={style.products}>
              {
                UiProducts.map(({ id, attributes }) => {
                  return (
                      <Product
                      key={id}
                      id={id}
                      image={`${import.meta.env.VITE_UPLOAD_IMG}${attributes?.images?.data[0].attributes.url}`}
                      title={attributes.title}
                      price={`$${attributes.price}`}
                      content={attributes.descruption}
                      rating={attributes.rating}
                      productClassName={style.search_product}
                      productCategoryId={attributes.categories?.data[0]?.id}
                    />
                  )
                })
              }
          </div>
        ) : (
          <CartModals className={style.not_found}>
            {pagesNumCount?.pagination?.total > 0 ? (
              <>
                <h1>No products found on this page.</h1>
                <p>Please go to the first page</p>
              </>
            ) : (
               <>
                <h1>No products found.</h1>
                <p>Sorry, the product you want is not currently in stock.</p>
              </>
            )}
          </CartModals>
        )}

        {/* //!Pages Num */}
        {pagesNumCount?.pagination?.total > 0 && (
          <div  className={style.pages_num}>
            <Stack>
            <Pagination count={pagesNumCount?.pagination?.pageCount}
            size="large" 
            sx={{
              '& .MuiPaginationItem-page': {
                width: '0',
              },
            }}
            onChange={handlePageChange }/>
            </Stack>
          </div>
        )}
      </div>
      
    </section>
  );
};

export default SearchContent;
