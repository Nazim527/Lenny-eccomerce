import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from './reducer/auth'
import  CartSliceShopping  from '../pages/shopping/redux/store/reducer/cartSlice'

//! Redux Persist Start
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}

//? Auth Persist
const AuthPersistConfig = {
  key: 'auth',
  storage,
}


const persistShoppingProduct = persistReducer(persistConfig, CartSliceShopping)
const persistAuthReducer = persistReducer(AuthPersistConfig, authReducer)

export const store = configureStore({
  reducer: {
    cart: persistShoppingProduct,
    auth: persistAuthReducer,
  },
})

export let persistorShopping = persistStore(store)