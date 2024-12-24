import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [gPayNumber, setGPayNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    // Calculate total price
    const total = storedCartItems.reduce(
      (total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity),
      0
    );
    setTotalPrice(total);
  }, []);

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    let paymentDetails = { method: selectedPayment };
    if (selectedPayment === 'UPI' && !gPayNumber) {
      alert('Please enter your GPay number');
      return;
    }

    if (selectedPayment === 'UPI') {
      paymentDetails.upiNumber = gPayNumber;
    }

    // Create order object
    const orderData = {
      cartItems,
      totalPrice,
      paymentMethod: paymentDetails,
      orderStatus: 'Pending',
    };

    try {
      // Send order data to backend API to create the order
      const response = await axios.post('http://localhost:5000/api/orders', orderData);

      // If successful, navigate to success page
      alert('Payment successful! Your order is confirmed.');
      localStorage.removeItem('cartItems');  // Clear cart after order
      navigate('/success');  // Redirect to success page
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-dark-green mb-6">Checkout</h2>
      <div className="grid gap-6">
        {/* Display cart items */}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-lg">
              <div>
                <h3 className="text-xl font-semibold text-dark-green">{item.name}</h3>
                <p className="text-gray-700">Price: {item.price}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">Your cart is empty.</p>
        )}
      </div>

      {/* Display Total Price */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-dark-green">Total Price: ₹{totalPrice}</h3>
      </div>

      {/* Payment Methods */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-dark-green">Select Payment Method</h4>
        <div className="space-y-4">
          <div>
            <input
              type="radio"
              id="COD"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) => setSelectedPayment(e.target.value)}
            />
            <label htmlFor="COD" className="ml-2 text-gray-700">Cash on Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="UPI"
              name="payment"
              value="UPI"
              onChange={(e) => setSelectedPayment(e.target.value)}
            />
            <label htmlFor="UPI" className="ml-2 text-gray-700">UPI (GPay, PhonePe, etc.)</label>
          </div>
          {selectedPayment === 'UPI' && (
            <div>
              <label htmlFor="gPayNumber" className="text-gray-700">Enter GPay Number</label>
              <input
                type="text"
                id="gPayNumber"
                value={gPayNumber}
                onChange={(e) => setGPayNumber(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g. 6381360779"
              />
            </div>
          )}
          <div>
            <input
              type="radio"
              id="Card"
              name="payment"
              value="Credit/Debit Card"
              onChange={(e) => setSelectedPayment(e.target.value)}
            />
            <label htmlFor="Card" className="ml-2 text-gray-700">Credit/Debit Card</label>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <button
          onClick={handlePayment}
          className="bg-dark-green text-white px-6 py-2 rounded hover:bg-light-green hover:text-dark-green"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
