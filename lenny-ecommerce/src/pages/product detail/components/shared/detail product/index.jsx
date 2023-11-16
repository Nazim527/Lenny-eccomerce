import React from 'react'
import style from './style.module.scss'
import { TitleContent } from '../../../../../components/shared'

//!Icon Ipmort
import check from '../../../../../assets/icon/pages/detail product/tick-circle.svg'

const DetailProduct = () => {
  return (
    <div className={style.detail_product}>
        <div className={style.detail_header}>
            <TitleContent 
            title={"G502 X Lightspeed Wireless Gaming Mouse"}
            content={"G502 X LIGHTSPEED is the latest addition to legendary G502 lineage. Featuring our first-ever LIGHTFORCE hybrid optical-mechanical switches and updated LIGHTSPEED wireless protocol with 68% faster response rate."}/>
        </div>
        <div className={style.detail_footer}>
            <div className={style.specifition}>
                <h3>Specification</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>Brand</p></td>
                            <td><h6>Logitech</h6></td>
                        </tr>
                        <tr>
                            <td><p>Type</p></td>
                            <td><h6>Wired</h6></td>
                        </tr>
                        <tr>
                            <td><p>Resolution</p></td>
                            <td><h6>150-25600 dpi</h6></td>
                        </tr>
                        <tr>
                            <td><p>Max Speed</p></td>
                            <td><h6>{`>40G2`}</h6></td>
                        </tr>
                        <tr>
                            <td><p>Max Acceleration</p></td>
                            <td><h6>{`>300 IPS`}</h6></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={style.product_in_box}>
                <h3>In The Box</h3>
                <ul className={style.product_box_list}>
                    <li>
                        <div><img src={check}/></div>
                        <p>UG502 X LIGHTSPEED Wireless Gaming Mouse</p>
                    </li>
                    <li>
                        <div><img src={check}/></div>
                        <p>DPI-Shift button cover</p>
                    </li>
                    <li>
                        <div><img src={check}/></div>
                        <p>USB-C charging cable</p>
                    </li>
                    <li>
                        <div><img src={check}/></div>
                        <p>LIGHTSPEED USB-A receiver</p>
                    </li>
                    <li>
                        <div><img src={check}/></div>
                        <p>USB extension cable</p>
                    </li>
                    <li>
                        <div><img src={check}/></div>
                        <p>User Documentation</p>
                    </li>
                </ul>
            </div>

            <div className={style.product_system}>
                <h3>System Required</h3>
                <ul className={style.systems}>
                    <li>- USB port</li>
                    <li>- Internet access for optional software download</li>
                    <li>- Windows® 10 or later</li>
                    <li>- macOS 10.14 or later</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default DetailProduct