import React, { useState } from 'react';

// Import the images from the src folder
import bananaImage from './1.png';  // Banana Powder image
import aavaramImage from './1.png';  // Aavaram Poo Powder image (replace with actual image)
import prandaiImage from './1.png';  // Prandai Powder image (replace with actual image)

const Products = () => {
  // Local product data with separate categories for different powders and sizes
  const products = [
    {
      category: 'Banana Powder',
      products: [
        {
          _id: 1,
          name: 'RAW Nenthara Banana Powder',
          image: bananaImage,
          sizes: [
            { weight: '100g', price: 149 },
            { weight: '200g', price: 250 },
            { weight: '500g', price: 500 },
          ],
          description: 'Premium quality organic banana powder.',
          backgroundImage: 'https://imgs.search.brave.com/KRZKtxPlxvyZibo6yekXi5Rbii5GIRDuTyigYzwA8YQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVncmVjaXBlc29m/aW5kaWEuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzEx/L2tlcmFsYS1iYW5h/bmEtY2hpcHMtcmVj/aXBlMDEtMS5qcGc',  // Add background image URL for related theme
        },
      ],
    },
    {
      category: 'Aavaram Poo Powder',
      products: [
        {
          _id: 2,
          name: 'Aavaram Poo Powder',
          image: aavaramImage,
          sizes: [
            { weight: '100g', price: 199 },
            { weight: '200g', price: 350 },
            { weight: '500g', price: 600 },
          ],
          description: 'Herbal powder made from Aavaram flowers.',
          backgroundImage: 'https://imgs.search.brave.com/bs2kC20dSf2nLTt1V7EFEGfaUX0BLptz0yUl3olXx2k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFxOUhBLWx1aUwu/anBn',  // Example background image for Aavaram Poo
        },
      ],
    },
    {
      category: 'Prandai Powder',
      products: [
        {
          _id: 3,
          name: 'Prandai Powder',
          image: prandaiImage,
          sizes: [
            { weight: '100g', price: 249 },
            { weight: '200g', price: 400 },
            { weight: '500g', price: 700 },
          ],
          description: 'Herbal powder for traditional healing.',
          backgroundImage: 'https://imgs.search.brave.com/1cQJMnfWgaOeftvFuGXgyRVDOEvkbaX1p4Q6DXlqH5c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTEtOGR6b2VzQkwu/anBn',  // Example background image for Prandai
        },
      ],
    },
  ];

  const [error, setError] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleAddToCartClick = (productName) => {
    // Trigger WhatsApp group redirection
    window.location.href = 'https://chat.whatsapp.com/KHWJpoO5pWaGSe8gAz75Le';  // Replace with your WhatsApp group link

    // Show contact information and image after the button is clicked
    setShowContactInfo(true);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-dark-green mb-6">Our Products</h2>

      {/* Iterate through each category */}
      {products.map((category) => (
        <div key={category.category} className="mb-8">
          <h3 className="text-2xl font-semibold text-dark-green mb-4">{category.category}</h3>

          <div className="space-y-8">
            {/* Iterate through each product in the category */}
            {category.products.map((product) => (
              <div key={product._id}>
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-dark-green mb-4">{product.name}</h4>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                </div>

                {/* Iterate through the sizes of the product and display each in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {product.sizes.map((size, index) => (
                    <div
                      key={index}
                      className="border rounded-lg shadow hover:shadow-lg p-4 text-center relative"
                      style={{ backgroundImage: `url(${product.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set the background image
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-24 h-24 object-cover rounded-t-lg mb-4 mx-auto" // Adjusted image size
                      />
                      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> {/* Optional dark overlay */}
                      <div className="relative z-10">
                        <h5 className="text-lg font-semibold text-white">{size.weight}</h5>
                        <p className="text-sm text-white">₹{size.price}</p>
                        <button 
                          onClick={() => handleAddToCartClick(product.name)}
                          className="mt-2 w-full bg-dark-green text-white py-2 rounded hover:bg-light-green hover:text-dark-green"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Display contact info and image after Add to Cart is clicked */}
                {showContactInfo && (
                  <div className="mt-6 text-center">
                    <h5 className="text-xl font-semibold text-dark-green">Order via WhatsApp</h5>
                    <p className="text-gray-700 mt-2">Contact me on my number for further details</p>
                    <p className="text-lg font-bold text-dark-green">+91 6381360779 </p>
                    <a
                      href="https://chat.whatsapp.com/KHWJpoO5pWaGSe8gAz75Le"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
           
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
