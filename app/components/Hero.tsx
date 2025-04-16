"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row">
      {/* Left content */}
      <div className="bg-black text-white flex flex-col justify-center p-10 md:w-1/2 w-full">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Get Direct Admission <br />
          in Your Dream College <br />– 2025 Admissions Now Open!
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Apply now for direct admissions in top private colleges across India
          without entrance exams!
        </p>
        <Button className="w-1/2 text-base font-semibold bg-white text-black h-12 hover:bg-gray-300 cursor-pointer">
          Apply Now
        </Button>
      </div>

      {/* Right image */}
      <div className="relative md:w-1/2 w-full h-[300px] md:h-full">
        <Image
          src="/img/hero.png"
          alt="Students walking to college"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
