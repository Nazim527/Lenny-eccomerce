import React from 'react'
import { getSingleProduct } from '../../api/products'

export function useChooseSingleProduct ({id}) {
    const [singleProduct, setSingleProduct] = React.useState([])

    React.useEffect(()=>{
        async function fetchSingleProductData () {
            try {
                const prdctData = await getSingleProduct(id)

                setSingleProduct(prdctData)
            } catch (error) {
                console.log("Single Product API de problem yarandi", error);
            }
        }

        fetchSingleProductData()
    },[id])

    return singleProduct
}