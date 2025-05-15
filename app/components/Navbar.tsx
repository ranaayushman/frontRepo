"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AdmissionForm } from "./Contact";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const router = useRouter();

  // Handle scroll event for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdmissionNavigation = () => {
    router.push("/apply");
  };

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 bg-gradient-to-b from-white via-white/70 to-transparent backdrop-blur-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/svg/logo.svg"
            alt="Namankan Logo"
            width={200}
            height={150}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <Link
            href="/"
            className="text-[#140087] font-semibold text-lg hover:text-[#140060] transition-colors"
          >
            HOME
          </Link>
          <button
            onClick={handleAdmissionNavigation}
            className="text-[#140087] font-semibold text-lg hover:text-[#140060] transition-colors"
          >
            GET ADMISSION
          </button>
          <Link
            href="/about"
            className="text-[#140087] font-semibold text-lg hover:text-[#140060] transition-colors"
          >
            ABOUT US
          </Link>
          <button
            onClick={() => setIsContactFormOpen(true)}
            className="text-[#140087] font-semibold text-lg hover:text-[#140060] transition-colors"
          >
            CONTACT US
          </button>
          <Link
            href="/login"
            className="text-white px-4 py-1 bg-[#140087] rounded-lg font-semibold text-lg hover:bg-[#140060] transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden text-[#140087]"
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-10">
          <div className="flex flex-col py-2">
            <Link
              href="/"
              className="text-[#140087] font-semibold px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <button
              onClick={() => {
                handleAdmissionNavigation();
                setIsMenuOpen(false);
              }}
              className="text-left text-[#140087] font-semibold px-4 py-3 hover:bg-gray-100"
            >
              GET ADMISSION
            </button>
            <Link
              href="/about"
              className="text-[#140087] font-semibold px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <button
              className="text-left text-[#140087] font-semibold px-4 py-3 hover:bg-gray-100 w-full"
              onClick={() => {
                setIsContactFormOpen(true);
                setIsMenuOpen(false);
              }}
            >
              CONTACT US
            </button>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <AdmissionForm
        isOpen={isContactFormOpen}
        setIsOpen={setIsContactFormOpen}
        buttonText="Submit Inquiry"
      />
    </nav>
  );
};

export default Navbar;