import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-light-green shadow-lg sticky top-0 z-50">
  <div className="container mx-auto px-4 py-6 flex justify-between items-center"> {/* Increased py-6 */}
    {/* Left: Logo */}
    <div className="flex items-center space-x-4">
      <img src={logo} alt="Logo" className="h-15 w-12" />
      <h1 className="text-xl font-bold text-dark-green">Rani Foods</h1>
    </div>

    {/* Right: Links for Desktop */}
    <div className="hidden md:flex space-x-6 text-dark-green font-medium">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </div>

    {/* Mobile Menu Icon */}
    <button
      className="md:hidden text-dark-green"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="bg-light-green md:hidden flex flex-col space-y-2 text-dark-green text-center py-4">
      <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
      <Link to="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
      <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
      <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
    </div>
  )}
</nav>

  );
}

export default Navbar;
