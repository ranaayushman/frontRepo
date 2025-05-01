"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const Hero = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleApplyNow = () => {
    if (status === "unauthenticated") {
      signIn("google"); // Triggers Google Sign-In
    } else if (session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/herohit.png"
          alt="College campus"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 10%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.8) 90%, rgba(255,255,255,1) 100%)",
        }}
      ></div>

      {/* Content - Positioned at bottom center */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#140087]">
            Your Way To <br /> College
          </h1>
          <Button
            onClick={handleApplyNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            GET ADMISSION
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
