import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar({ cartAddedProduct }) {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 shadow-xl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                  alt="Workflow"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                  alt="Workflow"
                />
              </div>
            </Link>
          </div>

          {location.pathname === "/" ? (
            <div className="relative">
              <Link to="/cart">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent duration-150 bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 outline-none"
                >
                  <p className="text-sm font-bold">Cart</p>
                  <AiOutlineShoppingCart className="w-5 h-5 ml-2" />
                </button>
              </Link>

              {cartAddedProduct?.length > 0 ? (
                <div className="w-5 h-5 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5 bg-gray-100">
                  <p className="text-xs font-semibold text-indigo-700">
                    {cartAddedProduct.length}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <></>
          )}

          {location.pathname === "/cart" ? (
            <Link to="/">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent duration-150 bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 outline-none"
              >
                <p className="text-sm font-bold">Home</p>
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}
