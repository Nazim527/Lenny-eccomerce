import React from 'react'
import { BreadCrumbs, RelatedProduct } from '../../components'
import { ProductAbout, ProductInfo } from './components'

const ProductDetail = () => {
  return (
    <>
        <BreadCrumbs/>
        <ProductInfo/>
        <ProductAbout/>
    </>
  )
}

export default ProductDetail