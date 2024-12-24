import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '', // For storing image URL or base64
  });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Change URL if needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm({ ...productForm, image: reader.result }); // Set base64 image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing product
      try {
        const updatedProduct = await axios.put(
          `http://localhost:5000/api/products/${products[editIndex]._id}`,
          productForm
        );
        const updatedProducts = [...products];
        updatedProducts[editIndex] = updatedProduct.data;
        setProducts(updatedProducts);
        setEditIndex(null);
      } catch (error) {
        console.error('Error updating product', error);
      }
    } else {
      // Add new product
      try {
        const response = await axios.post(
          'http://localhost:5000/api/products',
          productForm
        );
        setProducts([...products, response.data]);
      } catch (error) {
        console.error('Error adding product', error);
      }
    }

    setProductForm({ name: '', price: '', description: '', image: '' });
  };

  // Edit product
  const handleEdit = (index) => {
    setEditIndex(index);
    setProductForm(products[index]);
  };

  // Delete product
  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${products[index]._id}`);
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-dark-green text-center mb-6">Manage Products</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={productForm.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl">₹</span>
            <input
              type="number"
              name="price"
              value={productForm.price}
              onChange={handleInputChange}
              className="w-full pl-8 pr-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={productForm.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {productForm.image && (
            <img
              src={productForm.image}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-dark-green text-white py-2 rounded-md hover:bg-light-green"
        >
          {editIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-dark-green mb-4">Product List</h2>
        {products.length === 0 ? (
          <p className="text-gray-700">No products available.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-light-green text-dark-green">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">₹{product.price}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
