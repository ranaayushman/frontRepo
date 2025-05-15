"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import LoginPage from "./Login";
import SignUp from "./SignUp";
import { Suspense } from "react";

// Inner component to handle useSearchParams and rendering
const AuthContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{
    token: string | undefined;
    role: string | undefined;
    userId: string | undefined;
  }>({ token: undefined, role: undefined, userId: undefined });
  const [showSignUp, setShowSignUp] = useState(false);

  // Check cookies on mount
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    const userId = Cookies.get("userId");

    console.log("Cookies:", { token, role, userId }); // Debug

    setUser({ token, role, userId });

    // If authenticated, redirect to appropriate page
    if (token && userId) {
      const redirectUrl = `/apply/${userId}`;
      router.push(redirectUrl);
    }
  }, [router]);

  // If user is authenticated, don't render anything (redirect is handled)
  if (user.token && user.userId) {
    return null;
  }

  // Callback to toggle between Login and SignUp
  const toggleAuthMode = () => setShowSignUp((prev) => !prev);

  return (
    <div>
      {showSignUp ? (
        <SignUp onSwitchToLogin={toggleAuthMode} />
      ) : (
        <LoginPage onSwitchToSignUp={toggleAuthMode} />
      )}
    </div>
  );
};

// Wrap in Suspense
const AuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
};

export default AuthPage;
