import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all products");
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [cartAddedProduct, setCartAddedProduct] = useState([]);

  const url = "https://fakestoreapi.com/products";

  const getSelectedCategoryValue = (e) => {
    setSelectedCategory(e.target.value);
  };
  const data = JSON.parse(localStorage.getItem("cartAddedProduct"));

  function CountDisplay() {
    return <div>added to cart</div>;
  }

  const getCartAddedProduct = (singleProduct) => {
    if (cartAddedProduct?.length) {
      if (
        cartAddedProduct.filter((item) => item.id === singleProduct.id)
          ?.length === 0
      ) {
        setCartAddedProduct([...cartAddedProduct, singleProduct]);
      } else alert("added to cart");
    } else {
      setCartAddedProduct([singleProduct]);
    }
    toast(<CountDisplay />);
  };

  const removeCartAddedProduct = (singleProduct) => {
    setCartAddedProduct(
      cartAddedProduct.filter((item) => item.id != singleProduct.id)
    );
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setProductsList(response.data);
    });
    setCartAddedProduct(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartAddedProduct", JSON.stringify(cartAddedProduct));
  }, [cartAddedProduct]);

  useEffect(() => {
    const CategoryArrFilter = productsList.filter((item) => {
      if (selectedCategory === "all products") {
        return item;
      } else {
        return selectedCategory === item.category;
      }
    });
    setFilteredCategory(CategoryArrFilter);
  }, [selectedCategory, productsList]);

  const HomeScreen = () => {
    return (
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="scrollbar-hide mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 overflow-scroll"
      >
        <div className="flex justify-end mt-6">
          <select
            onChange={getSelectedCategoryValue}
            value={selectedCategory}
            className="category-select pl-6 pr-12 py-2 rounded-md bg-gray-800 text-white border-none outline-none appearance-none relative"
          >
            <option value="all products">All Products</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-wrap -mx-2">
          {filteredCategory?.length ? (
            filteredCategory.map((singleProduct) => {
              return (
                <Product
                  key={singleProduct.id}
                  singleProduct={singleProduct}
                  getCartAddedProduct={() => getCartAddedProduct(singleProduct)}
                  cartAddedProduct={cartAddedProduct}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const CartScreen = () => {
    return (
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="scrollbar-hide mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 overflow-scroll"
      >
        {cartAddedProduct && cartAddedProduct.length != 0 ? (
          <div className="flex flex-wrap -mx-2">
            {cartAddedProduct &&
              cartAddedProduct.map((singleProduct) => {
                return (
                  <Product
                    key={singleProduct.id}
                    singleProduct={singleProduct}
                    getCartAddedProduct={() =>
                      getCartAddedProduct(singleProduct)
                    }
                    removeCartAddedProduct={() =>
                      removeCartAddedProduct(singleProduct)
                    }
                  />
                );
              })}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-3xl font-bold text-gray-800">
              Cart is Empty !!!
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Router>
      <Navbar cartAddedProduct={cartAddedProduct} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </Router>
  );
}
