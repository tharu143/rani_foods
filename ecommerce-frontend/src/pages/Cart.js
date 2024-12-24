import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Use useNavigate hook

  // Fetch products from API to add to the cart
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Adjust URL as needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding product to cart
  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Update quantity of item in cart
  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    ));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);

  // Handle checkout
  const handleCheckout = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Store cart items in localStorage
    navigate('/checkout');  // Navigate to checkout page
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-dark-green mb-6">Your Cart</h2>

      {/* Product list from API */}
      <div className="grid gap-6 mb-6">
        {products.map((item) => (
          <div key={item._id} className="flex items-center justify-between border p-4 rounded-lg shadow-lg">
            <div>
              <h3 className="text-xl font-semibold text-dark-green">{item.name}</h3>
              <p className="text-gray-700">Price: {item.price}</p>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="bg-dark-green text-white px-6 py-2 mt-4 rounded hover:bg-light-green"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Items */}
      <div className="grid gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-lg">
            <div>
              <h3 className="text-xl font-semibold text-dark-green">{item.name}</h3>
              <p className="text-gray-700">Price: {item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-dark-green text-white px-2 py-1 rounded hover:bg-light-green"
              >
                -
              </button>
              <span className="text-gray-700">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-dark-green text-white px-2 py-1 rounded hover:bg-light-green"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-dark-green">Total Price: ₹{totalPrice}</h3>
        <button
          onClick={handleCheckout}
          className="bg-dark-green text-white px-6 py-2 mt-4 rounded hover:bg-light-green"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
