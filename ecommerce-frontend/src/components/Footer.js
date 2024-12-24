import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-green text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center"> {/* Added text-center */}
        {/* Section 1: About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">Rani Foods brings you the best in organic food products, focusing on quality and the health benefits of our products. We are committed to providing your family with the highest quality food products.</p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Section 3: Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: <a href="mailto:raniFoodsnenthara@gmail.com">raniFoodsnenthara@gmail.com</a></p>
          <p className="text-sm">Sales Email: <a href="mailto:Ranifoods@proton.me">Ranifoods@proton.me</a></p>
          <p className="text-sm">Phone: +91 6381360779</p>
          <p className="text-sm">Address: Rani Foods, RC School Street, Erasakkanyakkanur, Theni - 625515</p>
        </div>

        {/* Section 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" className="text-white hover:text-light-green" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square text-xl"></i>
            </a>
            <a href="https://www.instagram.com/rani_foods_netharam_powder/profilecard/?igsh=MXhiMWZudHBudnRjYw==" className="text-white hover:text-light-green" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://twitter.com" className="text-white hover:text-light-green" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
        <p className="text-sm mb-4">Get the latest updates and offers from Rani Foods.</p>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-lg text-dark-green"
          />
          <button type="submit" className="bg-light-green text-dark-green p-2 rounded-r-lg hover:bg-dark-green hover:text-white">
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm text-gray-400">
        <p>&copy; 2024 Rani Foods. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
