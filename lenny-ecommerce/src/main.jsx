import React from "react";
import ReactDOM from "react-dom/client";
import style from "./helpers/reset.module.scss";
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.jsx';

function ScrollToTopOnPageChange() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTopOnPageChange />
    <App />
  </BrowserRouter>
);