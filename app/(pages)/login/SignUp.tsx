"use client";

import { useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Cookies from "js-cookie";

interface SignUpContentProps {
  onSwitchToLogin: () => void;
}

const SignUpContent = ({ onSwitchToLogin }: SignUpContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/v1/signup", {
        name,
        email,
        password,
      });

      const { token, user } = res.data;

      // Clear applyFormData to prevent data leakage
      localStorage.removeItem("applyFormData");

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", user.role, { expires: 7 });
      Cookies.set("userId", user.id, { expires: 7 });

      router.push(decodeURIComponent(redirectUrl));
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/img/login_image.jpeg')" }}
    >
      <div className="hidden md:flex items-center justify-center px-4 bg-transparent">
        <h1
          className="text-4xl md:text-6xl font-bold text-transparent rotate-180"
          style={{
            writingMode: "vertical-rl",
            WebkitTextStroke: "2px #ffffff",
            color: "transparent",
          }}
        >
          namankan.in
        </h1>
      </div>
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border-none">
        {/* Sign Up Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-white"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#110072] hover:bg-indigo-900"
            >
              Sign Up
            </Button>
          </form>
        </div>

        {/* Right Side with Glassmorphism Effect */}
        <div className="w-full md:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
            style={{ backgroundImage: "url('/img/login_image.jpeg')" }}
          ></div>
          <div className="relative h-full backdrop-blur-sm bg-white/30 p-8 md:p-12 flex flex-col justify-center items-center z-10">
            <Image
              src="/img/primary _logo_blue.png"
              alt="Namankan Logo"
              height={200}
              width={200}
              className="object-contain mb-4"
            />
            <h3 className="text-xl text-[#110072] font-semibold mb-2">
              Hello Friend !
            </h3>
            <p className="mb-6 text-center text-gray-800">
              Already have an account? Sign in to continue.
            </p>    

            <Button
              className="bg-[#110072] hover:bg-indigo-900 text-white"
              onClick={onSwitchToLogin}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap SignUpContent in Suspense
const SignUp = ({ onSwitchToLogin }: SignUpContentProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent onSwitchToLogin={onSwitchToLogin} />
    </Suspense>
  );
};

export default SignUp;
