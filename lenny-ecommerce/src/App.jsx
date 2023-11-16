import React from "react";
import "./App.scss";
import MainApp from "./routes";
import { CategoryProvider } from "./store/category Provider";
import { Provider } from "react-redux";
import { store } from "./store";
import 'react-toastify/dist/ReactToastify.css';

//? Redux Persist
import { persistorShopping } from "./store"; 
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistorShopping}>
        <CategoryProvider>
          <MainApp />
          <ToastContainer/> {/* //! Alert Bildirimilerin cixmasi ucun */}
        </CategoryProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
