import React, { useContext } from 'react'
import style from './style.module.scss'
import { Btn, TitleContent } from '../shared'
import { useProductFilters } from '../../hooks/useFilterPriceProducts';
import { useCategory, useShowMobileFilter, useShowProductsTotal } from '../../store/category Provider';

//! Icon import
import {BiFilterAlt} from "react-icons/bi"
import { FiMenu } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";


const Sort = ({sortClassName}) => {
  const [sortOption, setSortOption] = React.useState("");
  const {currentCategory, setCurrentCategory} = useCategory()

  let querySorting = {}
  const handleSortChange = (event) => {
    setSortOption(event.target.value);

    if(sortOption == "1") {
      querySorting = {
        sortAscending: true
      }
      setCurrentCategory(querySorting)
    } else {
      querySorting = {
        sortAscending: false
      }
      setCurrentCategory(querySorting)
    }
}

  //! Ne qeder Product geldiyini bildirmek ucun
  const { showProductTotal } = useShowProductsTotal();
  const [totalProduct, setTotalProduct] = React.useState("")

  React.useEffect(() => {
    if(showProductTotal) {
      setTotalProduct(showProductTotal.pagination.total)
    }
  }, [showProductTotal])

  //!Filterin gorsenmesi ucun
  const {setShowMobileFilter} = useShowMobileFilter()

  const handleFilterShow = () => {
    setShowMobileFilter(true)
  }

  //? Genislik 1024px kecdikden sonra mobile filterin avtomatik baglanmasi ucun
  React.useEffect(() => {
    const handleWindowResize = () => {
        if(window.innerWidth > 1023) {
          setShowMobileFilter(false)
        }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, []); 

  return (
    <section className={`${style.sort_section} ${sortClassName}`}>
      <div className={style.left}>
        {/* //! Neticeye gore deyisilmelidir */}
        <TitleContent title={"Showing product”"}
        content={`Showing ${totalProduct > 0 ? `0 - ${totalProduct} ` : "not found"} Products`}/>
      </div>

      <div className={style.right}>
        <div className={style.sort_product}>
          <p>Sort By:</p>
          <select value={sortOption} onChange={handleSortChange} placeholder='Relevant Products'>
            <option value="2">Price:Low to High</option>
            <option value="1">Price:High to Low</option>
          </select>
        </div>

        <div className={style.product_layout}>
          <div onClick={handleFilterShow} className={`${style.icon} ${style.filter_icon}`}>
            <BiFilterAlt/>
          </div>

          <div className={style.line}></div>

          <Btn bg={true} icon={<LuLayoutGrid/>}/>
          <div className={`${style.icon}`}>
            <FiMenu/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sort