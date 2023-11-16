import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  chooseCart: null,
}

export const CartSliceShopping = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCArt: (state, action) => {
      const { productId, price, quantityProduct} = action.payload;
      const existingProduct = state.cart.find((item) => item.productId === productId)

      if(existingProduct) {
        existingProduct.price += price;
        existingProduct.quantityProduct += quantityProduct
      } else {
        state.cart.push(action.payload)
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((x) => x.productId !== action.payload)
    },
    risingPrice: (state, action) => {
      const {id} = action.payload
      const product = state.cart.find(item => item.productId === id);
      if(product) {
        product.price += product.OrginalPrice
        product.quantityProduct += 1
      }
    },
    decliningPrice: (state, action) => {
      const {id} = action.payload
      const product = state.cart.find(item => item.productId === id);
      if(product) {
        if(product.quantityProduct > 1) {
          product.quantityProduct -= 1
          product.price -= product.OrginalPrice
        }
      }
    },
    selectedProduct: (state,action) =>  {
      state.chooseCart = action.payload.CheckInput
      const product = state.cart.find(item => item.productId === action.payload.id);
      if(product) {
        product.selectedProductSend = state.chooseCart
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCArt, removeCart, risingPrice,decliningPrice, selectedProduct } = CartSliceShopping.actions

export default CartSliceShopping.reducer