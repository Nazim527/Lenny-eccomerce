import React from 'react'
import style from './style.module.scss'
import sy from '../shared/store name/style.module.scss'
import { CartModals, StoreName } from '../shared'
import { useDispatch, useSelector } from 'react-redux';
import { decliningPrice, removeCart, risingPrice, selectedProduct } from '../../pages/shopping/redux/store/reducer/cartSlice';


//! Images and icon
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlinePlus, HiOutlineMinus} from "react-icons/hi";


const ShoppingChartProduct = ({
    id,
    image,
    productName,
    productDescuption,
    price,
    categoryId}) => {

  
  const dispatch = useDispatch();

  //! Product sayinin dinamik deyismesi ucun
  const CountProduct = useSelector((state) => state.cart.cart)
  //! Product sayini artirdiqda dinamik olaraq Qiymetinde deyismesi ucun
  const handleMinusCount = () => {
    if (CountProduct.length > 0) {
        dispatch(decliningPrice({ id }));
      }
  }

  const handlePlusCount = () => {
    if (CountProduct.length > 0) {
        dispatch(risingPrice({ id }));
      }
  }

  //! Meshul secildikde Reduxa True Sorgusunu gondermek
  const [CheckInput,setCheckInput] = React.useState(true)

  React.useEffect(() => {
    const localStorageKey = `product_${id}_checked`;
    const checkedStatus = localStorage.getItem(localStorageKey);

    if (checkedStatus !== null) {
      setCheckInput(checkedStatus === 'true');
    }
  }, [id]);
  React.useEffect(() => {
    const localStorageKey = `product_${id}_checked`;
    localStorage.setItem(localStorageKey, CheckInput.toString());
  }, [id, CheckInput]);


  const handleCheckProducts = () => {
    setCheckInput(!CheckInput)
    dispatch(selectedProduct({CheckInput,id}))
}

  return (
    <div className={style.shopping_cart_product}>
        <div className={style.chart_product_left}>
            <div className={style.selected_product_choose}>
                <form>
                    <input type="checkbox"
                    onClick={handleCheckProducts}
                    checked={!CheckInput}
                    value={CheckInput}/>
                </form>
            </div>
            <div className={style.selected_product}>
                <StoreName 
                storeNameClass={sy.chart_product_info}
                image={image}
                title={productName}
                text={productDescuption}
                price={price}
                id={id}
                categoryId={categoryId}/>
            </div>
        </div>

        <div className={style.chart_product_right}>
            <p>Add To Favorite</p>
            <div className={style.right_btns}>
                <CartModals className={style.total_product}>
                    <HiOutlineMinus style={{color: "darkgrey", cursor: "pointer"}} onClick={handleMinusCount}/>
                        {CountProduct.map((count) => {
                            if(count.productId == id) {
                                return <p key={id}>{count.quantityProduct}</p>
                            }
                        })}
                    <HiOutlinePlus style={{color: "darkgreen", cursor: "pointer"}} onClick={handlePlusCount}/>
                </CartModals>

                <CartModals className={style.icon}>
                    <RiDeleteBin6Line style={{cursor: "pointer"}} onClick={() => dispatch(removeCart(id))}/>
                </CartModals>
            </div>
        </div>
    </div>
  )
}

export default ShoppingChartProduct