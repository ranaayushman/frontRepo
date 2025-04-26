"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.name}!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
