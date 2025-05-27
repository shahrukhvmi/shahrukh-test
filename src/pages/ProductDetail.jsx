import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');  // navigate to cart page
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex gap-14">
      {/* Left: Image */}
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain"
        />
      </div>

      {/* Right: Product info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-6">${product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-slate-800 hover:bg-slate-700 text-white w-full py-3 rounded-full text-center transition mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
