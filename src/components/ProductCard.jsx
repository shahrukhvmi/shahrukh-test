import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-xl border border-gray-200 hover:shadow-xl transition duration-300 p-4 flex flex-col"
    >
      {/* Badge */}
      <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
        In Stock
      </div>

      {/* Product Image */}
      <div className="flex items-center justify-center h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
          {product.title}
        </h3>

        {/* Rating Placeholder */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
          ⭐⭐⭐⭐⭐
          <span className="text-gray-500 ml-1">(100)</span>
        </div>

        <p className="text-lg font-bold text-black">${product.price}</p>
      </div>

      {/* Optional Add to Cart */}
      <button

        className="bg-slate-800 hover:bg-slate-700 text-white w-full py-3 rounded-full text-center transition mt-4"
        onClick={(e) => {
          e.preventDefault();
          // handleAddToCart(product)
        }}
      > <Link
        to={`/product/${product.id}`}
      >
          Add to Cart</Link>
      </button>
    </Link>
  );
};

export default ProductCard;
