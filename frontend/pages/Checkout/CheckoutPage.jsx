import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImg from '../../assets/sunset_football_field.jpg'; // Import background image
import { createTrip } from '../../src/app/utilities';

const CheckoutPage = () => {
  const location = useLocation();
  const filteredCart = location.state?.filteredCart || [];

  const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order has been placed

  // Calculate total price
  const totalPrice = filteredCart.reduce((total, item) => total + (Number(item.price) || 0), 0);

  // Handle Order Placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Prevent form submission
    for(let i = 0; i < filteredCart.length; i++){
      let formData = {
        "name" : filteredCart[i].name,
        "image_url": filteredCart[i].image_url,
        "price": filteredCart[i].price 
      }
      await createTrip(formData)
    }
    setOrderPlaced(true); // Set orderPlaced to true when the button is clicked
  };
  console.log(filteredCart)

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${backgroundImg})` }} // Apply background image here
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl opacity-90">
        {/* If order is placed, show success message */}
        {orderPlaced ? (
          <div className="text-center p-8 bg-green-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700">Your order has been successfully placed!</h2>
            <p className="mt-4 text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Checkout</h1>

            {/* Cart Items List */}
            <div className="space-y-4">
              {filteredCart.length > 0 ? (
                filteredCart.map((item, index) => {
                  const price = Number(item.price) || 0; // Ensure price is a number

                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="text-gray-900">
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">${price.toFixed(2)}</p> {/* Safely use toFixed */}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>

            {/* Subtotal Section */}
            <div className="mt-6 flex justify-between text-xl font-medium text-gray-900 border-t pt-4">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p> {/* Safely use toFixed */}
            </div>

            {/* Checkout Form */}
            <div className="mt-8 space-y-4">
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                {/* Payment Section */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
                  <p className="text-sm text-gray-500">Enter your payment details below.</p>

                  <div className="mt-4 space-y-2">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="•••• •••• •••• 1234"
                      required
                    />
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="month"
                          id="expiry-date"
                          name="expiry-date"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Book Your Trip
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

