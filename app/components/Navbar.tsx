"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Settings } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Apply Now button click to redirect to user's dashboard
  const handleApplyNow = () => {
    if (status === "authenticated" && session?.user?.id) {
      // Only redirect if we have a valid ID
      router.push(`/dashboard/${session.user.id}`);
    } else if (status === "authenticated" && !session?.user?.id) {
      // If authenticated but no ID (shouldn't happen with proper setup)
      console.error("User authenticated but no ID available");
      router.push("/dashboard");
    } else {
      // If no session, sign in the user
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
    <nav className="bg-[#FAF9F6] py-4 px-4 md:px-6 shadow-sm relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
          <Link
            href="/"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            About us
          </Link>
          <Link
            href="/contact"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className="text-black font-bold text-lg lg:text-xl hover:text-amber-600 transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleApplyNow}
            variant="default"
            className="hidden sm:flex bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full"
          >
            Apply Now
          </Button>

          {status !== "loading" &&
            (session ? (
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
                    onClick={() =>
                      router.push(`/dashboard/${session.user?.id}`)
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/${session.user?.id}?tab=settings`)
                    }
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => signIn("google")}
                variant="ghost"
                size="sm"
                className="text-sm font-semibold hover:text-amber-600"
              >
                Login
              </Button>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF9F6] shadow-md z-10">
          <div className="flex flex-col py-2">
            <Link
              href="/"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-black font-bold px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="px-4 py-2">
              <Button
                onClick={() => {
                  handleApplyNow();
                  setIsMenuOpen(false);
                }}
                variant="default"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full"
              >
                Apply Now
              </Button>
            </div>

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
    </nav>
  );
};

export default Navbar;
