"use client";

import Image from "next/image";

const WhyHIT = () => {
  return (
    <section className="w-full bg-[#FAF9F6] py-20 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image */}
        <div className="relative w-full md:w-[550px] h-[300px] md:h-[400px] flex-1">
          <Image
            src="/img/whyhit.png" // replace with actual image path
            alt="HIT Building"
            fill
            className="object-contain rounded-xl shadow-lg"
          />
        </div>
        {/* Text Content */}
        <div className="flex-1 text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Why Choose HIT?
          </h2>
          <div className="bg-[#C28C19] text-white p-8 md:p-10 rounded-2xl shadow-xl text-lg md:text-xl font-semibold leading-relaxed max-w-lg">
            <p>Quick stats: Rankings, Placement %,</p>
            <p>Top Recruiters</p>
            <p className="mt-4">
              Trust badges: <span className="font-bold">AICTE Approved</span>,{" "}
              <span className="font-bold">NAAC Accredited</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHIT;
