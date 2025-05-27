import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center">
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2018/12/Shop-bag-shopping-logo-by-DEEMKA-STUDIO-1-580x348.jpg"
          alt="Shop Logo"
          className="w-32 h-10 object-contain"
        />
      </Link>

      <Link to="/cart" className="relative text-2xl">
        🛒
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
            {cartItems.length}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
