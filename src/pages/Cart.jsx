import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const navigate = useNavigate();
  const handleToPayment = () => {
    navigate('/checkout');
  };
  return (


    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-md">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="text-sm uppercase">
                <th className="p-3">Name</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Sub Total</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                  </td>
                  <td className="p-3">${item.price.toFixed(2)}</td>
                  <td className="p-3">
                    <div className="flex items-center border rounded w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Row */}
          <div className="flex justify-end p-4 border-t text-lg font-semibold">
            Total: <span className="ml-2">${total}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {cartItems.length > 0 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={clearCart}
            className="bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-900"
          >
            ClearList
          </button>
          <button
            onClick={handleToPayment}
            className="bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-900"
          >
            Proceed to Payment
          </button>
        </div>
      )
      }
    </div >
  );
};

export default Cart;
