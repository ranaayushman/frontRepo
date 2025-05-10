"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // You should have installed js-cookie

export function useRoleGuard(expectedRole: string) {
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/login");
    } else if (role !== expectedRole) {
      router.replace("/unauthorized"); 
    }
  }, [router, expectedRole]);
}
