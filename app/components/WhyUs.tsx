"use client";

const ManagementQuota = () => {
  return (
    <section className="w-full relative overflow-hidden py-16 px-4 md:px-16 bg-[#88B1E94D]">
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,1) 100%)",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side - Text Content */}
        <div className="md:w-3/5">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8">
            WHAT IS MANAGEMENT QUOTA ?
          </h2>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl">
            A system where private and deemed universities reserve a certain
            percentage of their seats for direct admission, bypassing the usual
            merit-based or entrance exam selection processes.
          </p>
        </div>

        {/* Right Side - NO RANK NO WORRIES Box */}
        <div className="md:w-2/5 mt-10 md:mt-0 flex justify-center">
          <div className="bg-blue-50 border-2 border-[#110072] rounded-2xl p-8 w-72">
            <div className="flex flex-col items-center">
              <h1
                className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text text-center mb-1"
                style={{
                  WebkitTextStroke: "1px #110072",
                  color: "transparent",
                }}
              >
                NO
              </h1>
              <div className="text-4xl md:text-5xl font-bold text-[#110072] mb-4">
                RANK
              </div>
              <h1
                className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text text-center mb-1"
                style={{
                  WebkitTextStroke: "1px #110072",
                  color: "transparent",
                }}
              >
                NO
              </h1>
              <div className="text-4xl md:text-5xl font-bold text-[#110072] mb-4">
                WORRIES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementQuota;
