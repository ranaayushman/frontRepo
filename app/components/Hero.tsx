"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleApplyNow = () => {
    router.push("/apply"); // Redirect to admission page directly
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
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,1) 100%)",
        }}
      ></div>

      {/* Content - Positioned at bottom center */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 items-center md:space-x-8">
          <h1 className="text-4xl md:text-6xl text-center font-bold text-[#140087]">
            Your Way To <br /> College
          </h1>
          <Button
            onClick={handleApplyNow}
            className="bg-[#140087] hover:bg-[#140060] text-white font-bold py-8 md:py-3 h-12 md:h-24 px-12 rounded-lg text-xl md:text-2xl"
          >
            GET
            <br /> ADMISSION
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
