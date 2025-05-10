"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("api/v1/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Store JWT and role in cookies
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", user.role, { expires: 7 });

      router.push("/admin/dashboard"); // Redirect to dashboard or wherever
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/img/heritage.png')" }}
    >
      <Card className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border-none">
        {/* Login Section */}
        <CardContent className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#110072] hover:bg-indigo-900"
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-white/10 via-white/30 to-white/10 text-center flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-[#110072] mb-4">Namankan</h1>
          <h3 className="text-xl text-gray-800 font-semibold mb-2">
            Hello Friend !
          </h3>
          <p className="text-gray-700 mb-6">
            Fill up personal information and start journey with us.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
