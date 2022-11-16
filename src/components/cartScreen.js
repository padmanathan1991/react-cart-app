import { React, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function CartScreen({ cartAddedProduct, setCartAddedProduct }) {
  const removeCartAddedProduct = (singleProduct) => {
    removeCartToast();
    setCartAddedProduct(singleProduct.id);
  };

  const removeCartToast = () =>
  toast("Removed from cart", {
    duration: 2000,
    style: {background: '#e53e3e', color: '#fff', fontWeight: 700},
  });

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="scrollbar-hide mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-0 space-y-7 overflow-scroll"
    >
      {cartAddedProduct && cartAddedProduct.length != 0 ? (
        cartAddedProduct.map((item) => {
          return (
            <li class="flex p-6 bg-gray-200 rounded-md">
              <figure className="relative w-48 h-60 overflow-hidden rounded-lg p-4 bg-white flex items-center justify-center">
                <img
                  src={item.image}
                  alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
                  className="flex w-full h-full object-contain"
                />
              </figure>

              <div class="ml-4 flex flex-col flex-1 sm:ml-6">
                <div>
                  <div class="">
                    <h4 class="text-sm">
                      <p class="font-semibold text-gray-700 hover:text-gray-800">
                        {item.title}
                      </p>
                    </h4>
                    <p class="text-lg font-semibold mt-2 text-gray-900">
                      ${item.price}
                    </p>
                    <p class="text-sm mt-2 text-gray-900">{item.description}</p>
                  </div>
                </div>

                <div class="flex mt-4 flex-1 items-end justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent duration-150 bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      removeCartAddedProduct(item);
                    }}
                  >
                    <p className="text-sm font-bold">Remove</p>
                  </button>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold">Cart is empty !!!</p>
        </div>
      )}
    </div>
  );
}
