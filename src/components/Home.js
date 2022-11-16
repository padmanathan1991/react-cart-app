import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Home({cartAddedProduct, setCartAddedProduct}) {
  const [productsList, setProductsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all products");
  const [filteredCategory, setFilteredCategory] = useState([]);
  

  const url = "https://fakestoreapi.com/products";

  const addCartToast = () =>
  toast("Added to cart", {
    duration: 2000,
    style: {background: '#2f855a', color: '#fff', fontWeight: 700},
  });

  const getSelectedCategoryValue = (e) => {
    setSelectedCategory(e.target.value);
  };
  const data = JSON.parse(localStorage.getItem("cartAddedProduct"));

  const getCartAddedProduct = (singleProduct) => {
    addCartToast();
    if (cartAddedProduct?.length) {
      if (
        cartAddedProduct.filter((item) => item.id === singleProduct.id)
          ?.length === 0
      ) {
        setCartAddedProduct([...cartAddedProduct, singleProduct]);
      }
    } else {
      setCartAddedProduct([singleProduct]);
    }
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
}
