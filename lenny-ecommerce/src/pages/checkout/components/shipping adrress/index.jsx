import React from 'react'
import { Btn, CartModals } from '../../../../components/shared'
import style from './style.module.scss'

//!Images and Icon
import LocationIcon from '../../../../assets/icon/pages/checkout/location.svg'
const ShippingAddress = () => {
  return (
    <CartModals className={style.shipping_address}>
        <div className={style.address_title}>
            <h1>Shipping Address</h1>
        </div>

        <div className={style.address_content}>
            <div className={style.address_left}>
                <div className={style.icon_location}>
                    <img src={LocationIcon}/>
                </div>

                <div className={style.address_info}>
                    <div className={style.info_title}>
                        <h1>Goffany Karina</h1>

                        <div className={style.confirm_address}>
                            <span>Main Address</span>
                        </div>
                    </div>

                    <p>081277939572</p>
                    <p>2021 Royalty Boulevard Portland, OR 98199</p>
                </div>
            </div>
            
            <div className={style.address_right}>
                <Btn contentTitle={"Other Address"}/>
            </div>
        </div>
    </CartModals>
  )
}

export default ShippingAddress