import React from "react";
import DetailPage from "./pages/ProductsDetail/DetailPage";
import ListPage from "./pages/ListProducts/ListPage";
import CartPage from "./pages/CartPage/CartPage"; // Import the CartPage
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MasterLayout from "./layout/masterLayout";
import RouterCustom from "./router";

function App() {
  
   
  return (
  
      <BrowserRouter>
        <RouterCustom/>
      </BrowserRouter>
  );
}

export default App;
