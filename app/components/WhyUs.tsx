"use client";
import Image from "next/image";

const ManagementQuota = () => {
  return (
    <section className="w-full flex flex-col md:flex-row">
      {/* Left Side - Purple Background with Text */}
      <div className="w-full md:w-1/2 bg-[#110072] flex items-center justify-center px-6 py-12">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-[45px] font-bold mb-8">
            WHAT IS MANAGEMENT QUOTA ?
          </h2>
          <p className="text-xl font-extralight md:text-2xl leading-relaxed md:text-right">
            A system where private and deemed universities reserve a certain
            percentage of their seats for direct admission, bypassing the usual
            merit-based or entrance exam selection processes.
          </p>
        </div>
      </div>

      {/* Right Side - Image with Overlay Text */}
      <div className="w-full md:w-1/2 relative h-[300px] md:h-[512px]">
        {/* Overlay Text */}
        <div className="absolute top-6 right-1/4  md:right-1/3 z-10">
          <div className="bg-transparent bg-opacity-90 rounded-md px-4 py-2 border-4 border-[#fffff]">
            <p className="text-xl md:text-2xl font-bold">
              <span
                style={{
                  WebkitTextStroke: "1px #ffffff",
                  color: "transparent",
                }}
              >
                NO
              </span>
              <span className="text-white ml-4">RANK</span>
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px #ffffff",
                  color: "transparent",
                }}
              >
                NO
              </span>
              <span className="text-white ml-4">WORRIES</span>
            </p>
          </div>
        </div>

        <Image
          src="/img/quota.jpg"
          alt="Students with 'No Rank No Worries'"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default ManagementQuota;
