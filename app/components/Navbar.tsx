"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#FAF9F6] py-4 px-4 md:px-6 shadow-sm relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
          <a
            href="/"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            About us
          </a>
          <a
            href="/contact"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            Contact
          </a>
          <a
            href="/blog"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            Blog
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <a
            href="/apply"
            className="hidden sm:block bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-full transition-colors"
          >
            Apply Now
          </a>

          {status !== "loading" &&
            (session ? (
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm font-semibold hover:text-amber-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="text-sm font-semibold hover:text-amber-600"
              >
                Login
              </button>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF9F6] shadow-md z-10">
          <div className="flex flex-col py-2">
            <a
              href="/"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
            >
              About us
            </a>
            <a
              href="/contact"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
            >
              Contact
            </a>
            <a
              href="/blog"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
            >
              Blog
            </a>
            <a
              href="/apply"
              className="block sm:hidden w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition-colors mt-2"
            >
              Apply Now
            </a>

            {/* Login / Logout */}
            {status !== "loading" && (
              <div className="px-4 py-3">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left text-black font-bold hover:bg-gray-100 py-2"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="w-full text-left text-black font-bold hover:bg-gray-100 py-2"
                  >
                    Login with Google
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
