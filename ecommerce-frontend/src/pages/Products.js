import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // API URL
        setProducts(response.data); // Set the products in state
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-dark-green mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow hover:shadow-lg transition">
            {/* Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-60 object-cover rounded-t-lg" 
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-dark-green">{product.name}</h3>
              <p className="text-gray-700">{product.price}</p>
              <button className="mt-2 w-full bg-dark-green text-white py-2 rounded hover:bg-light-green hover:text-dark-green">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
