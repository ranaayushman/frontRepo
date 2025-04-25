import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-around bg-[#FAF9F6] py-4 px-6 shadow-sm">
      <div className="flex items-center space-x-12">
        <a href="/" className="text-black font-bold text-xl">
          Home
        </a>
        <a href="/about" className="text-black font-bold text-xl">
          About us
        </a>
        <a href="/contact" className="text-black font-bold text-xl">
          Contact
        </a>
        <a href="/blog" className="text-black font-bold text-xl">
          Blog
        </a>
      </div>
      <div>
        <a
          href="/apply"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Apply Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
