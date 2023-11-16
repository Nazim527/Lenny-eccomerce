import React from "react";
import { Routes, Route, useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { CheckoutShopping, Home, ProductDetail, Search, ShoppingCart } from "../pages";
import { Footer, Header } from "../layouts";
import { NotFound } from "../components";
import { useSelector } from "react-redux";
import PaymentSuccess from '../components/payment sucsess'

const MainApp = () => {
  //! User qeydiyyatdan kecmeyibse icaze olmayan sehifelerini bloklamaq
  const {logToken} = useSelector(state => state.auth)

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<Search/>}/>
          <Route path="/categories/:id/productdetail/:id" element={<ProductDetail/>}/>
          <Route path = "/shoppingcart" element={<ShoppingCart/>}/>
          <Route path="/checkout" 
          element={logToken ? <CheckoutShopping/> : <Navigate to={'/'}/>}/>
          <Route path="/checkout-success" element={<PaymentSuccess/>}/>
          
          //! 404 Not Found
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      <Footer/>   
    </>
  );
};

export default MainApp;
  