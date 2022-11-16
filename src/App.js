import "./App.css";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CartScreen from "./components/cartScreen";
import Navbar from "./components/Navbar";

function App() {

  const [cartAddedProduct, setCartAddedProduct] = useState([]);

  useEffect(() => {
    const prod = JSON.parse(localStorage.getItem('cartAddedProduct'))
    setCartAddedProduct(prod)
  }, [])

  return (
    <div className="w-full h-screen bg-gray-100">
      <Toaster />
      <Router>
        <Navbar cartAddedProduct={cartAddedProduct} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartAddedProduct={cartAddedProduct}
                setCartAddedProduct={setCartAddedProduct}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartScreen
                cartAddedProduct={cartAddedProduct}
                setCartAddedProduct={(id) => {
                  const removedItem = cartAddedProduct.filter(
                    (item) => item.id != id
                  )
                  setCartAddedProduct(removedItem)
                  localStorage.setItem("cartAddedProduct", JSON.stringify(removedItem));
                }}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
