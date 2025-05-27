import React from 'react';

const CartItem = ({ item, onRemove, onUpdate }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
        <div>
          <h4 className="font-semibold text-sm">{item.title}</h4>
          <p className="text-gray-600 text-xs">${item.price} x {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="px-2 bg-gray-200">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="px-2 bg-gray-200">+</button>
        <button onClick={() => onRemove(item.id)} className="text-red-500 ml-2">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;