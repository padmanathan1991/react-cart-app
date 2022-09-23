import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [cartAddedProduct, setCartAddedProduct] = useState([]);

  console.log(cartAddedProduct, "cartAddedProduct");

  const url = "https://fakestoreapi.com/products";

  const getSelectedCategoryValue = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getCartAddedProduct = (singleProduct) => {
    if (
      cartAddedProduct.filter((item) => item.id === singleProduct.id).length ===
      0
    ) {
      setCartAddedProduct([...cartAddedProduct, singleProduct]);
    } else alert("Already added to cart");
  };

  useEffect(() => {
    const CategoryArrFilter = productsList.filter((item) => {
      return selectedCategory === item.category;
    });
    setFilteredCategory(CategoryArrFilter);
  }, [selectedCategory, productsList]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setProductsList(response.data);
    });
  }, []);

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
            {/* <option value="all products">All Products</option> */}
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>
        <div className="flex flex-wrap -mx-2">
          {filteredCategory.length ? (
            filteredCategory.map((singleProduct) => {
              return (
                <Product
                  singleProduct={singleProduct}
                  getCartAddedProduct={() => getCartAddedProduct(singleProduct)}
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
        {/* {cartAddedProduct &&
          cartAddedProduct.map((singleProduct) => {
            return (
              <Product
                singleProduct={singleProduct}
                getCartAddedProduct={() => getCartAddedProduct(singleProduct)}
              />
            );
          })} */}
          cart screen
      </div>
    );
  }

  return (
    <Router>
      <Navbar cartAddedProduct={cartAddedProduct} />
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/cart' element={<CartScreen/>} />
      </Routes>
    </Router>
  );
}
