import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import bananna from '../pages/banana.jpg';

function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mt-10 mx-auto max-w-6xl px-4">
      {/* Left: Content */}
      <div className="text-center lg:text-left lg:w-1/2 space-y-4">
        <h1 className="text-4xl font-bold text-dark-green">
          Welcome to Rani Foods
        </h1>
        <p className="text-lg text-gray-700">
          Discover the natural benefits of Nenthra Banana Powder for the healthy
          growth of children. 100% organic and made with love.
        </p>

        {/* Adjusted position of the button with margin-top */}
        <Link to="/products">
          <button className="bg-dark-green text-white px-6 py-2 rounded hover:bg-light-green hover:text-dark-green mt-6">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Right: Animated Image */}
      <div className="lg:w-1/2 mt-6 lg:mt-0 transform transition-all duration-1000 ease-in-out translate-x-0 hover:translate-x-10">
        <img
          src={bananna}
          alt="Banana Powder"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

export default Home;
