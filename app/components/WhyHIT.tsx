"use client";

import Image from "next/image";

const WhyHIT = () => {
  return (
    <section className="w-full relative overflow-hidden py-20 px-4 md:px-20">
      {/* Base background color */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#88B1E94D" }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,1) 100%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image */}
        <div className="relative w-full md:w-[550px] h-[300px] md:h-[400px] flex-1">
          <Image
            src="/img/whyhit.png"
            alt="HIT Building"
            fill
            className="object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Why Choose US?
          </h2>
          <div className="bg-[#110072] text-white p-8 md:p-10 rounded-2xl shadow-xl text-lg md:text-xl font-semibold leading-relaxed max-w-lg">
            <p>
              98% success rate in helping students secure top college
              admissions.
            </p>
            <p>
              Personalized guidance, expert counsellors, and end-to-end support.
            </p>
            <p className="mt-4">
              Trusted by thousands:{" "}
              <span className="font-bold">AICTE Guidance Expertise</span>,{" "}
              <span className="font-bold">NAAC Insights</span>,{" "}
              <span className="font-bold">100+ Partner Colleges</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHIT;
