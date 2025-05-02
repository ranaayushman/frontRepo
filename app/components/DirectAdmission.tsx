"use client";

import Image from "next/image";

const WestBengalAdmission = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-16 relative overflow-hidden">
      {/* Top Domain Name - Outlined Text */}
      <div className="text-center mb-16">
        <h1
          className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text"
          style={{
            WebkitTextStroke: "1px #110072",
            color: "transparent",
          }}
        >
          namankan.in
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Text Content */}
        <div className="md:w-3/5 mb-10 md:mb-0">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-black">GET ADMISSION IN</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-[#140087]">
              TOP PRIVATE COLLEGES
            </h2>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-medium text-black">OF</h3>
              <h3 className="text-3xl md:text-4xl font-bold text-[#140087]">
                WEST BENGAL
              </h3>
            </div>
            <h2 className="text-2xl font-bold text-black">THROUGH</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-[#140087]">
              MANAGEMENT QUOTA
            </h2>
          </div>
        </div>

        {/* Right Side - West Bengal Map */}
        <div className="md:w-2/5 flex justify-center">
          <div className="relative w-64 h-80">
            <Image
              src="/img/map.png"
              alt="West Bengal Map"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-50 rounded-t-[100%]"></div> */}
    </section>
  );
};

export default WestBengalAdmission;
