import React from "react";

export default function Product({ singleProduct, getCartAddedProduct }) {
  return (
    <>
      <div key={singleProduct.id} className="px-2 w-1/4 my-8 pb-12 relative">
        <div className="relative">
          <figure className="relative h-72 w-full overflow-hidden rounded-lg p-8 bg-white flex items-center justify-center">
            <img
              src={singleProduct.image}
              alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
              className="flex w-full h-full object-contain"
            />
          </figure>
          <div className="relative mt-4">
            <p className="mb-1 text-sm text-gray-500">
              {singleProduct.category}
            </p>
            <h3 className="text-sm font-medium text-gray-900">
              {singleProduct.title}
            </h3>
          </div>
          <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            ></div>
            <p className="relative text-lg font-semibold text-white">
              $ {singleProduct.price}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0">
          <div
            onClick={() => getCartAddedProduct(singleProduct)}
            className="relative flex items-center justify-center rounded-md border border-transparent bg-indigo-500 duration-150 py-2 px-8 text-sm font-medium cursor-pointer text-white hover:bg-indigo-600"
          >
            Add to cart
          </div>
        </div>
      </div>
    </>
  );
}
