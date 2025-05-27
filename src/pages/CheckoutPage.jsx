import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("Processing Payment...");

  const handleCheckout = () => {
    setShowModal(true);
    setModalMessage("Processing Payment...");

    setTimeout(() => {
      setModalMessage("Thank you!");
      setTimeout(() => {
        clearCart()
        navigate("/");
      }, 1000);
    }, 2000);
  };
  const getItemSubtotal = (item) => {
    const basePrice = item.price || 0;
    const qty = item.quantity || 1;
    const tax = ((item.tax || 0) / 100) * basePrice;
    const discount = item.discount_flat
      ? item.discount_flat
      : item.discount_percent
        ? ((item.discount_percent || 0) / 100) * basePrice
        : 0;

    return ((basePrice + tax - discount) * qty).toFixed(2);
  };


  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalTax = cartItems
    .reduce((sum, i) => sum + ((i.tax / 100) * i.price) * i.quantity, 0)
    .toFixed(2);
  const totalAmount = cartItems
    .reduce((sum, i) => sum + parseFloat(getItemSubtotal(i)), 0)
    .toFixed(2);

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Promo Code Input */}
        <div className="flex justify-end mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Promo Code"
              className="border border-gray-300 rounded-l-full px-4 py-2 w-64"
            />
            <button className="bg-slate-800 text-white px-6 rounded-r-full">Apply</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Billing + Shipping */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Billing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="text" placeholder="First Name" className="input-style" />
              <input type="text" placeholder="Last Name" className="input-style" />
              <input type="email" placeholder="Email" className="input-style" />
              <input type="tel" placeholder="Phone" className="input-style" />
              <input type="text" placeholder="Country" className="input-style" />
              <input type="text" placeholder="City" className="input-style" />
              <input type="text" placeholder="State" className="input-style" />
              <input type="text" placeholder="Zip Code" className="input-style" />
              <input type="text" placeholder="Address" className="input-style col-span-2" />
            </div>


            <h3 className="text-lg font-semibold mb-2">Add Shipping Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="text" placeholder="First Name" className="input-style" />
              <input type="text" placeholder="Last Name" className="input-style" />
              <input type="email" placeholder="Email" className="input-style" />
              <input type="tel" placeholder="Phone" className="input-style" />
              <input type="text" placeholder="Address" className="input-style col-span-2" />
            </div>
            <button
              onClick={handleCheckout}
              className="bg-slate-800 hover:bg-slate-700 text-white w-full py-3 rounded-full text-center transition mt-4"
            >
              Check Out
            </button>


            <div className="mt-4 text-sm">
              <input type="checkbox" className="mr-2" />
              I hereby agree to the
              <a href="#" className="text-blue-600 underline ml-1">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1 ml-3">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs">Qty: {item.quantity}</p>
                    <p className="text-xs">Tax: {item.tax}%</p>
                    {item.discount_flat ? (
                      <p className="text-xs">Discount: ${item.discount_flat}</p>
                    ) : item.discount_percent ? (
                      <p className="text-xs">Discount: {item.discount_percent}%</p>
                    ) : null}
                  </div>
                  <p className="font-semibold">${getItemSubtotal(item)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Item Quantity</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon Discount:</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes:</span>
                <span>${totalTax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 w-[90%] max-w-md text-center shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">{modalMessage}</h2>
              {modalMessage === "Processing Payment..." && (
                <div className="animate-spin h-6 w-6 border-2 border-t-slate-800 border-slate-300 rounded-full mx-auto" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default CheckoutPage;
