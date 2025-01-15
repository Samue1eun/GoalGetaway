import { useCart } from '../../src/app/CartContext';
import { useState, useEffect } from 'react';
import southWestLogo from '../../assets/southwest_airlines.png';
import { Link } from 'react-router-dom'

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const [filteredCart, setFilteredCart] = useState([]);

  useEffect(() => {
    const newFilteredCart = [];
    if (cart.length > 0) {
      cart.forEach(item => {
        if (item.business_status) {
          newFilteredCart.push({ id: item.place_id, name: item.name, image_url: item.image_url, price: 250.00 });
        } else if (item.itineraries) {
          newFilteredCart.push({ id: item.id, name: "Southwest Airlines", price: item.price.total, image_url: southWestLogo });
        }
      });
    }
    setFilteredCart(newFilteredCart);
  }, [cart]);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setFilteredCart((prevFilteredCart) => prevFilteredCart.filter((item) => item.id !== itemId && item.place_id !== itemId));
  };

  return (
    <div className={`relative z-10 ${isOpen ? 'block' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" onClick={onClose} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {filteredCart.length > 0 ? (
                          filteredCart.map((item, index) => (
                            <li key={index} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={item.image_url} alt="Item" className="size-full object-cover" />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex">
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveFromCart(item.id || item.place_id)}>Remove</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p className="text-center text-gray-500">Your cart is empty.</p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${(filteredCart.reduce((total, item) => total + (item.price * 100), 0) / 100).toFixed(2)}</p>
                    </div>
                  <div className="mt-6">
                    <Link to='/checkout/' onClick={onClose} className="flex items-center justify-center mb-6 rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;