"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState as useReactState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut } from "lucide-react";
import { AdmissionForm } from "./Contact";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useReactState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle scroll event to adjust navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navigating to dashboard or signin
  const handleDashboardNavigation = () => {
    if (status === "authenticated" && session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    } else {
      signIn("google");
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return "U";
  };

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300  bg-gradient-to-b from-white via-white/70 to-transparent backdrop-blur-xs
      }`}
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
            onClick={handleDashboardNavigation}
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

          {/* User Menu (if logged in) */}
          {status === "authenticated" && session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || "User profile"}
                    />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/${session.user?.id}`)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Login button (if not logged in) */}
          {status === "unauthenticated" && (
            <Button
              onClick={() => signIn("google")}
              variant="ghost"
              className="text-[#140087] font-semibold hover:text-[#140060] transition-colors"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden text-[#140087]"
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
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
                handleDashboardNavigation();
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

            {/* Login / Logout */}
            {status !== "loading" && (
              <div className="px-4 py-3">
                {session ? (
                  <>
                    <div className="flex items-center space-x-2 px-2 py-1 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {session.user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        router.push(`/dashboard/${session.user?.id}`);
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full justify-start mb-2"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => signOut()}
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      signIn("google");
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Login with Google
                  </Button>
                )}
              </div>
            )}
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
